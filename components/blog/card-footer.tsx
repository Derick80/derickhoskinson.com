'use server'

import { verifySession } from '@/app/actions/auth'

import { getPostsComments } from '@/app/actions/comments'
import { targetPostSchema } from '@/lib/types'
import { Suspense } from 'react'
import CommentsContainer from './comment-container'
import { getPostLikes } from '@/app/actions/likes'
import PostLikeButton from './like-button-beta'

export type BlogCardFooterProps = {
    postId: string
    children: React.ReactNode
}
const BlogCardFooter = async ({ postId, children }: BlogCardFooterProps) => {
    const session = await verifySession()
    const validatedData = targetPostSchema.safeParse({
        postId
    })

    if (!validatedData.success) {
        return {
            message: validatedData.error.flatten().fieldErrors
        }
    }
    const associatedPostId = validatedData.data.postId
    if (!associatedPostId) {
        throw new Error('No post ID found')
    }
    const postComments = await getPostsComments({
        postId: associatedPostId
    })

    // console.log(postComments, 'postComments')

    const postLikes = await getPostLikes(associatedPostId)

    // console.log(postLikes, 'postLikes')
    if (!postComments) {
        throw new Error('No comments found')
    }

    if (!postLikes) {
        throw new Error('No likes found')
    }

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className='flex w-full flex-col justify-between space-y-2'>
                <PostLikeButton
                    postId={postId}
                    totalLikes={postLikes.length ? postLikes.length : 0}
                    isAuth={session?.isAuthenticated ? true : false}
                    incomingLikes={postLikes}
                />

                {children}
                <CommentsContainer
                    postId={postId}
                    comments={
                        postComments?.comments
                            ? postComments.comments.map((comment) => ({
                                  ...comment,
                                  author: comment.author || 'Anonymous'
                              }))
                            : []
                    }
                />

                {/* <SharePostButton id={ postId } /> */}
            </div>
        </Suspense>
    )
}

export default BlogCardFooter
