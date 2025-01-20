import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import Sendgrid from "next-auth/providers/sendgrid"
import { IsEmailEnrolled } from "./components/lib/data"
const pool = new Pool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
})

export const { handlers, auth, signIn, signOut } = NextAuth({
    adapter: PostgresAdapter(pool),
    providers: [
        Sendgrid({
            // If your environment variable is named differently than default

            from: "noreply@k8mpatible.com"

        }),
    ],
    pages: {
        signIn: "/signin",
        signOut: "/signout",
    },
    callbacks: {
        async redirect({ url, baseUrl }) {
            return '/dashboard'
        },
        signIn({ account }) {

            console.log(account)
            if (!account) return false
            // return account?.providerAccountId.endsWith('@k8mpatible.com')
            return IsEmailEnrolled(account.providerAccountId)
        }
    },

})