'use client'

import { ChatBubbleIcon } from '@radix-ui/react-icons'
import { Button } from '../ui/button'
import { labelCommentCounts } from '@/lib/utils'
import { CommentRetrievalType } from '@/lib/types'

type CommentButtonProps = {
    targetId: string
    isAuth: boolean | undefined | null
    commentCount: number
}

const CommentButton = ({
    targetId,
    isAuth,
    commentCount
}: CommentButtonProps) => {
    console.log('comments', commentCount)
    return (
        <Button type='button' variant='ghost'>
            <ChatBubbleIcon className='h-6 w-6' />
            <span>{ labelCommentCounts(commentCount) }</span>
        </Button>
    )
}

export default CommentButton
