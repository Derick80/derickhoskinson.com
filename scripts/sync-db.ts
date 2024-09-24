import { getAllBlogPosts } from '@/app/actions/mdx-server'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

// Syncs the local database with the remote database
const databaseUrl = process.env.DATABASE_URL

if (!databaseUrl) {
  throw new Error('DATABASE_URL is not set')
}
console.log('Syncing with database' + databaseUrl)

const syncwithDb = async () => {
  const data = await getAllBlogPosts()
  const posts = data.map((post) => post.metadata)

  console.log(posts, 'posts from sync-db')

  if (!posts) return undefined
  if (posts === null) return null
  try {
    const validPosts = posts.filter((post) => post !== null)
    const updated = await Promise.all(
      validPosts.map(async (post) => {
        await prisma.post.upsert({
          where: { slug: post.slug },
          update: {
            title: post.title,
            slug: post.slug,
            content: post.content,
            author: post.author,
            categories: post.categories,
            published: post.published,
            wordCount: post.wordCount,
            readingTime: post.readingTime,
            date: post.date
          },
          create: {
            title: post.title,
            slug: post.slug,
            content: post.content,
            author: post.author,
            categories: post.categories,
            published: post.published,
            wordCount: post.wordCount,
            readingTime: post.readingTime,
            date: post.date
          }
        })
      })
    )
    return {
      message: 'Synced with database'
    }
  } catch (error) {
    return error
  }
}

await syncwithDb()
