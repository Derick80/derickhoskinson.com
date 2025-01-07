import { blogPostSchema } from '@/lib/types'
import { MdxComponents } from '@/app/actions/mdx-config'
import MDXButton from '@/components/mdx/mdx-button'
import { getAllPosts, getPostBySlug } from '@/app/actions/blog'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'
import remarkGfm from 'remark-gfm'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import PostInformation from './post-information'

export async function generateStaticParams() {
    const posts = await getAllPosts()
    if (!posts) {
        throw new Error('Post not found')
    }
    return posts.map((post) => ({
        params: { slug: post.slug }
    }))
}
export default async function Page(props: {
    params: Promise<{
        slug: string
    }>
}) {
    const params = await props.params

    const { slug } = blogPostSchema.parse(params)
    if (!slug) {
        throw new Error('No slug provided')
    }
    const post = await getPostBySlug(slug)
    if (!post) {
        throw new Error('Post not found')
    }
    console.log(post, 'post')
    const { rawMdx, ...rest } = post

    return (
        <article className='prose relative z-10 mx-auto max-w-4xl space-y-4 overflow-auto px-2 py-4 align-middle dark:prose-invert md:px-0'>
            <Suspense fallback={<>Loading...</>}>
                <PostInformation {...rest} />
                {/* @ts-iexpect-error server comp */}
                {rawMdx}
            </Suspense>
        </article>
    )
}
