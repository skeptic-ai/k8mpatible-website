import { Pool } from 'pg'

// Database connection
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
})

export interface BlogPost {
    id: number
    title: string
    slug: string
    excerpt?: string
    content: string
    author_id: number
    published: boolean
    featured: boolean
    tags: string[]
    meta_title?: string
    meta_description?: string
    created_at: Date
    updated_at: Date
    published_at?: Date
    author?: {
        id: number
        name: string
        email: string
    }
}

export interface CreateBlogPostData {
    title: string
    slug: string
    excerpt?: string
    content: string
    author_id: number
    published?: boolean
    featured?: boolean
    tags?: string[]
    meta_title?: string
    meta_description?: string
}

export interface UpdateBlogPostData extends Partial<CreateBlogPostData> {
    id: number
}

// Generate slug from title
export function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9 -]/g, '') // Remove special characters
        .replace(/\s+/g, '-') // Replace spaces with hyphens
        .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
        .trim()
}

// Get all blog posts with optional filters
export async function getBlogPosts(options: {
    published?: boolean
    featured?: boolean
    limit?: number
    offset?: number
} = {}): Promise<BlogPost[]> {
    const { published, featured, limit = 50, offset = 0 } = options

    let query = `
        SELECT 
            bp.*,
            u.name as author_name,
            u.email as author_email
        FROM blog_posts bp
        LEFT JOIN users u ON bp.author_id = u.id
        WHERE 1=1
    `
    const params: (string | number | boolean)[] = []
    let paramCount = 0

    if (published !== undefined) {
        paramCount++
        query += ` AND bp.published = $${paramCount}`
        params.push(published)
    }

    if (featured !== undefined) {
        paramCount++
        query += ` AND bp.featured = $${paramCount}`
        params.push(featured)
    }

    query += ` ORDER BY bp.created_at DESC`

    if (limit) {
        paramCount++
        query += ` LIMIT $${paramCount}`
        params.push(limit)
    }

    if (offset) {
        paramCount++
        query += ` OFFSET $${paramCount}`
        params.push(offset)
    }

    const result = await pool.query(query, params)

    return result.rows.map(row => ({
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        author_id: row.author_id,
        published: row.published,
        featured: row.featured,
        tags: row.tags || [],
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at),
        published_at: row.published_at ? new Date(row.published_at) : undefined,
        author: {
            id: row.author_id,
            name: row.author_name,
            email: row.author_email,
        },
    }))
}

// Get a single blog post by slug
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
    const query = `
        SELECT 
            bp.*,
            u.name as author_name,
            u.email as author_email
        FROM blog_posts bp
        LEFT JOIN users u ON bp.author_id = u.id
        WHERE bp.slug = $1
    `

    const result = await pool.query(query, [slug])

    if (result.rows.length === 0) {
        return null
    }

    const row = result.rows[0]
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        author_id: row.author_id,
        published: row.published,
        featured: row.featured,
        tags: row.tags || [],
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at),
        published_at: row.published_at ? new Date(row.published_at) : undefined,
        author: {
            id: row.author_id,
            name: row.author_name,
            email: row.author_email,
        },
    }
}

// Get a single blog post by ID
export async function getBlogPostById(id: number): Promise<BlogPost | null> {
    const query = `
        SELECT 
            bp.*,
            u.name as author_name,
            u.email as author_email
        FROM blog_posts bp
        LEFT JOIN users u ON bp.author_id = u.id
        WHERE bp.id = $1
    `

    const result = await pool.query(query, [id])

    if (result.rows.length === 0) {
        return null
    }

    const row = result.rows[0]
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        author_id: row.author_id,
        published: row.published,
        featured: row.featured,
        tags: row.tags || [],
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at),
        published_at: row.published_at ? new Date(row.published_at) : undefined,
        author: {
            id: row.author_id,
            name: row.author_name,
            email: row.author_email,
        },
    }
}

// Create a new blog post
export async function createBlogPost(data: CreateBlogPostData): Promise<BlogPost> {
    const {
        title,
        slug,
        excerpt,
        content,
        author_id,
        published = false,
        featured = false,
        tags = [],
        meta_title,
        meta_description,
    } = data

    const finalSlug = slug || generateSlug(title)
    const publishedAt = published ? new Date() : null

    const query = `
        INSERT INTO blog_posts (
            title, slug, excerpt, content, author_id, published, featured, 
            tags, meta_title, meta_description, published_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
        RETURNING *
    `

    const result = await pool.query(query, [
        title,
        finalSlug,
        excerpt,
        content,
        author_id,
        published,
        featured,
        tags,
        meta_title,
        meta_description,
        publishedAt,
    ])

    const row = result.rows[0]
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        author_id: row.author_id,
        published: row.published,
        featured: row.featured,
        tags: row.tags || [],
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at),
        published_at: row.published_at ? new Date(row.published_at) : undefined,
    }
}

// Update a blog post
export async function updateBlogPost(data: UpdateBlogPostData): Promise<BlogPost | null> {
    const { id, ...updateData } = data

    const fields: string[] = []
    const values: (string | number | boolean | Date | string[] | null)[] = []
    let paramCount = 0

    // Build dynamic update query
    Object.entries(updateData).forEach(([key, value]) => {
        if (value !== undefined) {
            paramCount++
            fields.push(`${key} = $${paramCount}`)
            values.push(value)
        }
    })

    if (fields.length === 0) {
        throw new Error('No fields to update')
    }

    // Handle published_at field
    if (updateData.published !== undefined) {
        const currentPost = await getBlogPostById(id)
        if (currentPost && updateData.published && !currentPost.published) {
            // Publishing for the first time
            paramCount++
            fields.push(`published_at = $${paramCount}`)
            values.push(new Date())
        } else if (updateData.published === false) {
            // Unpublishing
            paramCount++
            fields.push(`published_at = $${paramCount}`)
            values.push(null)
        }
    }

    paramCount++
    const query = `
        UPDATE blog_posts 
        SET ${fields.join(', ')}
        WHERE id = $${paramCount}
        RETURNING *
    `
    values.push(id)

    const result = await pool.query(query, values)

    if (result.rows.length === 0) {
        return null
    }

    const row = result.rows[0]
    return {
        id: row.id,
        title: row.title,
        slug: row.slug,
        excerpt: row.excerpt,
        content: row.content,
        author_id: row.author_id,
        published: row.published,
        featured: row.featured,
        tags: row.tags || [],
        meta_title: row.meta_title,
        meta_description: row.meta_description,
        created_at: new Date(row.created_at),
        updated_at: new Date(row.updated_at),
        published_at: row.published_at ? new Date(row.published_at) : undefined,
    }
}

// Delete a blog post
export async function deleteBlogPost(id: number): Promise<boolean> {
    const query = 'DELETE FROM blog_posts WHERE id = $1'
    const result = await pool.query(query, [id])
    return (result.rowCount ?? 0) > 0
}

// Check if slug is available
export async function isSlugAvailable(slug: string, excludeId?: number): Promise<boolean> {
    let query = 'SELECT id FROM blog_posts WHERE slug = $1'
    const params: (string | number)[] = [slug]

    if (excludeId) {
        query += ' AND id != $2'
        params.push(excludeId)
    }

    const result = await pool.query(query, params)
    return result.rows.length === 0
}
