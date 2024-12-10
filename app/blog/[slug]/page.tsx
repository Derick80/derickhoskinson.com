import { blogPostSchema } from '@/lib/types'
import { getPostBySlug, POSTS_FOLDER } from '@/app/actions/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/app/actions/mdx-config'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MDXButton from '@/components/mdx/mdx-button'
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
    console.log('slug page', slug)
    const {
        frontmatter: post,

    } = await getPostBySlug(slug)
    return (
        <section className='prose prose-neutral dark:prose-invert prose-a:no-underline mx-auto max-w-4xl p-4'>
            {/* @ts-iexpect-error server comp */ }
            <MDXRemote
                source={
                    post.content
                }
                options={ {
                    parseFrontmatter: true,
                } }
                components={ {
                    ...mdxComponents.components,
                    MDXButton
                } }
            />
        </section>
    )
}
