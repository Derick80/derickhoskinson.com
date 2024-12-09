'use client'
import { updateExperience } from '@/app/actions/cv'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
    CardFooter,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { UpdateExperienceErrorType } from '@/lib/types'
import { formatDate, formatDateToMonthYear, parseDate } from '@/lib/utils'
import { Check, Pencil, Plus, Trash, X } from 'lucide-react'
import Form from 'next/form'
import React from 'react'
import { useFormState } from 'react-dom'
import { L } from 'vitest/dist/chunks/reporters.anwo7Y6a.js'

function formatLabel (key: string): string {
    return key
        .split(/(?=[A-Z])/)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}
interface Duty {
    id: string
    title: string
    experienceId: string
}
type ExperienceProps = {
    id: string
    cvId: string
    company: string
    jobTitle: string
    location: string
    startDate: Date
    endDate: Date
    duties: Duty[]
}

const EditableExperienceCard = ({
    experience
}: {
    experience: ExperienceProps
}) => {
    const { id, cvId, company, jobTitle, location, startDate, endDate, duties } = experience

    function handleUpdateExperience (
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        updateExperience(formData)



    }
    return (
        <div
            className="flex border flex-col space-y-4 border-red-500"
            id={ id }

        >
            <Label
                htmlFor="company"
                className='font-semibold'
            >
                Company
            </Label>
            <Input
                id="company"
                name="company"
                defaultValue={ company }
            />

        </div>
    )
}

export default EditableExperienceCard
