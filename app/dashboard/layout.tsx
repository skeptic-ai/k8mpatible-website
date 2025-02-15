"use client"
import { ReactNode, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Layers, Users, Menu, X } from 'lucide-react'

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

    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    return (
        <div className="flex h-screen bg-gray-100">
            {/* Mobile Menu Button */}
            <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-white shadow-md"
            >
                {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Sidebar */}
            <aside className={`fixed lg:static inset-y-0 left-0 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } lg:translate-x-0 transition-transform duration-200 ease-in-out w-64 bg-white shadow-md z-40`}>
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
            <main className="flex-1 overflow-auto w-full lg:w-auto">
                <div className="p-4 lg:p-8">
                    {children}
                </div>
            </main>
        </div>
    )
}
