import { auth } from '@/auth'
import { getAllCustomers, isAdminEmail } from '@/lib/actions'
import { redirect } from 'next/navigation'

export default async function CustomersPage() {
    const session = await auth()
    const email = session?.user?.email

    if (!email || !await isAdminEmail(email)) {
        redirect('/dashboard/clusters')
    }

    const customers = await getAllCustomers()

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Customers</h1>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="border-b">
                            <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500">Name</th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500">Organization</th>
                            <th className="hidden lg:table-cell px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500">Email</th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500">Clusters</th>
                            <th className="px-4 lg:px-6 py-3 text-left text-xs lg:text-sm font-medium text-gray-500">Scans</th>
                        </tr>
                    </thead>
                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id} className="border-b hover:bg-gray-50">
                                <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm whitespace-nowrap">{customer.name}</td>
                                <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm whitespace-nowrap">{customer.organization}</td>
                                <td className="hidden lg:table-cell px-4 lg:px-6 py-4 text-xs lg:text-sm">{customer.email}</td>
                                <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm whitespace-nowrap">{customer.cluster_count}</td>
                                <td className="px-4 lg:px-6 py-4 text-xs lg:text-sm whitespace-nowrap">{customer.scan_count}</td>
                            </tr>
                        ))}
                        {customers.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-sm text-center text-gray-500">
                                    No customers found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
