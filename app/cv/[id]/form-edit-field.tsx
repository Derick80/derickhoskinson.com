'use client'
import { updateExperience } from '@/app/actions/cv'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ExperienceSchema } from '@/lib/types/cv-resume'
import { useActionState } from 'react'
import Form from 'next/form'

const FormEditField = ({
    content,
    expId,
    field,
    onChange
}: {
    field: keyof ExperienceSchema
    content: string
    expId: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}) => {
    const isDate = content.includes('date')

    function formatLabel(field: string) {
        // formatt the label to capitalize the first letter and split the string by camel case
        const ready =
            field.charAt(0).toUpperCase() +
            field
                .slice(1)
                .split(/(?=[A-Z])/)
                .join(' ')

        return <p className='font-semibold'>{ready}</p>
    }

    return (
        <form className='mb-4 flex w-full flex-col gap-2'>
            <Label id={expId} htmlFor={field}>
                {formatLabel(field)}
            </Label>
            <Input
                id={expId}
                type={typeof content === 'string' && isDate ? 'date' : 'text'}
                name={field}
                value={content}
                onChange={onChange}
            />
        </form>
    )
}

export default FormEditField
