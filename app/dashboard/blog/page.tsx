import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Edit, Trash2, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'

export const metadata: Metadata = {
    title: 'Blog Management - k8mpatible Dashboard',
    description: 'Manage blog posts for the k8mpatible website.',
}

// Mock data for now - will be replaced with database queries
const mockPosts = [
    {
        id: 1,
        title: 'Introducing k8mpatible: Your Kubernetes Compatibility Guardian',
        slug: 'introducing-k8mpatible',
        excerpt: 'Learn how k8mpatible helps you manage tool compatibility across your Kubernetes clusters and avoid version conflicts.',
        author: { name: 'k8mpatible Team' },
        published: true,
        featured: true,
        created_at: new Date('2024-01-15'),
        updated_at: new Date('2024-01-15'),
        published_at: new Date('2024-01-15'),
        tags: ['announcement', 'kubernetes', 'compatibility'],
    },
    {
        id: 2,
        title: 'Best Practices for Managing Kubernetes Tool Versions',
        slug: 'kubernetes-tool-version-management',
        excerpt: 'A comprehensive guide to maintaining compatibility between your Kubernetes cluster and the tools you deploy.',
        author: { name: 'k8mpatible Team' },
        published: true,
        featured: false,
        created_at: new Date('2024-01-10'),
        updated_at: new Date('2024-01-10'),
        published_at: new Date('2024-01-10'),
        tags: ['guide', 'best-practices', 'kubernetes'],
    },
    {
        id: 3,
        title: 'Draft: Upcoming Features in k8mpatible 2.0',
        slug: 'k8mpatible-2-0-features',
        excerpt: 'A preview of the exciting new features coming in the next major release of k8mpatible.',
        author: { name: 'k8mpatible Team' },
        published: false,
        featured: false,
        created_at: new Date('2024-01-08'),
        updated_at: new Date('2024-01-12'),
        published_at: null,
        tags: ['announcement', 'features', 'roadmap'],
    },
]

export default function BlogManagementPage() {
    const publishedPosts = mockPosts.filter(post => post.published)
    const draftPosts = mockPosts.filter(post => !post.published)

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Blog Management</h1>
                    <p className="text-gray-600 mt-2">
                        Create and manage blog posts for the k8mpatible website.
                    </p>
                </div>
                <Link href="/dashboard/blog/new">
                    <Button className="gap-2">
                        <Plus className="h-4 w-4" />
                        New Post
                    </Button>
                </Link>
            </div>

            {/* Stats */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{mockPosts.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Published</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{publishedPosts.length}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Drafts</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{draftPosts.length}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Published Posts */}
            <section>
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Published Posts</h2>
                <div className="space-y-4">
                    {publishedPosts.map((post) => (
                        <Card key={post.id}>
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            {post.featured && <Badge variant="secondary">Featured</Badge>}
                                            <Badge variant="outline">Published</Badge>
                                            <div className="flex gap-1">
                                                {post.tags.slice(0, 2).map((tag) => (
                                                    <Badge key={tag} variant="outline" className="text-xs">
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                        <CardTitle className="text-lg">{post.title}</CardTitle>
                                        <CardDescription className="mt-1">
                                            {post.excerpt}
                                        </CardDescription>
                                        <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                            <span>By {post.author.name}</span>
                                            <span>Published {formatDistanceToNow(post.published_at!, { addSuffix: true })}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 ml-4">
                                        <Link href={`/blog/${post.slug}`} target="_blank">
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Eye className="h-4 w-4" />
                                                View
                                            </Button>
                                        </Link>
                                        <Link href={`/dashboard/blog/${post.id}/edit`}>
                                            <Button variant="outline" size="sm" className="gap-2">
                                                <Edit className="h-4 w-4" />
                                                Edit
                                            </Button>
                                        </Link>
                                        <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                                            <Trash2 className="h-4 w-4" />
                                            Delete
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Draft Posts */}
            {draftPosts.length > 0 && (
                <section>
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Draft Posts</h2>
                    <div className="space-y-4">
                        {draftPosts.map((post) => (
                            <Card key={post.id} className="border-dashed">
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Badge variant="outline">Draft</Badge>
                                                <div className="flex gap-1">
                                                    {post.tags.slice(0, 2).map((tag) => (
                                                        <Badge key={tag} variant="outline" className="text-xs">
                                                            {tag}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            </div>
                                            <CardTitle className="text-lg">{post.title}</CardTitle>
                                            <CardDescription className="mt-1">
                                                {post.excerpt}
                                            </CardDescription>
                                            <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                                                <span>By {post.author.name}</span>
                                                <span>Last updated {formatDistanceToNow(post.updated_at, { addSuffix: true })}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2 ml-4">
                                            <Link href={`/dashboard/blog/${post.id}/edit`}>
                                                <Button variant="outline" size="sm" className="gap-2">
                                                    <Edit className="h-4 w-4" />
                                                    Edit
                                                </Button>
                                            </Link>
                                            <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700">
                                                <Trash2 className="h-4 w-4" />
                                                Delete
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {/* Empty State */}
            {mockPosts.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts yet</h3>
                    <p className="text-gray-600 mb-4">Get started by creating your first blog post.</p>
                    <Link href="/dashboard/blog/new">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Create First Post
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    )
}
