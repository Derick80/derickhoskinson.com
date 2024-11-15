import { getAllPosts, getPageData } from '@/app/actions/mdx-server'
import { Suspense } from 'react'
import { blogPostSchema } from '@/lib/types'
import MdxViewer from './mdx-viewer'

export async function generateStaticParams() {
    const posts = await getAllPosts()
    return posts.map((post) => ({ params: { slug: post.slug } }))
}
export default async function BlogPost(props: {
    params: Promise<{
        slug: string
    }>
}) {
    const params = await props.params
    const { slug } = blogPostSchema.parse(params)
    if (!slug) {
        throw new Error('No slug provided')
    }
    const { content, content_two } = await getPageData(slug)
    return (
        <div className='prose prose-zinc mx-auto max-w-2xl p-4 dark:prose-invert prose-a:no-underline'>
            <Suspense fallback={<>Loading...</>}>
                <MdxViewer content={content_two} />
            </Suspense>
        </div>
    )
}
