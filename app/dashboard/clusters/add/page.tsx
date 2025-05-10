'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { getUserSubscriptionAndClusterCount } from '@/lib/actions'

// Import cloud-specific form components
import { AWSClusterForm } from '@/components/clusters/aws-cluster-form'
import { GCPClusterForm } from '@/components/clusters/gcp-cluster-form'
// import { AzureClusterForm } from '@/components/clusters/azure-cluster-form'

type CloudProvider = 'aws' | 'gcp' | 'azure'

export default function AddClusterPage() {
    const router = useRouter()
    const [selectedProvider, setSelectedProvider] = useState<CloudProvider | ''>('')
    const [subscriptionTier, setSubscriptionTier] = useState<string>('free')
    const [clusterCount, setClusterCount] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        async function fetchSubscriptionData() {
            const data = await getUserSubscriptionAndClusterCount()
            setSubscriptionTier(data.subscriptionTier)
            setClusterCount(data.clusterCount)
            setLoading(false)
        }
        fetchSubscriptionData()
    }, [])

    const canAddCluster = subscriptionTier === 'professional' || clusterCount < 1



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
            {loading ? (
                <div className="text-center py-6">Loading subscription data...</div>
            ) : !canAddCluster ? (
                <Card className="mb-6 bg-red-50 border-red-200">
                    <CardHeader>
                        <CardTitle className="text-red-700">Cluster Limit Reached</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-red-600 mb-4">
                            You have reached the maximum number of clusters allowed for your current subscription tier.
                            With the free tier, you are limited to 1 cluster. Upgrade to the Professional tier to add more clusters.
                        </p>
                        <div className="mb-4">
                            <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
                            <stripe-pricing-table
                                pricing-table-id="prctbl_1RN5jyFFhYS8QAwgBxc2nvMl"
                                publishable-key="pk_live_51QiPXwFFhYS8QAwg0hw11DpUQtLaIGPI1NSH3LBsnIZautMvnhHu6rWVDQiPbVEMW4UttxemJlv9VNa2gmNwzfik00HGRtCXeZ"
                            >
                            </stripe-pricing-table>
                        </div>
                        <Button
                            variant="outline"
                            className="border-red-400 text-red-700 hover:bg-red-100"
                            onClick={() => router.push('/dashboard')}
                        >
                            Back to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <>


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
                </>
            )}
        </div>
    )
}
