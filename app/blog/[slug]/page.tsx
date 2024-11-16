
import { Suspense } from 'react'
import { blogPostSchema } from '@/lib/types'
import { getPageData, getPostBySlug, getPostsMetaData } from '@/app/actions/blog'

export async function generateStaticParams () {
  const frontmatter = await getPostsMetaData()
  if (!frontmatter) return []

  return frontmatter.map((post) => ({ params: { slug: post.slug } }))
}
export default async function Page (props: {
  params: Promise<{
    slug: string
  }>
}) {
  const params = await props.params
  const { slug } = blogPostSchema.parse(params)
  if (!slug) {
    throw new Error('No slug provided')
  }
  const { compiledSource } = await getPostBySlug(slug)
  // const { compiledSource } = await getPageData(slug)
  return (
    <div className='prose prose-zinc mx-auto max-w-2xl p-4 dark:prose-invert prose-a:no-underline'>
      { compiledSource }

    </div>
  )
}
