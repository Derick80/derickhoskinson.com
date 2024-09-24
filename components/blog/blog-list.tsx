// list all of the blogs as a list / card

import { MDXFrontMatter } from '@/lib/types'


type BlogListProps = {
    postsData:
    MDXFrontMatter


}


const BlogList = ({
    postsData
}: BlogListProps) => {
    const { title, slug, author, date, published, readingTime, wordCount, categories } = postsData
    return (

        <div>

        </div>
    )
}

export default BlogList