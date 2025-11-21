import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Save, Eye } from 'lucide-react'

export const metadata: Metadata = {
    title: 'New Blog Post - k8mpatible Dashboard',
    description: 'Create a new blog post for the k8mpatible website.',
}

export default function NewBlogPostPage() {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/blog">
                        <Button variant="ghost" size="sm" className="gap-2">
                            <ArrowLeft className="h-4 w-4" />
                            Back to Blog
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">New Blog Post</h1>
                        <p className="text-gray-600 mt-1">
                            Create a new blog post for the k8mpatible website.
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" className="gap-2">
                        <Eye className="h-4 w-4" />
                        Preview
                    </Button>
                    <Button variant="outline">
                        Save Draft
                    </Button>
                    <Button className="gap-2">
                        <Save className="h-4 w-4" />
                        Publish
                    </Button>
                </div>
            </div>

            {/* Form */}
            <div className="grid gap-6 lg:grid-cols-3">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Content</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Title</Label>
                                <Input
                                    id="title"
                                    placeholder="Enter post title..."
                                    className="text-lg"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="slug">Slug</Label>
                                <Input
                                    id="slug"
                                    placeholder="post-url-slug"
                                    className="font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500">
                                    This will be the URL path for your post. Leave empty to auto-generate from title.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="excerpt">Excerpt</Label>
                                <Textarea
                                    id="excerpt"
                                    placeholder="Brief description of the post..."
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500">
                                    This will be shown in post previews and search results.
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="content">Content</Label>
                                <Textarea
                                    id="content"
                                    placeholder="Write your blog post content here... (Markdown supported)"
                                    rows={20}
                                    className="font-mono text-sm"
                                />
                                <p className="text-xs text-gray-500">
                                    You can use Markdown formatting. HTML is also supported.
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Post Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Post Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="tags">Tags</Label>
                                <Input
                                    id="tags"
                                    placeholder="kubernetes, guide, announcement"
                                />
                                <p className="text-xs text-gray-500">
                                    Separate tags with commas
                                </p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="featured"
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="featured" className="text-sm">
                                    Featured post
                                </Label>
                            </div>

                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    id="published"
                                    className="rounded border-gray-300"
                                />
                                <Label htmlFor="published" className="text-sm">
                                    Publish immediately
                                </Label>
                            </div>
                        </CardContent>
                    </Card>

                    {/* SEO Settings */}
                    <Card>
                        <CardHeader>
                            <CardTitle>SEO Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="meta-title">Meta Title</Label>
                                <Input
                                    id="meta-title"
                                    placeholder="SEO title (leave empty to use post title)"
                                />
                                <p className="text-xs text-gray-500">
                                    Recommended: 50-60 characters
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="meta-description">Meta Description</Label>
                                <Textarea
                                    id="meta-description"
                                    placeholder="SEO description (leave empty to use excerpt)"
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500">
                                    Recommended: 150-160 characters
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Publishing Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Publishing</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="text-sm text-gray-600">
                                <p><strong>Status:</strong> Draft</p>
                                <p><strong>Created:</strong> Just now</p>
                                <p><strong>Last modified:</strong> Just now</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
