import React, { Suspense } from 'react'

import { BlogCard } from '@/components/blog/blog-card'
import { getPostsMetaData } from '../actions/blog'

export default async function Blog () {
    const frontmatter = await getPostsMetaData()
    if (!frontmatter) return null
    console.log(frontmatter, 'frontmatter at blog.tsx')
    return (
        <div className='flex min-h-screen flex-col gap-4 py-2 md:gap-6'>
            <h1>Blog</h1>
            <p>
                Welcome to my blog! This blog is a collection of thoughts and
                ideas on clinical genetics, bioinformatics, and other topics
                that interest me. You may filter the posts by category and read
                the entire post by clicking on the Read More button.
            </p>

            {
                frontmatter.map((post) => (
                    post.slug && (
                        <Suspense
                            key={ post.slug }
                            fallback={ <p>Loading...</p> }>
                            <BlogCard
                                key={ post.slug }
                                { ...post } />
                        </Suspense>
                    )
                ))
            }
        </div>
    )
}
