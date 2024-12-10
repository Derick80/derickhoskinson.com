import { blogPostSchema } from '@/lib/types'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { MdxComponents } from '@/app/actions/mdx-config'
import MDXButton from '@/components/mdx/mdx-button'
import { getPostBySlug } from '@/app/actions/blog'
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
    const post = await getPostBySlug(slug)
    if (!post) {
        throw new Error('Post not found')
    }
    const { content, frontmatter } = post
    return (
        <section className='prose prose-neutral dark:prose-invert prose-a:no-underline mx-auto max-w-4xl p-4'>
            {/* @ts-iexpect-error server comp */ }
            <MDXRemote
                source={ frontmatter.content }
                options={ {
                    parseFrontmatter: true
                } }
                components={ {
                    ...MdxComponents.components,
                    MDXButton
                } }
            />
        </section>
    )
}
