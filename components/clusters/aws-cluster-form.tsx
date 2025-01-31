// 'use client'

// import { useState } from 'react'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { Button } from '@/components/ui/button'



// export function AWSClusterForm() {
//     const [formData, setFormData] = useState({
//         name: '',
//         region: '',
//         accessKeyId: '',
//         secretAccessKey: '',
//     })

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault()
//         onSubmit(formData)
//     }

//     const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target
//         setFormData(prev => ({
//             ...prev,
//             [name]: value
//         }))
//     }

//     return (
//         <form onSubmit={handleSubmit} className="space-y-6">
//             <div className="space-y-2">
//                 <Label htmlFor="name">Connection Name</Label>
//                 <Input
//                     id="name"
//                     name="name"
//                     required
//                     placeholder="e.g., prod-eks-cluster"
//                     value={formData.name}
//                     onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500">
//                     A display name to identify this cluster connection
//                 </p>
//             </div>

//             <div className="space-y-2">
//                 <Label htmlFor="region">Cluster Region</Label>
//                 <Input
//                     id="region"
//                     name="region"
//                     required
//                     placeholder="e.g., us-west-2"
//                     value={formData.region}
//                     onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500">
//                     The AWS region where your EKS cluster is located
//                 </p>
//             </div>

//             <div className="space-y-2">
//                 <Label htmlFor="accessKeyId">Access Key ID</Label>
//                 <Input
//                     id="accessKeyId"
//                     name="accessKeyId"
//                     required
//                     placeholder="AKIA..."
//                     value={formData.accessKeyId}
//                     onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500">
//                     AWS Access Key ID with EKS read-only permissions
//                 </p>
//             </div>

//             <div className="space-y-2">
//                 <Label htmlFor="secretAccessKey">Secret Access Key</Label>
//                 <Input
//                     id="secretAccessKey"
//                     name="secretAccessKey"
//                     type="password"
//                     required
//                     placeholder="Your AWS secret access key"
//                     value={formData.secretAccessKey}
//                     onChange={handleChange}
//                 />
//                 <p className="text-sm text-gray-500">
//                     AWS Secret Access Key associated with the Access Key ID
//                 </p>
//             </div>

//             <div className="pt-4">
//                 <Button type="submit" disabled={isLoading}>
//                     {isLoading ? 'Connecting...' : 'Connect Cluster'}
//                 </Button>
//             </div>
//         </form>
//     )
// }