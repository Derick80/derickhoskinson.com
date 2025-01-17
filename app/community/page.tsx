// Placeholder data
// san serif headers
// serif body text
'use client'
import CategoryFilter, { Entry, Tag } from '@/components/shared/category-filter'
import { getForumData, getForumEntries } from '../actions/forums'
import React, { Suspense } from 'react'

export default function CommunityPage() {
    const [entries, setEntries] = React.useState<Entry[]>([])
    const [filteredPosts, setFilteredPosts] = React.useState<Entry[]>([])

    const [tags, setTags] = React.useState<Tag[]>([])
    React.useEffect(() => {
        const fetchData = async () => {
            const { entries, tags } = await getForumData()
            if (!entries) {
                return []
            }
            // @ts-expect-error need to fix this later
            setEntries(entries)
            // @ts-expect-error need to fix this later

            setFilteredPosts(entries)
            // @ts-expect-error need to fix this later

            setTags(tags)
        }
        fetchData()
    }, [])
    return (
        <div className='flex min-h-screen flex-col items-center gap-4 space-y-4'>
            <h1>Community Page</h1>
            <CategoryFilter
                tags={tags}
                entries={entries}
                onFilterChange={setFilteredPosts}
            />
            <Suspense fallback={<p>Loading posts...</p>}>
                {filteredPosts &&
                    filteredPosts?.map((post) => (
                        <div className='w-full' key={post.id}>
                            <h2>{post.title}</h2>
                            <p>{post.content}</p>
                            <p>
                                Tags:
                                {post?.tags?.map((tag) => (
                                    <span key={tag.id}>{tag.title}</span>
                                ))}
                            </p>
                        </div>
                    ))}
            </Suspense>
        </div>
    )
}
