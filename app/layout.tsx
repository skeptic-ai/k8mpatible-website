import { Inter } from 'next/font/google'
import './globals.css'
import { auth } from '@/auth'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UserCircle } from 'lucide-react'

const inter = Inter({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          {/* Navigation Bar */}
          <header className="border-b bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex h-16 items-center justify-between">
                {/* Brand */}
                <div className="flex items-center">
                  <Link href="/" className="flex items-center">
                    <span className="text-2xl font-bold text-blue-600">k8mpatible</span>
                  </Link>
                </div>

                {/* Auth Buttons */}
                <div className="flex items-center gap-4">
                  {session ? (
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        {session.user?.email}
                      </span>
                      <Link href="/dashboard">
                        <Button size="default" variant="default" className="bg-blue-600 hover:bg-blue-700">
                          Dashboard
                        </Button>
                      </Link>
                      <Link href="/api/auth/signout">
                        <Button variant="outline" size="sm">
                          Sign out
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center gap-3">
                      <Link href="/signin">
                        <Button variant="ghost" size="sm">
                          Sign in
                        </Button>
                      </Link>
                      <Link href="/signup">
                        <Button size="sm">
                          Sign up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t bg-white">
            <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Skeptic AI LLC. All rights reserved.
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
