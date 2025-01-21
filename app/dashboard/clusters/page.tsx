// app/dashboard/clusters/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default function ClustersPage() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold tracking-tight">Clusters</h1>
                <Link href="/dashboard/clusters/add" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                    Add Cluster
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader>
                        <CardTitle>Production Cluster</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <span className="text-green-600 font-medium">Healthy</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Nodes</span>
                                <span>8</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Region</span>
                                <span>us-west-2</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Example additional clusters */}
                <Card>
                    <CardHeader>
                        <CardTitle>Staging Cluster</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Status</span>
                                <span className="text-green-600 font-medium">Healthy</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Nodes</span>
                                <span>4</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Region</span>
                                <span>us-east-1</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
