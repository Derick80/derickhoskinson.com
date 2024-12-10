import { getAllPosts } from '@/app/actions/blog'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
// using AI to help me update the script to check if there are any new or missing slugs in the database and update them
const shouldUpdate = async () => {
    const frontmatter = await getAllPosts()
    if (!frontmatter) return null

    if (!frontmatter || frontmatter.length === 0) {
        return false
    }

    const dbPosts = await prisma.post.findMany()
    const dbSlugs = new Set(dbPosts.map((post) => post.slug))
    const newSlugs = new Set(frontmatter.map((post) => post.frontmatter.slug))

    // Check if there are any new or missing slugs
    if (dbSlugs.size !== newSlugs.size) {
        return true
    }

    for (const slug of newSlugs) {
        if (!dbSlugs.has(slug)) {
            return true
        }
    }

    return false
}

const syncWithDb = async () => {
    const needsUpdating = await shouldUpdate()

    if (!needsUpdating) {
        return {
            message: 'Database is already up to date'
        }
    }

    const frontmatter = await getAllPosts()

    if (!frontmatter || frontmatter.length === 0) {
        return {
            message: 'No posts were found'
        }
    }

    const updated = await Promise.all(
        frontmatter.map(async (post) => {
            return await prisma.post.upsert({
                where: { slug: post.frontmatter.slug },
                update: {
                    title: post.frontmatter.title,
                    slug: post.frontmatter.slug,
                    description: post.frontmatter.description,
                    content: post.frontmatter.content,
                    author: post.frontmatter.author,
                    date: new Date(post.frontmatter.date),
                    imageUrl: post.frontmatter.imageUrl,
                    wordCount: post.frontmatter.wordCount,
                    readingTime: post.frontmatter.readingTime,
                    category: {
                        set: post.frontmatter.categories
                    },
                    published: post.frontmatter.published,


                },
                create: {
                    title: post.frontmatter.title,
                    slug: post.frontmatter.slug,
                    description: post.frontmatter.description,
                    content: post.frontmatter.content,
                    author: post.frontmatter.author,
                    date: new Date(post.frontmatter.date),
                    imageUrl: post.frontmatter.imageUrl,
                    wordCount: post.frontmatter.wordCount,
                    readingTime: post.frontmatter.readingTime,
                    category: {
                        set: post.frontmatter.categories
                    },
                    published: post.frontmatter.published,

                }
            })
        })
    )

    return {
        message: 'Database updated successfully',
        updatedSlugs: updated.map((post) => post.slug)
    }
}

syncWithDb().then(console.log).catch(console.error)

await syncWithDb()
