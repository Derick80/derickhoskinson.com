import { blogPostSchema } from '@/lib/types'
import { getOnePost } from '@/app/actions/blog'

export default async function Page (props: {
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

    const { frontmatter, compiledSource } = await getOnePost(slug)
    if (!frontmatter || !compiledSource) {
        throw new Error('No post found')
    }

    return (
        <div className='prose prose-neutral dark:prose-invert mx-auto max-w-2xl p-4 dark:prose-invert prose-a:no-underline'>
            { compiledSource }
        </div>
    )
}
