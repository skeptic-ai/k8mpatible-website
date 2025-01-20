"use server";
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

export async function EnrollEmail(prevState: State, formData: FormData) {
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