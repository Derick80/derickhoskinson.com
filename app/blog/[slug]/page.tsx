
import { DetailedHTMLProps, HTMLAttributes, Suspense } from 'react'
import { blogPostSchema } from '@/lib/types'
import { getOnePost, getPageData, getPostBySlug, getPostsMetaData } from '@/app/actions/blog'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote } from 'next-mdx-remote/rsc'
import * as fs from 'fs/promises'
import path from 'path'
import { cn } from '@/lib/utils'
import { ImageProps } from 'next/image'
import remarkGfm from 'remark-gfm'
import { MDXPre } from '@/components/mdx/sync-functions'
import CldImage from '@/components/shared/client-cloudinary'
import { mdxComponents } from '@/app/actions/mdx-config'

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
  return (
    <div className='prose prose-zinc mx-auto max-w-2xl p-4 dark:prose-invert prose-a:no-underline'>
      <Suspense fallback={ <p>Loading...</p> }>
        {

          compiledSource
        }
      </Suspense>
    </div>
  )
}
