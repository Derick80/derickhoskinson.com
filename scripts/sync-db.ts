import path from 'path'
import { PrismaClient } from '@prisma/client'
import { getAllPosts } from '@/app/actions/blog'
import { MdxCompiled } from '@/lib/types'

// Do not import prisma instance from the prisma.ts file
// This is because the prisma instance is not available in the scripts folder
// it's ok to import the blog actions because they do not use the prisma instance

const prisma = new PrismaClient()

// Helper function to map post frontmatter to Prisma's upsert input
const mapPostToPrismaData = ({ post }: { post: MdxCompiled }) => ({
    title: post.title,
    slug: post.slug,
    description: post.description,
    content: post.content,
    author: post.author,
    date: new Date(post.date),
    imageUrl: post.imageUrl,
    wordCount: post.wordCount,
    readingTime: post.readingTime,
    category: {
        set: post.categories
    },
    published: post.published
})
// using AI to help me update the script to check if there are any new or missing slugs in the database and update them
const shouldUpdate = async (): Promise<boolean> => {
    const posts = await getAllPosts()
    if (!posts || posts.length === 0) return false

    console.log(
        'Got the posts. Checking for new or missing slugs in the database'
    )
    const dbPosts = await prisma.post.findMany()

    const dbSlugs = new Set(dbPosts.map((post) => post.slug))

    const newSlugs = new Set(posts.map((post) => post.slug))

    // Are the new slugs similar to the old slugs?

    function similar(a: string[], b: string[]) {
        const setA = new Set(a)
        const setB = new Set(b)
        const intersection = new Set([...setA].filter((x) => setB.has(x)))
        return intersection.size > 0
    }

    const shouldUpdate = !similar([...dbSlugs], [...newSlugs])
    return shouldUpdate
}

const syncWithDb = async () => {
    const needsUpdating = await shouldUpdate()
    if (!needsUpdating) {
        return { message: 'Database is already up to date' }
    }

    const posts = await getAllPosts()
    if (!posts || posts.length === 0) {
        return { message: 'No posts were found' }
    }
    const updated = await Promise.all(
        posts.map(async (post) => {
            const prismaData = mapPostToPrismaData({ post })
            return prisma.post.upsert({
                where: { slug: post.slug },
                update: prismaData,
                create: prismaData
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

// Run the script with the following command
// npm run seed_posts
// remove the export default syncWithDb
export default syncWithDb
