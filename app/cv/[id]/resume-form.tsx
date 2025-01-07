'use client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
    ExperienceSchema,
    type ExperienceSchema as ExperienceType
} from '@/lib/types/cv-resume'
import { updateExperience } from '@/app/actions/cv'

import React from 'react'
import { formatDate } from '@/lib/utils'
import { InlineEditableExperience } from './inline-editible-form'

interface DynamicExperienceProps {
    initialData: ExperienceType
}

export function DynamicExperience({ initialData }: DynamicExperienceProps) {
    const [data, setData] = React.useState({
        ...initialData
    })
    const [updated, setUpdated] = React.useState(false)

    const handleChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const form = event.target
        const field = form.name
        const value = form.value
        const expId = form.id
    }

    const onUpdate = async (formData: FormData) => {
        const res = await updateExperience(formData)
        if (res.success) {
            setUpdated(true)
        }
    }

    return (
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Experience</CardTitle>
            </CardHeader>
            <CardContent>
                <InlineEditableExperience experience={data} />

                <InlineEditableExperience
                    expId={data.id}
                    field={'jobTitle'}
                    content={data.jobTitle}
                    onChange={(event) => handleChange(event)}
                />
                <InlineEditableExperience
                    expId={data.id}
                    field={'location'}
                    content={data.location}
                    onChange={(event) => handleChange(event)}
                />

                <InlineEditableExperience
                    expId={data.id}
                    field={'startDate'}
                    content={formatDate(data.startDate)}
                    onChange={(event) => handleChange(event)}
                />
                <InlineEditableExperience
                    expId={data.id}
                    field={'endDate'}
                    content={formatDate(data.endDate)}
                    onChange={(event) => handleChange(event)}
                />
            </CardContent>
        </Card>
    )
}
