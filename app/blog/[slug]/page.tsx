
import { CodeBlock, getAllBlogPosts, getSlugsAndCategories, MDXPre } from '@/app/actions/mdx-server'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { z } from 'zod'
import remarkGfm from 'remark-gfm'

const blogPostSchema = z.object({
    slug: z.string()
})
export type BlogPost = z.infer<typeof blogPostSchema>

export default async function BlogPost ({ params }: {
    params: {
        slug: string
    }
}) {
    const { slug } = blogPostSchema.parse(params)
    if (!slug) {
        throw new Error('No slug provided')
    }

    const post = await getAllBlogPosts().then((posts) => {
        return posts.find((post) => post.metadata.slug === slug)
    }

    )


    if (!post) {
        throw new Error('No post found')
    }

    const categories = await getSlugsAndCategories()
    if (!categories) {
        throw new Error('No data found')
    }


    return (
        <div
            className="prose dark:prose-invert min-w-full prose-a:no-underline p-4">
            <MDXRemote source={ post.content }
                components={ {
                    h1: (props) => (
                        <h1 style={ { color: 'red', fontSize: '48px' } }>{ props.children }</h1>
                    ),
                    pre: (props) => (

                        <MDXPre className="max-h-[400px] bg-content1">{ props.children }</MDXPre>

                    ),
                    code: (props) => <CodeBlock code={ props.children } />,

                } }
                options={ {
                    mdxOptions: {
                        remarkPlugins: [remarkGfm]
                    }
                } }


            />
        </div>
    )
}