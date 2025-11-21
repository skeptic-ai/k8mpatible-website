import { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Calendar, User } from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

// Mock data for now - will be replaced with database queries
const mockPosts = [
    {
        id: 1,
        title: 'Introducing k8mpatible: Your Kubernetes Compatibility Guardian',
        slug: 'introducing-k8mpatible',
        excerpt: 'Learn how k8mpatible helps you manage tool compatibility across your Kubernetes clusters and avoid version conflicts.',
        content: `
# Introducing k8mpatible: Your Kubernetes Compatibility Guardian

Managing Kubernetes clusters in production environments comes with numerous challenges, but one of the most overlooked yet critical aspects is ensuring compatibility between your Kubernetes version and the tools you deploy. This is where **k8mpatible** comes in.

## The Problem

As Kubernetes continues to evolve rapidly, with new versions released every few months, keeping track of which tools are compatible with your cluster version becomes increasingly complex. Teams often face:

- **Version conflicts** between Kubernetes and deployed tools
- **Unexpected failures** during upgrades
- **Security vulnerabilities** from running outdated tool versions
- **Time-consuming manual research** to verify compatibility

## Our Solution

k8mpatible is a comprehensive SaaS platform designed to solve these compatibility challenges by:

### 🔍 Automated Discovery
Our platform automatically scans your Kubernetes clusters to discover all installed tools and their versions.

### ✅ Compatibility Verification
We maintain an up-to-date database of compatibility matrices for popular Kubernetes tools, ensuring you always know what works with your cluster version.

### 🚨 Proactive Alerts
Get notified before compatibility issues become problems, with actionable recommendations for upgrades or migrations.

### 📊 Centralized Dashboard
View all your clusters and their compatibility status from a single, intuitive interface.

## Getting Started

Getting started with k8mpatible is simple:

1. **Sign up** for a free account
2. **Connect your clusters** using our secure integration
3. **Review compatibility reports** and recommendations
4. **Set up alerts** for future compatibility issues

## What's Next?

We're continuously expanding our compatibility database and adding new features based on community feedback. Some exciting features coming soon include:

- **Custom compatibility rules** for internal tools
- **Integration with CI/CD pipelines** for automated compatibility checks
- **Advanced reporting** and analytics
- **Multi-cloud support** for hybrid environments

Ready to take control of your Kubernetes compatibility? [Sign up today](https://k8mpatible.com/signup) and join the growing community of teams who trust k8mpatible to keep their clusters running smoothly.

---

*Have questions or feedback? We'd love to hear from you! Reach out to our team at [hello@k8mpatible.com](mailto:hello@k8mpatible.com).*
        `,
        author: { name: 'k8mpatible Team', email: 'team@k8mpatible.com' },
        published_at: new Date('2024-01-15'),
        tags: ['announcement', 'kubernetes', 'compatibility'],
        featured: true,
        meta_title: 'Introducing k8mpatible: Your Kubernetes Compatibility Guardian',
        meta_description: 'Learn how k8mpatible helps you manage tool compatibility across your Kubernetes clusters and avoid version conflicts.',
    },
    {
        id: 2,
        title: 'Best Practices for Managing Kubernetes Tool Versions',
        slug: 'kubernetes-tool-version-management',
        excerpt: 'A comprehensive guide to maintaining compatibility between your Kubernetes cluster and the tools you deploy.',
        content: `
# Best Practices for Managing Kubernetes Tool Versions

Effective version management is crucial for maintaining stable and secure Kubernetes environments. Here are the best practices we've learned from working with hundreds of production clusters.

## 1. Establish a Version Management Strategy

### Create a Compatibility Matrix
Maintain a centralized document or system that tracks:
- Kubernetes cluster versions
- Tool versions and their compatibility ranges
- Known issues and workarounds
- Upgrade paths and dependencies

### Define Update Policies
Establish clear policies for:
- **Security updates**: Apply immediately
- **Minor updates**: Test in staging first
- **Major updates**: Plan carefully with rollback strategies

## 2. Implement Automated Monitoring

### Use Tools Like k8mpatible
Automated compatibility checking tools can:
- Continuously monitor your cluster for compatibility issues
- Alert you to potential problems before they impact production
- Provide upgrade recommendations based on your specific environment

### Set Up Alerts
Configure alerts for:
- New tool versions available
- Compatibility warnings
- End-of-life notifications for current versions

## 3. Testing and Validation

### Staging Environment Testing
Always test version updates in a staging environment that mirrors production:
- Same Kubernetes version
- Same tool configurations
- Representative workloads

### Gradual Rollouts
Use techniques like:
- **Blue-green deployments** for major updates
- **Canary releases** for gradual rollouts
- **Feature flags** to control new functionality

## 4. Documentation and Communication

### Maintain Change Logs
Document all version changes including:
- What was updated
- Why it was updated
- Any configuration changes required
- Rollback procedures

### Team Communication
Ensure your team knows about:
- Planned updates and maintenance windows
- New tool versions and their impact
- Best practices and lessons learned

## Conclusion

Effective version management requires a combination of good processes, the right tools, and clear communication. By following these best practices and leveraging tools like k8mpatible, you can maintain stable, secure, and up-to-date Kubernetes environments.
        `,
        author: { name: 'k8mpatible Team', email: 'team@k8mpatible.com' },
        published_at: new Date('2024-01-10'),
        tags: ['guide', 'best-practices', 'kubernetes'],
        featured: false,
        meta_title: 'Best Practices for Managing Kubernetes Tool Versions',
        meta_description: 'A comprehensive guide to maintaining compatibility between your Kubernetes cluster and the tools you deploy.',
    },
]

interface BlogPostPageProps {
    params: Promise<{
        slug: string
    }>
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params
    const post = mockPosts.find(p => p.slug === slug)

    if (!post) {
        return {
            title: 'Post Not Found - k8mpatible Blog',
            description: 'The requested blog post could not be found.',
        }
    }

    return {
        title: post.meta_title || post.title,
        description: post.meta_description || post.excerpt,
        openGraph: {
            title: post.title,
            description: post.excerpt,
            type: 'article',
            publishedTime: post.published_at.toISOString(),
            authors: [post.author.name],
            tags: post.tags,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
        },
    }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params
    const post = mockPosts.find(p => p.slug === slug)

    if (!post) {
        notFound()
    }

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Back to Blog */}
            <div className="mb-8">
                <Link href="/blog">
                    <Button variant="ghost" className="gap-2">
                        <ArrowLeft className="h-4 w-4" />
                        Back to Blog
                    </Button>
                </Link>
            </div>

            {/* Article Header */}
            <header className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                    {post.featured && <Badge variant="secondary">Featured</Badge>}
                    <div className="flex gap-1">
                        {post.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                </div>

                <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
                    {post.title}
                </h1>

                <p className="text-xl text-gray-600 mb-6">
                    {post.excerpt}
                </p>

                <div className="flex items-center gap-6 text-sm text-gray-500">
                    <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        <span>By {post.author.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        <span>{format(post.published_at, 'MMMM d, yyyy')}</span>
                        <span>({formatDistanceToNow(post.published_at, { addSuffix: true })})</span>
                    </div>
                </div>
            </header>

            {/* Article Content */}
            <article className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-code:text-blue-600 prose-code:bg-blue-50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-ul:text-gray-700 prose-ol:text-gray-700 prose-li:text-gray-700">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        h1: ({ children }) => <h1 className="text-3xl font-bold text-gray-900 mt-8 mb-4">{children}</h1>,
                        h2: ({ children }) => <h2 className="text-2xl font-semibold text-gray-900 mt-6 mb-3">{children}</h2>,
                        h3: ({ children }) => <h3 className="text-xl font-semibold text-gray-900 mt-4 mb-2">{children}</h3>,
                        p: ({ children }) => <p className="text-gray-700 mb-4 leading-relaxed">{children}</p>,
                        ul: ({ children }) => <ul className="list-disc list-inside mb-4 text-gray-700 space-y-1">{children}</ul>,
                        ol: ({ children }) => <ol className="list-decimal list-inside mb-4 text-gray-700 space-y-1">{children}</ol>,
                        li: ({ children }) => <li className="text-gray-700">{children}</li>,
                        strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                        em: ({ children }) => <em className="italic text-gray-700">{children}</em>,
                        code: ({ children }) => <code className="text-blue-600 bg-blue-50 px-1 py-0.5 rounded text-sm font-mono">{children}</code>,
                        pre: ({ children }) => <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto mb-4">{children}</pre>,
                        a: ({ href, children }) => (
                            <a
                                href={href}
                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                target={href?.startsWith('http') ? '_blank' : undefined}
                                rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                            >
                                {children}
                            </a>
                        ),
                        hr: () => <hr className="border-gray-300 my-8" />,
                        blockquote: ({ children }) => (
                            <blockquote className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-4">
                                {children}
                            </blockquote>
                        ),
                    }}
                >
                    {post.content}
                </ReactMarkdown>
            </article>

            {/* Article Footer */}
            <footer className="mt-12 pt-8 border-t">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Share this post</h3>
                        <div className="flex gap-2">
                            <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                                Twitter
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                                LinkedIn
                            </Badge>
                            <Badge variant="outline" className="cursor-pointer hover:bg-gray-50">
                                Copy Link
                            </Badge>
                        </div>
                    </div>
                    <div className="text-right">
                        <Link href="/blog">
                            <Button>
                                Read More Posts
                            </Button>
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    )
}
