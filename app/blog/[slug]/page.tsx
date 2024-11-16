
import { DetailedHTMLProps, HTMLAttributes } from 'react'
import { blogPostSchema } from '@/lib/types'
import { getOnePost } from '@/app/actions/blog'
import { ImageProps } from 'next/image'

// import { MDXPre } from '@/components/mdx/sync-functions'
// export async function generateStaticParams () {
//   const frontmatter = await getPostsMetaData()
//   if (!frontmatter) return []

//   return frontmatter.map((post) => ({ params: { slug: post.slug } }))
// }
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


  const { frontmatter, compiledSource } = await getOnePost(slug)
  // const post = compiledSource
  const Component = compiledSource
  return (
    <div className='prose prose-zinc mx-auto max-w-2xl p-4 dark:prose-invert prose-a:no-underline'>

      {
        compiledSource
      }
    </div>
  )
}
