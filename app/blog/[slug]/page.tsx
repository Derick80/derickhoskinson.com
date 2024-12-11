
import { blogPostSchema } from '@/lib/types'
import { MdxComponents } from '@/app/actions/mdx-config'
import MDXButton from '@/components/mdx/mdx-button'
import { getAllPosts, getPostBySlug } from '@/app/actions/blog'
import { serialize } from 'next-mdx-remote/serialize'
import { MDXRemote, type MDXRemoteSerializeResult } from 'next-mdx-remote/rsc'
import { Suspense } from 'react'
import remarkGfm from 'remark-gfm'


export async function generateStaticParams () {

    const posts = await getAllPosts()
    if (!posts) {
        throw new Error('Post not found')
    }
    return posts.map((post) => ({
        params: { slug: post.frontmatter.slug }

    })
    )

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
    const post = await getPostBySlug(slug)
    if (!post) {
        throw new Error('Post not found')
    }
    const { content, frontmatter } = post
    return (
        <article className="relative prose dark:prose-invert z-10 mx-auto  max-w-4xl px-2 py-4 space-y-4 align-middle md:px-0 overflow-auto">
            <Suspense fallback={ <>Loading...</> }>
                { content }
                {/* @ts-iexpect-error server comp */ }

            </Suspense>
        </article>
    )
}
