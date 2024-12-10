'use client'

import { useState } from 'react'
import { updateExperience } from '../actions/cv'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFormStatus } from 'react-dom'

type Experience = {
    id: string
    company: string
    jobTitle: string
    location: string
    startDate: string
    endDate: string
}

type ExperienceType = {
    experience: Experience
}
export function ExperienceItem({ experience }: ExperienceType) {
    const [isEditing, setIsEditing] = useState<{ [key: string]: boolean }>({})
    const [editedValues, setEditedValues] = useState<{ [key: string]: string }>(
        {}
    )
    const status = useFormStatus()

    const handleEdit = (field: string) => {
        setIsEditing((prev) => ({ ...prev, [field]: true }))
        setEditedValues((prev) => ({
            ...prev,
            [field]: experience[field as keyof Experience] as string
        }))
    }

    const handleSave = async (field: string) => {
        const result = await updateExperience(
            experience.id,
            field,
            editedValues[field]
        )
        if (result.success) {
            setIsEditing((prev) => ({ ...prev, [field]: false }))
        } else {
            console.error('Failed to update experience:', result.error)
        }
    }

    const renderField = (field: string, label: string) => {
        return (
            <div className='mb-2 flex flex-col gap-2 space-y-2'>
                <span className='font-semibold'>{label}: </span>
                {isEditing[field] ? (
                    <div className='flex items-center'>
                        <Input
                            type='text'
                            value={
                                editedValues[field as keyof Experience] ||
                                experience[field as keyof Experience]
                            }
                            onChange={(e) =>
                                setEditedValues((prev) => ({
                                    ...prev,
                                    [field]: e.target.value
                                }))
                            }
                            className='mr-2 rounded border px-2 py-1'
                        />
                        <Button
                            onClick={() => handleSave(field)}
                            className='rounded bg-green-500 px-2 py-1 text-white'
                            disabled={status.pending}
                        >
                            Save
                        </Button>
                    </div>
                ) : (
                    <span
                        onClick={() => handleEdit(field)}
                        className='cursor-pointer hover:underline'
                    >
                        {experience[field as keyof Experience] ||
                            editedValues[field as keyof Experience]}
                    </span>
                )}
            </div>
        )
    }

    return (
        <div className='mb-4 rounded border p-4'>
            {renderField('company', 'Company')}
            {renderField('jobTitle', 'Job Title')}
            {renderField('location', 'Location')}
            {renderField('startDate', 'Start Date')}
            {renderField('endDate', 'End Date')}
        </div>
    )
}
