'use client'
import React from 'react'

type PostLikeButtonProps = {
    postId: string
    isAuth: boolean
    totalLikes: number
    incomingLikes: {
        postId: string
        userId: string
    }[]
}

const PostLikeButton = ({
    postId,
    incomingLikes,
    isAuth,
    totalLikes = 0
}: PostLikeButtonProps) => {
    const [likes, setLikes] = React.useState(totalLikes)

    const userLiked = incomingLikes.some((like) => like.userId === postId)

    const handleLike = async () => {
        const formData = new FormData()

        formData.append('postId', postId)
        formData.append('shield', '')

        const result =
            await // @ts-expect-error - TS doesn't like the FormData type
            editLike(null, formData)
        if (result?.message === 'Liked') {
            setLikes(likes + 1)
        }
        if (result?.message === 'Unliked') {
            setLikes(likes - 1)
        } else {
            return
        }
    }

    return (
        <button
            onClick={
                isAuth
                    ? handleLike
                    : () => alert('You must be logged in to like this post')
            }
        >
            {likes} 👍
        </button>
    )
}

export default PostLikeButton
