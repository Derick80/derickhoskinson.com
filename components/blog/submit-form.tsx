import Form from 'next/form'
import { Button } from '../ui/button'
import React from 'react'
import { initialCommentState } from '@/lib/types'
import { commentOnPost } from '@/app/actions/comments'
import { Sub } from '@radix-ui/react-dropdown-menu'
import SubmitButton from './submit-button'

type SubmitFormProps = {
    useCommentSubmit: (formData: FormData) => void
    children: React.ReactNode | React.ReactNode[]
    formRef: React.RefObject<HTMLFormElement>
}

const SubmitForm = ({
    children,

    useCommentSubmit,
    formRef
}: SubmitFormProps) => {
    return (
        <form
            ref={formRef}
            name='submit-form'
            id='submit-form'
            action={useCommentSubmit}
        >
            {children}
            <SubmitButton />
        </form>
    )
}

export default SubmitForm
