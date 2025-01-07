'use client'

import { updateExperience, updateDuty } from '@/app/actions/cv'
import { formatDate } from '@/lib/utils'
import React from 'react'
import { ExperienceSchema } from '@/lib/types/cv-resume'
import EditableField from './editable-item'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import MonthPicker from '@/components/shared/month-picker'
import YearPicker from '@/components/shared/year-picker'
import WorkPeriod from '@/components/shared/work-period'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'

export function InlineEditableExperience ({
    experience
}: {
    experience: ExperienceSchema & {
        duties: ExperienceSchema['duties']
    }
}) {
    const [exp, setExp] = React.useState(experience)

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
        <Card className='flex w-full flex-col gap-2'>
            <CardHeader>
                <CardTitle>Experience</CardTitle>
                <CardDescription>
                    You can edit the fields below by clicking on them. Press
                    Enter or click outside the field to save.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <EditableField
                    label='Job Title'
                    type='text'
                    id={ exp.id }
                    value={ exp.jobTitle }
                    onUpdate={ (value) => updateField('jobTitle', value) }
                />

                <EditableField
                    label='Company'
                    id={ exp.id }
                    type='text'
                    value={ exp.company }
                    onUpdate={ (value) => updateField('company', value) }
                />

                <EditableField
                    label='Location'
                    id={ exp.id }
                    type='text'
                    value={ exp.location }
                    onUpdate={ (value) => updateField('location', value) }
                />

                <div className='flex flex-col gap-2 border-2 border-indigo-500 p-2'>
                    <p className='text-lg font-bold'>Employment range</p>
                    <p className='text-sm text-gray-500'>
                        Select the month and year you started and ended working
                        at this job.
                    </p>
                    <div className='relative flex items-center justify-between gap-2'>
                        <Label htmlFor='start-date'>Start Date</Label>{ ' ' }
                        <Label htmlFor='start-date'>End Date</Label>
                    </div>
                    <div className='relative flex items-center justify-between gap-2'>
                        <WorkPeriod
                            value={ exp.startDate.toString() }
                            onChange={ (value) =>
                                updateField('startDate', value)
                            }
                        />
                        <p>|</p>
                        <WorkPeriod
                            value={ exp.startDate.toString() }
                            onChange={ (value) => updateField('endDate', value) }
                        />
                    </div>
                </div>
                <ul>
                    { exp.duties.map((duty) => (
                        <li key={ duty.id }>
                            <EditableField
                                label='Duty'
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
            </CardContent>
        </Card>
    )
}
