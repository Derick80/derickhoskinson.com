'use client'
import React from 'react'
import SubmitForm from './submit-form'
import { commentOnPost } from '@/app/actions/comments'
import CreateOrEditCommentForm from './create-or-edit-comment-form'
import { CommentRetrievalType, initialCommentState } from '@/lib/types'

const CommentForm = ({
    postId,
    targetId,
    comments
}: {
    postId: string
    targetId: string
    comments: CommentRetrievalType[]
}) => {
    const formRef = React.useRef<HTMLFormElement>(null)
    if (!targetId) {
        throw new Error('targetId is required.')
    }

    const [comment, setComment] = React.useState<typeof initialCommentState>({
        message: '',
        postId: '',
        targetId: '',
        userId: '',
        shield: ''
    })

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target
        setComment((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (formData: FormData) => {
        const commentData = {
            ...comment
        }

        const commentResponse = await commentOnPost(formData, null)
        if (commentResponse.message) {
            return {
                message: commentResponse.message
            }
        }

        setComment((prev) => ({
            ...prev,
            message: ''
        }))

        return {
            message: 'Commented'
        }
    }

    return (
        <SubmitForm
            formRef={formRef as React.RefObject<HTMLFormElement>}
            useCommentSubmit={(formData: FormData) => handleSubmit(formData)}
        >
            <CreateOrEditCommentForm
                postId={postId}
                targetId={targetId}
                userId={comment.userId}
                message={comment.message.toString()}
                setComment={handleSubmit}
                onCommentChange={handleInputChange}
            />
        </SubmitForm>
    )
}

export default CommentForm
