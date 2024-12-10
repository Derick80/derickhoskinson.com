'use client'
import { Button } from '../ui/button'
import React from 'react'
import { createTemplateResume } from '@/app/actions/cv'

const CreateResumeButton = () => {
    const [isPending, startTransition] = React.useTransition()
    return (
        <Button
            onClick={() => {
                startTransition(() => {
                    createTemplateResume()
                })
            }}
            disabled={isPending}
        >
            Create Resume
        </Button>
    )
}

export default CreateResumeButton
