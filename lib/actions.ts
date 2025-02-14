"use server";
import { auth } from '@/auth';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { Pool } from 'pg'
import { z } from 'zod'

const pool = new Pool()
const RegisterFormSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email" }),
    name: z.string(),
    organization: z.string()
});

export type State = {
    errors?: {
        email?: string[];
        name?: string[];
        organization?: string[];
    };
    message?: string | null;
};

export async function IsEmailEnrolled(email: string) {
    const queryString = `SELECT * FROM customers WHERE email = $1`
    const res = await pool.query(queryString, [email])
    if (res.rowCount)
        return res.rowCount > 0
    return false

}

export async function EnrollCustomer(prevState: State, formData: FormData) {
    const client = await pool.connect()
    const validatedData = RegisterFormSchema.safeParse({
        email: formData.get('email'),
        name: formData.get('name'),
        organization: formData.get('organization')
    })
    if (!validatedData.success) {
        console.log("not validated")
        return {
            errors: validatedData.error.flatten().fieldErrors,
            message: 'Missing Fields. Failed to register.',
        };
    }
    const { email, name, organization } = validatedData.data
    try {
        console.log("enrolling customer", email, name, organization)
        await client.query('BEGIN')
        const queryString = `INSERT INTO customers (email, name, organization) VALUES ($1, $2, $3)`
        await client.query(queryString, [email, name, organization])
        await client.query('COMMIT')
    } catch (e) {
        await client.query('ROLLBACK')
        console.error(e)
        return {
            message: 'Database Error: Failed to Create Invoice.',
        };
    } finally {
        client.release()
        revalidatePath('/signup')
    }


    redirect('/signin')
}


const BaseClusterSchema = z.object({
    name: z.string().min(1, "Cluster name is required"),
    provider: z.enum(["aws", "gcp", "azure"]),
    location: z.string().min(1, "Location is required"),
});

const AWSClusterSchema = BaseClusterSchema.extend({
    provider: z.literal("aws"),
    awsAccessKeyId: z.string().min(1, "AWS Access Key ID is required"),
    awsSecretAccessKey: z.string().min(1, "AWS Secret Access Key is required"),
});

const GCPClusterSchema = BaseClusterSchema.extend({
    provider: z.literal("gcp"),
    gcpServiceAccountKey: z.string()
        .min(1, "GCP Service Account Key is required")
        .refine((val) => {
            try {
                JSON.parse(val);
                return true;
            } catch {
                return false;
            }
        }, "Invalid JSON format for GCP Service Account Key"),
});

const AzureClusterSchema = BaseClusterSchema.extend({
    provider: z.literal("azure"),
    azureTenantId: z.string().min(1, "Azure Tenant ID is required"),
    azureClientId: z.string().min(1, "Azure Client ID is required"),
    azureClientSecret: z.string().min(1, "Azure Client Secret is required"),
    azureSubscriptionId: z.string().min(1, "Azure Subscription ID is required"),
    azureResourceGroup: z.string().min(1, "Azure Resource Group is required"),
});

const CreateClusterSchema = z.discriminatedUnion("provider", [
    AWSClusterSchema,
    GCPClusterSchema,
    AzureClusterSchema,
]);

export type ClusterState = {
    errors?: {
        name?: string[];
        provider?: string[];
        location?: string[];
        awsAccessKeyId?: string[];
        awsSecretAccessKey?: string[];
        gcpServiceAccountKey?: string[];
        azureTenantId?: string[];
        azureClientId?: string[];
        azureClientSecret?: string[];
        azureSubscriptionId?: string[];
        azureResourceGroup?: string[];
    };
    message?: string | null;
};


export async function createClusterGCP(prevState: ClusterState, formData: FormData) {
    return createCluster(prevState, formData, "gcp")
}
export async function createCluster(
    prevState: ClusterState,
    formData: FormData,
    provider: string
) {
    const client = await pool.connect();
    const session = await auth()
    const email = session?.user?.email || ""
    console.log("creating cluster for user", email)
    try {
        // First, validate all the form data
        const validatedData = CreateClusterSchema.safeParse({
            name: formData.get('name'),
            provider: provider,
            location: formData.get('location'),
            // AWS fields
            awsAccessKeyId: formData.get('awsAccessKeyId'),
            awsSecretAccessKey: formData.get('awsSecretAccessKey'),
            // GCP fields
            gcpServiceAccountKey: formData.get('gcpServiceAccountKey'),
            // Azure fields
            azureTenantId: formData.get('azureTenantId'),
            azureClientId: formData.get('azureClientId'),
            azureClientSecret: formData.get('azureClientSecret'),
            azureSubscriptionId: formData.get('azureSubscriptionId'),
            azureResourceGroup: formData.get('azureResourceGroup'),
        });

        if (!validatedData.success) {
            console.log("not validated", validatedData.error.flatten().fieldErrors)
            return {
                errors: validatedData.error.flatten().fieldErrors,
                message: 'Missing or invalid fields. Failed to create cluster.',
            };
        }

        // Get customer ID from email
        const customerResult = await client.query(
            'SELECT id FROM customers WHERE email = $1',
            [email]
        );

        if (customerResult.rows.length === 0) {
            return {
                message: 'Customer not found.',
            };
        }

        const customerId = customerResult.rows[0].id;
        const data = validatedData.data;

        // Begin transaction
        await client.query('BEGIN');

        // Insert cluster with provider-specific fields
        const insertQuery = `
            INSERT INTO clusters (
                customer_id,
                name,
                provider,
                location,
                aws_access_key_id,
                aws_secret_access_key,
                gcp_service_account_key,
                azure_tenant_id,
                azure_client_id,
                azure_client_secret,
                azure_subscription_id,
                azure_resource_group
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
            RETURNING id`;

        const values = [
            customerId,
            data.name,
            data.provider,
            data.location,
            data.provider === 'aws' ? data.awsAccessKeyId : null,
            data.provider === 'aws' ? data.awsSecretAccessKey : null,
            data.provider === 'gcp' ? data.gcpServiceAccountKey : null,
            data.provider === 'azure' ? data.azureTenantId : null,
            data.provider === 'azure' ? data.azureClientId : null,
            data.provider === 'azure' ? data.azureClientSecret : null,
            data.provider === 'azure' ? data.azureSubscriptionId : null,
            data.provider === 'azure' ? data.azureResourceGroup : null
        ];

        await client.query(insertQuery, values);
        await client.query('COMMIT');



    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error creating cluster:', error);
        return {
            message: 'Database Error: Failed to create cluster.',
        };
    } finally {
        client.release();
    }
    revalidatePath('/dashboard/clusters');
    redirect('/dashboard/clusters');
}


export type Tool = {
    Name: string;
    Version: string;
    CurrentIncompatibility: Incompatibility[];
    UpgradeIncompatibility: Incompatibility[];
}
export type Incompatibility = {
    message: string;
    toolName: string;
}

export async function getClusters() {
    const client = await pool.connect()
    const session = await auth()
    const email = session?.user?.email || ""

    try {
        // Get customer ID from email
        const customerResult = await client.query(
            'SELECT id FROM customers WHERE email = $1',
            [email]
        )

        if (customerResult.rows.length === 0) {
            return []
        }

        const customerId = customerResult.rows[0].id

        // Get all clusters with provider-specific fields
        const clustersResult = await client.query(`
            SELECT 
                id,
                name,
                provider,
                location,
                created_at,
                aws_access_key_id,
                gcp_service_account_key,
                azure_tenant_id,
                azure_subscription_id,
                azure_resource_group
            FROM clusters
            WHERE customer_id = $1
        `, [customerId])


        return clustersResult.rows


    } catch (error) {
        console.error('Error fetching clusters:', error)
        return []
    } finally {
        client.release()
    }
}
export async function getClusterStatus(clusterId: number) {
    const scans = await getLatestClusterScans(clusterId, 1)
    const tools = scans[0]?.discovered_tools.tools as Tool[]
    if (tools.length === 0) {
        return 'Unknown'
    }
    for (const tool of tools) {
        console.log(tool)
        if (tool.CurrentIncompatibility == undefined || tool.UpgradeIncompatibility == undefined) {
            return 'Compatible'
        }
        if (tool.CurrentIncompatibility.length > 0 || tool.UpgradeIncompatibility.length > 0) {
            return 'Incompatible'
        }
    }
    return 'Compatible'
}

export async function getClusterById(clusterId: number) {
    const client = await pool.connect()
    const session = await auth()
    const email = session?.user?.email || ""

    try {
        // Get customer ID from email
        const customerResult = await client.query(
            'SELECT id FROM customers WHERE email = $1',
            [email]
        )

        if (customerResult.rows.length === 0) {
            return null
        }

        const customerId = customerResult.rows[0].id

        // Get cluster with provider-specific fields
        const clusterResult = await client.query(`
            SELECT 
                id,
                name,
                provider,
                location,
                created_at,
                aws_access_key_id,
                gcp_service_account_key,
                azure_tenant_id,
                azure_subscription_id,
                azure_resource_group
            FROM clusters
            WHERE id = $1 AND customer_id = $2
        `, [clusterId, customerId])

        return clusterResult.rows[0] || null

    } catch (error) {
        console.error('Error fetching cluster:', error)
        return null
    } finally {
        client.release()
    }
}

export async function getLatestClusterScans(clusterId: number, limit = 1) {
    const client = await pool.connect()

    try {
        // Get scans for the specified cluster
        const scansResult = await client.query(`
            SELECT 
                id,
                scanned_at,
                discovered_tools
            FROM scans
            WHERE cluster_id = $1
            ORDER BY scanned_at DESC
            LIMIT $2
        `, [clusterId, limit])

        return scansResult.rows

    } catch (error) {
        console.error('Error fetching cluster scans:', error)
        return []
    } finally {
        client.release()
    }
}
