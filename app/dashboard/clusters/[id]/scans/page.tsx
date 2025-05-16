import { getClusterById, getLatestClusterScans, Incompatibility, Tool } from "@/lib/actions"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
type tParams = Promise<{ id: string }>
export default async function ClusterScansPage(props: { params: tParams }) {
    const { id } = await props.params
    const cluster = await getClusterById(parseInt(id))
    const scans = await getLatestClusterScans(parseInt(id)) // Get last 10 scans


    if (!cluster) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold mb-4">Cluster not found</h1>
                <Link href="/dashboard/clusters">
                    <Button>Back to Clusters</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-6">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Scans for {cluster.name}</h1>
                <Link href="/dashboard/clusters">
                    <Button variant="outline">Back to Clusters</Button>
                </Link>
            </div>

            {scans.length === 0 ? (
                <Card>
                    <CardContent className="py-8">
                        <div className="text-center text-gray-500">
                            <p>No scans found for this cluster.</p>
                            <p className="mt-1">Scans will appear here once they are completed.</p>
                        </div>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-4">
                    {scans.map((scan) => (
                        <Card key={scan.id}>
                            <CardHeader>
                                <CardTitle className="flex items-center justify-between text-base">
                                    <span>Scan from {formatDistanceToNow(new Date(scan.scanned_at), { addSuffix: true })}</span>
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Find Kubernetes tool to get its version */}
                                    {(() => {
                                        const kubernetesTool = scan.discovered_tools.tools?.find(tool => tool.name === "Kubernetes");
                                        const kubeVersion = kubernetesTool?.version || "unknown";

                                        return scan.discovered_tools.tools?.filter(tool => tool.name !== "Kubernetes").map((tool: Tool, index: number) => (
                                            <div key={index} className="border rounded-lg p-4">
                                                <div className="flex justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-medium">{tool.name}</span>
                                                        {tool.current_incompatibility?.length === 0 && (
                                                            <span className="text-xs px-2 py-0.5 bg-green-100 text-green-700 rounded-full">
                                                                Supported for Current Version
                                                            </span>
                                                        )}
                                                        {tool.upgrade_incompatibility?.length === 0 && (
                                                            <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                                                                Supported for Next Version
                                                            </span>
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-gray-500">v{tool.version}</span>
                                                </div>
                                                {(tool.current_incompatibility?.length > 0 || tool.upgrade_incompatibility?.length > 0) && (
                                                    <div className="mt-2 space-y-2">
                                                        {tool.current_incompatibility?.map((incompatibility: Incompatibility, i: number) => (
                                                            <div key={i} className="text-sm text-red-600 bg-red-50 p-2 rounded">
                                                                Tool upgrade required ASAP. This tool version is not compatible with your current Kubernetes version (v{kubeVersion}) because it {incompatibility.message}.
                                                            </div>
                                                        ))}
                                                        {tool.upgrade_incompatibility?.map((incompatibility: Incompatibility, i: number) => (
                                                            <div key={i} className="text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
                                                                Tool upgrade required prior to Kubernetes upgrade. This tool version is not compatible with the next Kubernetes version after (v{kubeVersion}) because it {incompatibility.message}.
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        ))
                                    })()}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    )
}
