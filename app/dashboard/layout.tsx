"use client"
import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layers, Users } from 'lucide-react'

interface DashboardLayoutProps {
    children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
    const pathname = usePathname()

    const menuItems = [
        {
            title: 'Clusters',
            href: '/dashboard/clusters',
            icon: Layers
        },
        {
            title: 'Users',
            href: '/dashboard/users',
            icon: Users
        }
    ]

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Sidebar */}
            <aside className="w-64 bg-white shadow-md">
                <nav className="p-4">
                    <div className="mb-8">
                        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
                    </div>

                    <ul className="space-y-2">
                        {menuItems.map((item) => {
                            const isActive = pathname?.startsWith(item.href)
                            const Icon = item.icon

                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors ${isActive
                                            ? 'bg-blue-50 text-blue-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                            }`}
                                    >
                                        <Icon className="w-5 h-5" />
                                        <span className="font-medium">{item.title}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}