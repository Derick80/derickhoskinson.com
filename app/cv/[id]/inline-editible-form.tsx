'use client'

import { useState } from 'react'
import { updateExperience, updateDuty } from '@/app/actions/cv'
import { formatDate } from '@/lib/utils'
import React from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ExperienceSchema } from '@/lib/types/cv-resume'

const EditableField = ({
    value,
    id,
    type,
    onUpdate
}: {
    value: string
    id: string
    type: string | undefined
    onUpdate: (value: string) => void
}) => {
    const [editing, setEditing] = React.useState(false)
    const [currentValue, setCurrentValue] = React.useState(value)

    const handleUpdate = () => {
        onUpdate(currentValue)
        setEditing(false)
    }

    if (editing) {
        return (
            <>
                { type === 'textarea' ? (
                    <Textarea
                        value={ currentValue }
                        id={ id }
                        onChange={ (e) => setCurrentValue(e.target.value) }
                    />
                ) : (
                    <Input
                        type={ type }
                        id={ id }
                        value={ currentValue }
                        onChange={ (e) => setCurrentValue(e.target.value) }
                        onBlur={ handleUpdate }
                        onKeyDown={ (e) => e.key === 'Enter' && handleUpdate() }
                        autoFocus
                    />
                ) }
            </>
        )
    }

    return <span onClick={ () => setEditing(true) }>{ value }</span>
}

export function InlineEditableExperience ({
    experience
}: {
    experience: ExperienceSchema & {
        duties: ExperienceSchema['duties']
    }
}) {
    const [exp, setExp] = useState(experience)

    const updateField = async (field: string, value: string) => {
        const formData = new FormData()
        formData.append('id', exp.id)
        formData.append('content', field)
        formData.append(field, value)

        await updateExperience(formData)

        setExp({ ...exp, [field]: value })
    }

    const updateDutyField = async (dutyId: string, value: string) => {
        await updateDuty(dutyId, { title: value })
        setExp({
            ...exp,
            duties: exp.duties.map((duty) =>
                duty.id === dutyId ? { ...duty, title: value } : duty
            )
        })
    }

    return (
        <div className='flex w-full flex-col gap-2'>
            <input type='hidden' name='id' value={ exp.id } />
            <Label htmlFor='jobTitle'>Job Title</Label>

            <EditableField
                type='text'
                id={ exp.id }
                value={ exp.jobTitle }
                onUpdate={ (value) => updateField('jobTitle', value) }
            />
            <p>
                <EditableField
                    id={ exp.id }
                    type='text'
                    value={ exp.company }
                    onUpdate={ (value) => updateField('company', value) }
                />
            </p>
            <p>
                <EditableField
                    id={ exp.id }
                    type='text'
                    value={ exp.location }
                    onUpdate={ (value) => updateField('location', value) }
                />
            </p>
            <p>
                <EditableField
                    id={ exp.id }
                    type='date'
                    value={ formatDate(exp.startDate) }
                    onUpdate={ (value) => updateField('startDate', value) }
                />{ ' ' }
                -
                <EditableField
                    id={ exp.id }
                    type='date'
                    value={ formatDate(exp.endDate) }
                    onUpdate={ (value) => updateField('endDate', value) }
                />
            </p>
            <ul>
                { exp.duties.map((duty) => (
                    <li key={ duty.id }>
                        <EditableField
                            id={ duty.id }
                            type='textarea'
                            value={ duty.title }
                            onUpdate={ (value) =>
                                updateDutyField(duty.id, value)
                            }
                        />
                    </li>
                )) }
            </ul>
        </div>
    )
}
