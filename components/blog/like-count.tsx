'use client'

import { editLike } from '@/app/actions/blog-user'
import React from 'react'

type LikeCountProps = {
    initialLikes: number
}
const LikeCount = ({ initialLikes = 0 }: LikeCountProps) => {
    function labelLikes(likes: number) {
        return likes === 0
            ? 'Be the first to like'
            : likes === 1
              ? '1 Like'
              : `${likes} Likes`
    }

    return <span>{labelLikes(initialLikes)}</span>
}

export default LikeCount
