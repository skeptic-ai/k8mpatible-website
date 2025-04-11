'use client'

import { useActionState } from 'react'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { ClusterState, createClusterAWS } from '@/lib/actions'
import { Alert, AlertDescription } from '../ui/alert'
import { AlertCircle } from 'lucide-react'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export function AWSClusterForm() {
    const initialState: ClusterState = { message: null, errors: {} };
    const [state, formAction] = useActionState(createClusterAWS, initialState);

    const [authMethod, setAuthMethod] = useState("role") // Default to role (recommended)

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

            <div className="space-y-4">
                <Label>Authentication Method</Label>
                <RadioGroup
                    defaultValue={authMethod}
                    onValueChange={setAuthMethod}
                    className="flex flex-col space-y-2"
                    name="authMethod"
                >
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="role" id="role" />
                        <Label htmlFor="role" className="font-normal cursor-pointer">
                            AWS Role (Recommended)
                        </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="keys" id="keys" />
                        <Label htmlFor="keys" className="font-normal cursor-pointer">
                            AWS Access Keys
                        </Label>
                    </div>
                </RadioGroup>
                <p className="text-sm text-gray-500">
                    Using AWS IAM roles is the recommended approach for better security
                </p>
            </div>

            {authMethod === "role" ? (
                <div className="space-y-2">
                    <Label htmlFor="awsRoleArn">AWS Role ARN</Label>
                    <Input
                        id="awsRoleArn"
                        name="awsRoleArn"
                        required
                        placeholder="arn:aws:iam::123456789012:role/eks-access-role"
                        className="font-mono"
                    />
                    <p className="text-sm text-gray-500">
                        The ARN of an IAM role with permissions to access your EKS cluster
                    </p>
                </div>
            ) : (
                <>
                    <div className="space-y-2">
                        <Label htmlFor="awsAccessKeyId">AWS Access Key</Label>
                        <Input
                            id="awsAccessKeyId"
                            name="awsAccessKeyId"
                            type="password"
                            required={authMethod === "keys"}
                            placeholder="Your AWS access key"
                            className="font-mono"
                        />
                        <p className="text-sm text-gray-500">
                            AWS access key for an IAM user with the EKSViewOnly policy for all namespaces
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="awsSecretAccessKey">AWS Secret Key</Label>
                        <Input
                            id="awsSecretAccessKey"
                            name="awsSecretAccessKey"
                            type="password"
                            required={authMethod === "keys"}
                            placeholder="Your AWS secret key"
                            className="font-mono"
                        />
                        <p className="text-sm text-gray-500">
                            AWS secret key associated with your access key
                        </p>
                    </div>
                </>
            )}

            <div className="pt-4">
                <Button type="submit">
                    Add Cluster
                </Button>
            </div>
        </form>
    )
}
