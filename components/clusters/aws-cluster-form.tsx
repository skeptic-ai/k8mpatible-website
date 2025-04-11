'use client'

import { useActionState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { createClusterAWS } from '@/lib/actions'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle } from 'lucide-react'

export function AWSClusterForm() {
    const initialState = { message: '', errors: {} };
    const [state, formAction] = useActionState(createClusterAWS, initialState);

    return (
        <form action={formAction} className="space-y-6">
            <div className="space-y-2">
                <Label htmlFor="name">Cluster Name</Label>
                <Input
                    id="name"
                    name="name"
                    required
                    placeholder="e.g., prod-eks-cluster"
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
                    This must match the name of your EKS cluster in AWS
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="location">Cluster Region</Label>
                <Input
                    id="location"
                    name="location"
                    required
                    placeholder="e.g., us-east-1"
                />
                <p className="text-sm text-gray-500">
                    The AWS region where your EKS cluster is located
                </p>
            </div>

            <div className="space-y-2">
                <Label htmlFor="awsRoleArn">AWS Role ARN</Label>
                <Input
                    id="awsRoleArn"
                    name="awsRoleArn"
                    required
                    placeholder="arn:aws:iam::123456789012:role/k8mpatible-cluster-reader"
                    className="font-mono"
                />
                <p className="text-sm text-gray-500">
                    The ARN of an IAM role with permissions to access your EKS cluster
                </p>
                <input type="hidden" name="authMethod" value="role" />
            </div>

            <div className="pt-4">
                <Button type="submit">
                    Add Cluster
                </Button>
            </div>
        </form>
    )
}
