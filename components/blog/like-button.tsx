'use server'
import React from 'react'
import { targetPostSchema } from '@/lib/types'
import { getAllPostsSummary } from '@/app/actions/comments'
import { verifySession } from '@/app/actions/auth'
import PostLikeButton from './like-button-beta'
import { getPostLikes } from '@/app/actions/likes'

type LikeButtonProps = {
    postId: string
    isAuth: boolean
}

const LikeButton = async ({ postId,
    isAuth
}: LikeButtonProps) => {
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
    // check auth status
    const session = await verifySession()
    const isAuthenticated = session?.isAuthenticated
    const userId = session?.userId

    const { posts } = await getAllPostsSummary()

    if (!posts) {
        return {
            message: 'Failed to retrieve posts'
        }
    }

    const post = posts.find((post) => post.id === associatedPostId)

    const likes = post?.likes || []

    return (
        <>
            <PostLikeButton
                incomingLikes={ await
                    getPostLikes(associatedPostId)
                }
                postId={ associatedPostId }
                isAuth={ isAuthenticated ? true : false }
                totalLikes={ likes?.length ? likes.length : 0 }
            />
        </>
    )
}

export default LikeButton
