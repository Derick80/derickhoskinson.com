'use client'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import React, { Suspense, useActionState } from 'react'
import CommentForm from './comment-form'
import { labelCommentCounts } from '@/lib/utils'
import { CommentRetrievalType, CommentsContainerProps } from '@/lib/types'
import { Button } from '../ui/button'
import CommentList from './comment-list'
import { commentOnPost } from '@/app/actions/comments'

const CommentsContainer = ({ postId, comments }: CommentsContainerProps) => {
    const [showComments, setShowComments] = React.useState(false)

    const handLeShowComments = () => {
        setShowComments((prev) => !prev)
    }
    // get the message from the comment form

    return (
        <div className='flex w-full flex-col gap-2 space-y-2 border-2 p-2'>
            <div className='flex cursor-pointer items-center space-x-2'>
                <ChatBubbleIcon className='h-4 w-4' />
                <span>{labelCommentCounts(comments?.length)}</span>
            </div>{' '}
            <Suspense fallback={<p>Loading form...</p>}>
                <CommentForm targetId={postId} postId={postId} />
            </Suspense>
            <Button type='button' onClick={handLeShowComments} variant='link'>
                {showComments ? 'Hide Comments' : 'Show Comments'}
            </Button>
            {showComments && (
                <CommentList initialComments={comments} postId={postId} />
            )}
        </div>
    )
}

export default CommentsContainer
