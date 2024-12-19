'use server'
import { HeartIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipTrigger } from '../ui/tooltip'
import { editLike, getPostInformation } from '@/app/actions/blog-user'
import React, { useActionState } from 'react'
import LikeCount from './like-count'
import { cn } from '@/lib/utils'
import { verifySession } from '@/app/actions/auth'
import ResponseForm from './response-form'
import ResponseUsers from './response-users'

type LikeButtonProps = {
    postId: string
    isAuth: boolean | undefined | null
}

const LikeButton = async ({ postId, isAuth }: LikeButtonProps) => {
    if (!postId) {
        throw new Error('postId is required.')
    }
    const session = await verifySession()
    const authedUserId = session?.userId

    const posts = await getPostInformation({ postId })
    const likes = posts?.likes
    if (!likes) {
        return
    }
    const hasLiked = likes?.some((like) => like.userId === authedUserId)

    return (
        <>
            <ResponseForm
                postId={postId}
                userLiked={hasLiked || false}
                allLikes={likes}
                isAuth={isAuth}
                onResponse={editLike}
                initialLikes={posts?.likes.length}
            />
        </>
    )
}

export default LikeButton
