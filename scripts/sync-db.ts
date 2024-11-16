import { PrismaClient } from '@prisma/client'
import { getPostsMetaData } from '@/app/actions/blog'
const prisma = new PrismaClient()
// using AI to help me update the script to check if there are any new or missing slugs in the database and update them
const shouldUpdate = async () => {
    const frontmatter = await getPostsMetaData()
    if (!frontmatter) return null

    if (!frontmatter || frontmatter.length === 0) {
        return false
    }

    const dbPosts = await prisma.post.findMany()
    const dbSlugs = new Set(dbPosts.map((post) => post.slug))
    const newSlugs = new Set(frontmatter.map((post) => post.slug))

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

    const frontmatter = await getPostsMetaData()

    if (!frontmatter || frontmatter.length === 0) {
        return {
            message: 'No posts were found'
        }
    }

    const updated = await Promise.all(
        frontmatter.map(async (post) => {
            return await prisma.post.upsert({
                where: { slug: post.slug },
                update: {
                    title: post.title,
                    slug: post.slug
                },
                create: {
                    title: post.title,
                    slug: post.slug
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
