import React from 'react'
import { BlogCard } from '@/components/blog/blog-card'
import { getAllPosts } from '../actions/blog'

export default async function Blog () {
    const posts = await getAllPosts()
    if (!posts.length) {
        return null
    }

    const frontmatter = posts
        .map((fm) => fm.frontmatter)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return (
        <div className='flex  flex-col gap-4 py-2 md:gap-6'>
            <h1>Blog</h1>
            <p>
                Welcome to my blog! This blog is a collection of thoughts and
                ideas on clinical genetics, bioinformatics, and other topics
                that interest me. You may filter the posts by category and read
                the entire post by clicking on the Read More button.
            </p>

            { frontmatter.map((post) => (
                <BlogCard key={ post.slug } { ...post } />
            )) }
        </div>
    )
}
