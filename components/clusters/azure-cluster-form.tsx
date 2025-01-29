'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'

interface AzureClusterFormProps {
    onSubmit: (formData: any) => Promise<void>
    isLoading: boolean
}

export function AzureClusterForm({ onSubmit, isLoading }: AzureClusterFormProps) {
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        tenantId: '',
        clientId: '',
        clientSecret: '',
        subscriptionId: '',
        resourceGroupName: ''
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Connection Name</Label>
                <Input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g., prod-aks-cluster"
                    value={formData.name}
                    onChange={handleChange}
                />
                <p className="text-sm text-gray-500">
                    A display name to identify this cluster connection
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Cluster Location</Label>
                <Input
                    id="location"
                    name="location"
                    required
                    placeholder="e.g., eastus"
                    value={formData.location}
                    onChange={handleChange}
                />
                <p className="text-sm text-gray-500">
                    The Azure region where your AKS cluster is located
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="subscriptionId">Subscription ID</Label>
                <Input
                    id="subscriptionId"
                    name="subscriptionId"
                    required
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={formData.subscriptionId}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="resourceGroupName">Resource Group Name</Label>
                <Input
                    id="resourceGroupName"
                    name="resourceGroupName"
                    required
                    placeholder="my-resource-group"
                    value={formData.resourceGroupName}
                    onChange={handleChange}
                />
            </div>

            <div className="space-y-2">
                <Label htmlFor="tenantId">Tenant ID</Label>
                <Input
                    id="tenantId"
                    name="tenantId"
                    required
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={formData.tenantId}
                    onChange={handleChange}
                />
                <p className="text-sm text-gray-500">
                    Azure AD tenant ID (Directory ID)
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                    id="clientId"
                    name="clientId"
                    required
                    placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
                    value={formData.clientId}
                    onChange={handleChange}
                />
                <p className="text-sm text-gray-500">
                    Service Principal application (client) ID
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                    id="clientSecret"
                    name="clientSecret"
                    type="password"
                    required
                    placeholder="Your service principal client secret"
                    value={formData.clientSecret}
                    onChange={handleChange}
                />
                <p className="text-sm text-gray-500">
                    Service Principal secret with AKS Cluster Reader role
                </p>
            </div>

            <div className="pt-4">
                <Button type="submit" disabled={isLoading}>
                    {isLoading ? 'Connecting...' : 'Connect Cluster'}
                </Button>
            </div>
        </form>
    )
}