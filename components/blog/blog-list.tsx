import { getAllPosts } from '@/app/actions/mdx-server'
import { BlogCard } from './blog-card'
import React from 'react'

export default async function BlogList() {
    const posts = await getAllPosts()
    return (
        <>
            {posts.map(
                (post) => post.slug && <BlogCard key={post.slug} {...post} />
            )}
        </>
    )
}
