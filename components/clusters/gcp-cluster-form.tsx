'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { createClusterGCP } from '@/lib/actions'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle } from 'lucide-react'



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
                <Label htmlFor="gcpServiceAccountKey">Service Account Key</Label>
                <Textarea
                    id="gcpServiceAccountKey"
                    name="gcpServiceAccountKey"
                    required
                    placeholder="Paste your service account JSON key here"

                    rows={8}
                    className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500">
                    Service account key with Kubernetes Engine Cluster Viewer role (roles/container.clusterViewer)
                </p>
            </div>

            <div className="pt-4">
                <Button type="submit" >
                    Add Cluster
                </Button>
            </div>
        </form>
    )
}
