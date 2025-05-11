'use client'

import { useEffect } from 'react'
import { signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function SignOutPage() {
    const router = useRouter()

    useEffect(() => {
        // Sign out the user and redirect to home page
        const performSignOut = async () => {
            await signOut({ redirect: false })
            router.push('/')
        }

        performSignOut()
    }, [router])

    // This page will not be visible as it immediately redirects
    return null
}
