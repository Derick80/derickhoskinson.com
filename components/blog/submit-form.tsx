import Form from 'next/form'
import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { useActionState } from 'react'
import { commentOnPost } from '@/app/actions/blog-user'
import React from 'react'
import { initialCommentState } from '@/lib/types'



type SubmitFormProps = {
    children: React.ReactNode
}

const SubmitForm = (
    {
        children,

    }: SubmitFormProps
) => {
    const formRef = React.useRef<HTMLFormElement>(null)

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>,
        target: HTMLFormElement) => {
        const formData = new FormData(
            e.currentTarget
        )
        await commentOnPost(initialCommentState, formData)


    }
    return (
        <Form
            id='submit-form'
            onSubmit={
                (e) => handleSubmit(e, formRef.current as HTMLFormElement)


            }

            ref={ formRef
            }



        >
            { children }
            <Button
                type='submit'
                variant='ghost'
                form='submit-form'

            >
                Submit
            </Button>
        </Form>
    )



}

export default SubmitForm