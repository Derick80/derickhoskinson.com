import BlogList from '@/components/blog/blog-list'
import { getAllBlogPosts, getSlugsAndCategories } from '../actions/mdx-server'
import CategoriesContainer from '@/components/blog/categories/categories-container'

export default async function Blog () {
    const metadata = await getAllBlogPosts()
    const posts = metadata.map((post) => post.metadata)
    const categories = (await getSlugsAndCategories()).flat()
    if (!posts) {
        throw new Error('No posts found')
    }
    if (!categories) {
        throw new Error('No categories        found')
    }
    console.log(categories, 'categories from Blog');

    return (
        <div
            className="prose dark:prose-invert min-w-full prose-a:no-underline">



        </div>
    )
}
