import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import Link from 'next/link'
import { getClusters, getClusterStatus } from '@/lib/actions'
import { formatDistanceToNow } from 'date-fns'

export default async function ClustersPage() {
    const clusters = await getClusters()
    const clusterStatus = await Promise.all(clusters.map(async cluster => await getClusterStatus(cluster.id)))
    console.log(clusterStatus)

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Clusters</h1>
                <Link
                    href="/dashboard/clusters/add"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Add Cluster
                </Link>
            </div>
            <Card className="mb-6 bg-blue-50 border-blue-200">
                <CardHeader>
                    <CardTitle className="text-blue-700">Supported Clusters</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-blue-600">
                        Currently, we support only Google Kubernetes Engine (GKE) and Amazon Elastic Kubernetes Service (EKS) clusters.
                    </p>
                </CardContent>
            </Card>

            {clusters.length === 0 ? (
                <Card>
                    <CardContent className="py-8">
                        <div className="text-center text-gray-500">
                            <p>No clusters found.</p>
                            <p className="mt-1">Click &quot;Add Cluster&quot; to create your first cluster.</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {clusters.map((cluster, index) => (
                        <Card key={cluster.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between">
                                    <span>{cluster.name}</span>
                                    <span className={`text-sm px-2 py-1 rounded ${clusterStatus[index] === 'Compatible' ? 'bg-green-100 text-green-700' :
                                        clusterStatus[index] === 'Incompatible' ? 'bg-yellow-100 text-yellow-700' :
                                            'bg-gray-100 text-gray-700'
                                        }`}>
                                        {clusterStatus[index] || 'Unknown'}
                                    </span>
                                </CardTitle>
                                <CardDescription>
                                    Created {formatDistanceToNow(new Date(cluster.created_at), { addSuffix: true })}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Provider</span>
                                        <span className="capitalize">{cluster.provider}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Location</span>
                                        <span>{cluster.location}</span>
                                    </div>
                                    <div className="mt-4">
                                        <Link
                                            href={`/dashboard/clusters/${cluster.id}/scans`}
                                            className="w-full inline-flex justify-center items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                                        >
                                            View Scans
                                        </Link>
                                    </div>

                                    {/* Provider-specific fields */}
                                    {cluster.provider === 'aws' && cluster.aws_access_key_id && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">AWS Key ID</span>
                                            <span className="font-mono text-sm">
                                                {cluster.aws_access_key_id.slice(0, 8)}...
                                            </span>
                                        </div>
                                    )}

                                    {cluster.provider === 'gcp' && cluster.gcp_service_account_key && (
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">GCP Project</span>
                                            <span className="font-mono text-sm">
                                                {JSON.parse(cluster.gcp_service_account_key).project_id || 'N/A'}
                                            </span>
                                        </div>
                                    )}

                                    {cluster.provider === 'azure' && (
                                        <>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Resource Group</span>
                                                <span className="font-mono text-sm">
                                                    {cluster.azure_resource_group}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-500">Subscription</span>
                                                <span className="font-mono text-sm">
                                                    {cluster.azure_subscription_id?.slice(0, 8)}...
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
