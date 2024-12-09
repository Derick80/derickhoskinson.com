import { blogPostSchema } from '@/lib/types'
import { getOnePost, getPost, POSTS_FOLDER } from '@/app/actions/blog'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { mdxComponents } from '@/app/actions/mdx-config'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import MDXButton from '@/components/mdx/mdx-button'
export async function generateStaticParams() {
    const files = fs.readdirSync(POSTS_FOLDER)

    const paths = files.map((filename) => ({
        slug: filename.replace('.mdx', '')
    }))

    return paths
}
export default async function Page(props: {
    params: Promise<{
        slug: string
    }>
}) {
    const params = await props.params
    if (!params) {
        throw new Error('No params provided')
    }

    const { slug } = blogPostSchema.parse(params)
    if (!slug) {
        throw new Error('No slug provided')
    }

    const post = await getPost({ slug })
    return (
        <section className='prose prose-neutral dark:prose-invert prose-a:no-underline mx-auto max-w-4xl p-4'>
            {/* @ts-iexpect-error server comp */}
            <MDXRemote
                source={post.content}
                components={{
                    ...mdxComponents.components,
                    MDXButton
                }}
            />
        </section>
    )
}
