'use client'
import React, { useActionState, useOptimistic } from 'react'
import { commentOnPost } from '@/app/actions/comments'

import SubmitButton from './submit-button'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { z } from 'zod'

const messages = z.object({
    messages: z.string({
        invalid_type_error: 'Message must be a string.'
    }),
    postId: z.string({
        invalid_type_error: 'postId must be a string.'
    }),
    targetId: z.string({
        invalid_type_error: 'targetId must be a string.'
    }),
    shield: z.string({
        invalid_type_error: 'shield must be a string.'
    })
})

const messageSchema = z.object({
    messages: z
        .string({
            invalid_type_error: 'Message must be a string.'
        })
        .optional(),
    postId: z.string({
        invalid_type_error: 'postId must be a string.'
    }),
    targetId: z.string({
        invalid_type_error: 'targetId must be a string.'
    }),
    shield: z.string({
        invalid_type_error: 'shield must be a string'
    })
})

export type Message = z.infer<typeof messages>

const CommentForm = ({
    postId,
    targetId,
    messages
}: {
    postId: string
    targetId: string
    messages?: string
}) => {
    if (!postId) {
        throw new Error('postId is required.')
    }
    if (!targetId) {
        throw new Error('targetId is required.')
    }
    const [commentState, setCommentState] = React.useState({
        messages,
        postId,
        targetId,
        shield: ''
    })

    const handleChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        const { name, value } = event.target

        setCommentState({
            ...commentState,
            [name]: value
        })
    }

    const handleSubmit = async (event: React.FormEvent) => {
        const validatedData = messageSchema.safeParse({
            messages: commentState.messages,
            postId: commentState.postId,
            targetId: commentState.targetId,
            shield: commentState.shield
        })

        if (!validatedData.success) {
            throw new Error(validatedData.error.errors[0].message)
        }

        const { data } = validatedData

        const formData = new FormData()
        formData.append('postId', data.postId)
        formData.append('targetId', data.targetId)
        formData.append('shield', data.shield)
        formData.append('commentMessage', data.messages)

        const result = await commentOnPost(formData, {
            message: data.messages
        })

        if (result?.message === 'Commented') {
            alert('Commented')
        }
    }

    return (
        <form
            onChange={handleSubmit}
            className='flex flex-col space-y-2'
            // onSubmit={ handleSubmit }
        >
            <input type='hidden' name='postId' value={postId} />
            <input type='hidden' name='targetId' value={targetId} />
            <input type='hidden' name='shield' value=' ' />
            <Label htmlFor='commentMessage'>
                <Textarea
                    name='commentMessage'
                    id='commentMessage'
                    placeholder='Write your comment here...'
                    defaultValue={commentState.messages || ''}
                    onChange={handleChange}
                    required
                    onSubmit={handleSubmit}
                />
            </Label>

            <SubmitButton onSubmit={handleSubmit} />
        </form>
    )
}

export default CommentForm
