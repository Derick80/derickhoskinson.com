import { CodeBlock, getAllPosts } from '@/app/actions/mdx-server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { z } from 'zod'
import remarkGfm from 'remark-gfm'
import Image, { ImageProps } from 'next/image'
import { cn } from '@/lib/utils'
import { DetailedHTMLProps, HTMLAttributes, Suspense } from 'react'
import { blogPostSchema } from '@/lib/types'
import * as fs from 'fs/promises'
import path from 'path'
import CldImage from '@/components/shared/client-cloudinary'


export async function generateStaticParams () {
  const posts = await getAllPosts()
  return posts.map((post) => ({ params: { slug: post.slug } }))
}
export default async function BlogPost (props: {
  params: Promise<{
    slug: string
  }>
}) {
  const params = await props.params
  const { slug } = blogPostSchema.parse(params)
  if (!slug) {
    throw new Error('No slug provided')
  }

  const post = await getAllPosts().then((posts) => {
    const postData = posts.find((post) => post.slug === slug)
    if (!postData) {
      throw new Error('No post found')
    }
    return {
      slug: postData.slug,
      content: postData.content
    }
  })

  if (!post) {
    throw new Error('No post found')
  }

  const content = await fs.readFile(path.join(process.cwd(), 'app/blog/content', `${post.slug}.mdx`), 'utf-8')
  return (
    <div className='prose prose-zinc mx-auto max-w-2xl p-4 dark:prose-invert prose-a:no-underline'>

      <Suspense fallback={ <>Loading...</> }>
        <MDXRemote
          source={ post.content }
          components={ {
            pre: ({ children, ...props }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
              <CodeBlock code={ post.content } { ...props } />
            ),
            img: ({ src, ...props }: ImageProps) => (
              <div className={ cn('relative', props.className) }>
                <CldImage
                  src={ String(src) }
                  width={ 250 }
                  height={ props.height || 250 }
                  { ...props }
                  alt='blog image'
                />
              </div>
            )
          } }
          options={ {
            mdxOptions: {
              remarkPlugins: [remarkGfm]
            }
          } }
        />
      </Suspense>
    </div>
  )
}
