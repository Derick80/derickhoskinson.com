'use client'
import React, { useActionState } from 'react'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { commentOnPost } from '@/app/actions/blog-user'
import { revalidateTag } from 'next/cache'
import Form from 'next/form'
import SubmitForm from './submit-form'

const initialState = {
    message: ''

}


const CommentForm = ({
    postId,
    targetId,
    isAuth,
    children,
    userId
}: {
    postId: string
    targetId: string
    isAuth: boolean | undefined | null
    children?: React.ReactNode
    userId: string
}) => {


    const formRef = React.useRef<HTMLFormElement>(null)
    if (!targetId) {
        throw new Error('targetId is required.')
    }

    const [comment, setComment] = React.useState(
        initialState.message

    )

    return (
        <SubmitForm
            useFormAction={ commentOnPost }
        >
            <input type='hidden' name='shield' value='' />
            <input type='hidden' name='postId' value={ postId } />
            <input type='hidden' name='targetId' value={ targetId } />
            <input type='hidden' name='userId' value={ userId
            } />

            <Label htmlFor='comment-message'>
                Comment:
                <Textarea
                    name='comment-message'
                    placeholder='Leave a comment'
                    required
                    value={ comment }
                    onChange={
                        (e) => setComment(e.target.value)
                    }

                    disabled={ !isAuth

                    }
                />
            </Label>




        </SubmitForm >

    )
}

export default CommentForm
