import { Metadata } from 'next'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { formatDistanceToNow } from 'date-fns'

export const metadata: Metadata = {
    title: 'Blog - k8mpatible',
    description: 'Latest news, guides, and insights about Kubernetes compatibility and k8mpatible.',
}

// Mock data for now - will be replaced with database queries
const mockPosts = [
    {
        id: 1,
        title: 'Introducing k8mpatible: Your Kubernetes Compatibility Guardian',
        slug: 'introducing-k8mpatible',
        excerpt: 'Learn how k8mpatible helps you manage tool compatibility across your Kubernetes clusters and avoid version conflicts.',
        author: { name: 'k8mpatible Team' },
        published_at: new Date('2024-01-15'),
        tags: ['announcement', 'kubernetes', 'compatibility'],
        featured: true,
    },
    {
        id: 2,
        title: 'Best Practices for Managing Kubernetes Tool Versions',
        slug: 'kubernetes-tool-version-management',
        excerpt: 'A comprehensive guide to maintaining compatibility between your Kubernetes cluster and the tools you deploy.',
        author: { name: 'k8mpatible Team' },
        published_at: new Date('2024-01-10'),
        tags: ['guide', 'best-practices', 'kubernetes'],
        featured: false,
    },
    {
        id: 3,
        title: 'Common Kubernetes Compatibility Issues and How to Avoid Them',
        slug: 'common-kubernetes-compatibility-issues',
        excerpt: 'Discover the most frequent compatibility problems teams face and learn proactive strategies to prevent them.',
        author: { name: 'k8mpatible Team' },
        published_at: new Date('2024-01-05'),
        tags: ['troubleshooting', 'kubernetes', 'compatibility'],
        featured: false,
    },
]

export default function BlogPage() {
    const featuredPosts = mockPosts.filter(post => post.featured)
    const regularPosts = mockPosts.filter(post => !post.featured)

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Header */}
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">k8mpatible Blog</h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Stay up to date with the latest news, guides, and insights about Kubernetes compatibility and k8mpatible.
                </p>
            </div>

            {/* Featured Posts */}
            {featuredPosts.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Posts</h2>
                    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {featuredPosts.map((post) => (
                            <Card key={post.id} className="hover:shadow-lg transition-shadow">
                                <CardHeader>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Badge variant="secondary">Featured</Badge>
                                        <span className="text-sm text-gray-500">
                                            {formatDistanceToNow(post.published_at, { addSuffix: true })}
                                        </span>
                                    </div>
                                    <CardTitle className="line-clamp-2">
                                        <Link
                                            href={`/blog/${post.slug}`}
                                            className="hover:text-blue-600 transition-colors"
                                        >
                                            {post.title}
                                        </Link>
                                    </CardTitle>
                                    <CardDescription className="line-clamp-3">
                                        {post.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600">By {post.author.name}</span>
                                        <div className="flex gap-1">
                                            {post.tags.slice(0, 2).map((tag) => (
                                                <Badge key={tag} variant="outline" className="text-xs">
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* All Posts */}
            <section>
                <h2 className="text-2xl font-bold text-gray-900 mb-6">All Posts</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {regularPosts.map((post) => (
                        <Card key={post.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-sm text-gray-500">
                                        {formatDistanceToNow(post.published_at, { addSuffix: true })}
                                    </span>
                                </div>
                                <CardTitle className="line-clamp-2">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="hover:text-blue-600 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                </CardTitle>
                                <CardDescription className="line-clamp-3">
                                    {post.excerpt}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-600">By {post.author.name}</span>
                                    <div className="flex gap-1">
                                        {post.tags.slice(0, 2).map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Empty State */}
            {mockPosts.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No posts yet</h3>
                    <p className="text-gray-600">Check back soon for the latest updates and insights.</p>
                </div>
            )}
        </div>
    )
}
