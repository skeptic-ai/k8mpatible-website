import { ReactNode } from 'react'
import { auth } from '@/auth'
import { isAdminEmail } from '@/lib/actions'
import DashboardUI from '../../components/clusters/dashboard-ui'

interface DashboardLayoutProps {
    children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
    // Server-side admin check
    const session = await auth()
    const email = session?.user?.email
    const isAdmin = email ? await isAdminEmail(email) : false

    return <DashboardUI isAdmin={isAdmin}>{children}</DashboardUI>
}
