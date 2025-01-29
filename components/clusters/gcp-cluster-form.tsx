'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

interface GCPClusterFormProps {
    onSubmit: (formData: any) => Promise<void>
    isLoading: boolean
}

export function GCPClusterForm({ onSubmit, isLoading }: GCPClusterFormProps) {
    const [formData, setFormData] = useState({
        name: '', // Display name for the cluster connection
        location: '', // GCP region or zone where the cluster is located
        serviceAccountKey: '', // JSON key file contents
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        onSubmit(formData)
    }

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
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
                    placeholder="e.g., prod-gke-cluster"
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
                    placeholder="e.g., us-central1 or us-central1-a"
                    value={formData.location}
                    onChange={handleChange}
                />
                <p className="text-sm text-gray-500">
                    The GCP region or zone where your cluster is located
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="serviceAccountKey">Service Account Key</Label>
                <Textarea
                    id="serviceAccountKey"
                    name="serviceAccountKey"
                    required
                    placeholder="Paste your service account JSON key here"
                    value={formData.serviceAccountKey}
                    onChange={handleChange}
                    rows={8}
                    className="font-mono text-sm"
                />
                <p className="text-sm text-gray-500">
                    Service account key with Kubernetes Engine Cluster Viewer role (roles/container.clusterViewer)
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