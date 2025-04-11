'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

// Import cloud-specific form components
import { AWSClusterForm } from '@/components/clusters/aws-cluster-form'
import { GCPClusterForm } from '@/components/clusters/gcp-cluster-form'
// import { AzureClusterForm } from '@/components/clusters/azure-cluster-form'

type CloudProvider = 'aws' | 'gcp' | 'azure'

export default function AddClusterPage() {
    const router = useRouter()
    const [selectedProvider, setSelectedProvider] = useState<CloudProvider | ''>('')



    const renderProviderForm = () => {
        switch (selectedProvider) {
            case 'aws':
                return <AWSClusterForm />
            case 'gcp':
                return <GCPClusterForm />
            // case 'azure':
            //     return <AzureClusterForm />
            default:
                return null
        }
    }

    return (
        <div className="max-w-2xl mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Add New Cluster</h1>
                <p className="text-gray-500 mt-2">Connect to an existing Kubernetes cluster by providing credentials.</p>
            </div>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Select Cloud Provider</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        <Label htmlFor="provider">Cloud Provider</Label>
                        <Select
                            value={selectedProvider}
                            onValueChange={(value: CloudProvider) => setSelectedProvider(value)}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a cloud provider" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="aws">Amazon Web Services (AWS)</SelectItem>
                                <SelectItem value="gcp">Google Cloud Platform (GCP)</SelectItem>
                                <SelectItem value="azure">Microsoft Azure</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {selectedProvider && (
                <Card>
                    <CardHeader>
                        <CardTitle>Cluster Access Configuration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {renderProviderForm()}
                    </CardContent>
                </Card>
            )}

            <div className="mt-6">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                >
                    Cancel
                </Button>
            </div>
        </div>
    )
}