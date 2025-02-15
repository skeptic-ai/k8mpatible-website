import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { isAdminEmail } from '@/lib/actions'

export default async function DashboardPage() {
    const session = await auth()
    const email = session?.user?.email

    if (email && await isAdminEmail(email)) {
        redirect('/dashboard/customers')
    }

    redirect('/dashboard/clusters')
}
