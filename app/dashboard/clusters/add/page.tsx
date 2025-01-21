'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function AddClusterPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        region: '',
        nodeCount: '',
        environment: 'production'
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            // Add your API call here to create the cluster
            // const response = await createCluster(formData)

            // Redirect to clusters page after successful creation
            router.push('/dashboard/clusters')
            router.refresh()
        } catch (error) {
            console.error('Error creating cluster:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <div className="max-w-2xl mx-auto py-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">Add New Cluster</h1>
                <p className="text-gray-500 mt-2">Create a new Kubernetes cluster for your organization.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Cluster Details</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="name">Cluster Name</Label>
                            <Input
                                id="name"
                                name="name"
                                required
                                placeholder="e.g., prod-us-west"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="region">Region</Label>
                            <Select
                                value={formData.region}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, region: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a region" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="us-west-2">US West (Oregon)</SelectItem>
                                    <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                                    <SelectItem value="eu-west-1">EU West (Ireland)</SelectItem>
                                    <SelectItem value="ap-southeast-1">Asia Pacific (Singapore)</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="nodeCount">Number of Nodes</Label>
                            <Input
                                id="nodeCount"
                                name="nodeCount"
                                type="number"
                                min="1"
                                required
                                placeholder="e.g., 3"
                                value={formData.nodeCount}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="environment">Environment</Label>
                            <Select
                                value={formData.environment}
                                onValueChange={(value) => setFormData(prev => ({ ...prev, environment: value }))}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select environment" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="production">Production</SelectItem>
                                    <SelectItem value="staging">Staging</SelectItem>
                                    <SelectItem value="development">Development</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => router.back()}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading ? 'Creating...' : 'Create Cluster'}
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}