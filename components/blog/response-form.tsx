'use client'
import { verifySession } from '@/app/actions/auth'
import { editLike } from '@/app/actions/blog-user'
import React from 'react'
import { useActionState } from 'react'
import { Button } from '../ui/button'
import LikeCount from './like-count'
import { cn } from '@/lib/utils'
import { HeartFilledIcon, HeartIcon, Share1Icon } from '@radix-ui/react-icons'
import { Tooltip, TooltipTrigger } from '../ui/tooltip'

import Form from 'next/form'
import ResponseUsers from './response-users'

const ResponseForm = ({
    postId,
    userLiked,
    onResponse,
    initialLikes,
    isAuth,
    allLikes
}: {
    postId: string
    userLiked: boolean
    onResponse: typeof editLike
    initialLikes: number | undefined | null
    isAuth: boolean | undefined | null
    allLikes: {
        postId: string
        userId: string
        user: {
            id: string
            name: string | null
            email: string
        }
    }[]
}) => {
    const [likes, setLikes] = React.useState(initialLikes || 0)
    const [hasLiked, setHasLiked] = React.useState(userLiked)
    const [isPending, startTransition] = React.useTransition()

    const handleLike = (e: React.MouseEvent<HTMLButtonElement>) => {
        startTransition(async () => {
            const formData = new FormData()

            formData.append('postId', postId)
            formData.append('shield', '')

            const result = await editLike(formData)
            if (result?.message === 'Liked') {
                setLikes(likes + 1)
                setHasLiked(true)
            }
            if (result?.message === 'Unliked') {
                setLikes(likes - 1)
                setHasLiked(false)
            } else {
                return
            }
        })
    }

    return (
        <>
            {isAuth ? (
                <Button
                    type='submit'
                    variant='ghost'
                    className={cn(
                        'h-4 w-4 transition-transform',
                        hasLiked && 'scale-110 fill-current text-pink-500',
                        isPending && 'animate-pulse'
                    )}
                    onClick={(e) => {
                        e.preventDefault()
                        handleLike(e)
                    }}
                    disabled={isPending}
                >
                    {hasLiked ? (
                        <HeartFilledIcon className={cn('text-red-500')} />
                    ) : (
                        <HeartIcon />
                    )}
                </Button>
            ) : (
                <Tooltip>
                    <TooltipTrigger content='Login to like' asChild>
                        <Button
                            type='button'
                            disabled
                            className={cn(
                                'h-4 w-4 transition-transform',
                                hasLiked &&
                                    'scale-110 fill-current text-pink-500',
                                isPending && 'animate-pulse'
                            )}
                        >
                            <HeartIcon
                                className={cn(
                                    'flex items-center space-x-2 transition-colors',
                                    hasLiked &&
                                        'bg-pink-100 text-pink-500 hover:bg-pink-200 hover:text-pink-600'
                                )}
                            />
                        </Button>
                    </TooltipTrigger>
                </Tooltip>
            )}

            <ResponseUsers
                totalLikes={likes}
                users={allLikes?.map((like) => like?.user)}
            />
        </>
    )
}

export default ResponseForm
