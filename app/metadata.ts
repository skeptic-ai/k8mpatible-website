// app/metadata.ts
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: {
        template: '%s | k8mpatible',
        default: 'k8mpatible - Kubernetes Upgrade Compatibility Scanner',
    },
    description: 'Save time on Kubernetes upgrades. Automatically verify compatibility of cert-manager, ArgoCD, Istio, and other critical cluster tools.',
    keywords: [
        'kubernetes',
        'k8s',
        'devops',
        'SRE',
        'platform engineering',
        'cert-manager',
        'argocd',
        'istio',
        'linkerd',
        'kubernetes upgrade',
        'compatibility checker'
    ],
    authors: [{ name: 'k8mpatible' }],
    creator: 'k8mpatible',
    publisher: 'k8mpatible',
    robots: {
        index: true,
        follow: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://k8mpatible.com',
        siteName: 'k8mpatible',
        title: 'k8mpatible - Kubernetes Upgrade Compatibility Scanner',
        description: 'Save time on Kubernetes upgrades. Automatically verify compatibility of cert-manager, ArgoCD, Istio, and other critical cluster tools.',
        images: [
            {
                url: '/og-image.png', // You'll need to create this image
                width: 1200,
                height: 630,
                alt: 'k8mpatible - Kubernetes Upgrade Compatibility Scanner',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'k8mpatible - Kubernetes Upgrade Compatibility Scanner',
        description: 'Save time on Kubernetes upgrades. Automatically verify compatibility of cert-manager, ArgoCD, Istio, and other critical cluster tools.',
        images: ['/og-image.png'], // You'll need to create this image
        creator: '@k8mpatible', // If you have a Twitter account
    },
    viewport: {
        width: 'device-width',
        initialScale: 1,
        maximumScale: 1,
    },
    icons: {
        icon: '/favicon.ico', // You'll need to create these icons
        shortcut: '/favicon-16x16.png',
        apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    other: {
        'msapplication-TileColor': '#ffffff',
        'theme-color': '#ffffff',
    },
}