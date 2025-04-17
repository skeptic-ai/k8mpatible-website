'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createClusterGCP } from '@/lib/actions'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle, Info } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'


export function GCPClusterForm() {
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useActionState(createClusterGCP, initialState);

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Cluster Name</Label>
                <Input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g., prod-gke-cluster"

                />
                {state.errors?.name && (
                    <Alert variant="destructive" className="mt-2">
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                            {state.errors.name.join(', ')}
                        </AlertDescription>
                    </Alert>
                )}
                <p className="text-sm text-gray-500">
                    This must match the name of the cluster in GCP
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Cluster Location</Label>
                <Input
                    id="location"
                    name="location"
                    required
                    placeholder="e.g., us-central1 or us-central1-a"
                />
                <p className="text-sm text-gray-500">
                    The GCP region or zone where your cluster is located
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="gcpProjectId">GCP Project ID</Label>
                <Input
                    id="gcpProjectId"
                    name="gcpProjectId"
                    required
                    placeholder="e.g., my-gcp-project-123"
                />
                <p className="text-sm text-gray-500">
                    The ID of your GCP project where the cluster is located
                </p>
            </div>

            <Card className="mt-4">
                <CardHeader>
                    <CardTitle className="flex items-center">
                        <Info className="h-5 w-5 mr-2" />
                        Required GCP Permissions
                    </CardTitle>
                    <CardDescription>
                        You need to grant the following permissions to our service account
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-medium">Service Account</h3>
                        <p className="font-mono text-sm mt-1">k8mpatible-client@production-9bb4.iam.gserviceaccount.com</p>
                    </div>

                    <div>
                        <h3 className="font-medium">Required Roles</h3>
                        <ul className="list-disc list-inside mt-1 space-y-1">
                            <li className="font-mono text-sm">roles/container.viewer</li>
                            <li className="font-mono text-sm">roles/container.clusterViewer</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-medium">How to Grant Permissions</h3>
                        <ol className="list-decimal list-inside mt-1 space-y-1 text-sm">
                            <li>Go to the <a href="https://console.cloud.google.com/iam-admin/iam" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">IAM & Admin page</a> in your GCP console</li>
                            <li>Click &quot;Grant Access&quot; and enter the service account email above</li>
                            <li>Add both required roles listed above</li>
                            <li>Click &quot;Save&quot;</li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <input type="hidden" name="gcpServiceAccountKey" value="" />

            <div className="pt-4">
                <Button type="submit" >
                    Add Cluster
                </Button>
            </div>
        </form>
    )
}
