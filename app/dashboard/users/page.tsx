

// app/dashboard/users/page.tsx
import { redirect } from 'next/navigation'

export default function UsersPage() {
    // Redirect all users away from this page
    redirect('/dashboard/clusters')
}
