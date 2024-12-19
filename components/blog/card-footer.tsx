'use server'

import {
    commentOnPost,
    getPostInformation,
    getPostsComments
} from '@/app/actions/blog-user'
import LikeButton from './like-button'
import prisma from '@/lib/prisma'
import { verifySession } from '@/app/actions/auth'
import { Suspense } from 'react'
import { Button } from '../ui/button'
import CommentsContainer from './comment-container'
import CommentForm from './comment-form'
import { SharePostButton } from './share-button'
import CommentButton from './comment-button'

export type BlogCardFooterProps = {
    postId: string
    isAuth: boolean | undefined | null
    currentUserId: string
}
const BlogCardFooter = async ({ postId, isAuth,
    currentUserId
}: BlogCardFooterProps) => {
    const postComments = await getPostsComments({ postId })
    const session = await verifySession()
    if (!postId) {
        throw new Error('postId is required.')
    }

    if (!isAuth) {
        return
    }

    return (
        <Suspense fallback={ <div>Loading...</div> }>
            { postId && (
                <div className='flex w-full flex-col justify-between space-y-2'>
                    <div className='flex items-center space-x-2'>
                        <LikeButton postId={ postId } isAuth={ isAuth } />
                        <SharePostButton id={ postId } />
                        <CommentButton
                            targetId={ postComments.postId }
                            isAuth={ isAuth }
                            commentCount={ postComments.comments?.length || 0 }
                        />
                    </div>

                    <CommentsContainer
                        comments={ postComments.comments }
                        postId={ postId }
                        isAuth={ isAuth }
                        userId={ currentUserId
                        }

                    />
                </div>
            ) }
        </Suspense>
    )
}

export default BlogCardFooter
