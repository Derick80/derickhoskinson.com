'use client'

import { useState } from 'react'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { format } from 'date-fns'
import {
    ExperienceSchema,
    type ExperienceSchema as ExperienceType
} from '@/lib/types/cv-resume'
import { updateExperience } from '@/app/actions/cv'
import { Experience } from '@prisma/client'
import { useDebounce } from '@/hooks/use-debounce'
import React from 'react'
import { formatDate } from '@/lib/utils'
import FormEditField from './form-edit-field'
interface DynamicExperienceProps {
    initialData: ExperienceType
}

export function DynamicExperience({ initialData }: DynamicExperienceProps) {
    const [data, setData] = useState({
        ...initialData
    })
    const [updated, setUpdated] = useState(false)

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
                {}
                <FormEditField
                    expId={data.id}
                    field={'company'}
                    content={data.company}
                    onChange={(event) => handleChange(event)}
                />

                <FormEditField
                    expId={data.id}
                    field={'jobTitle'}
                    content={data.jobTitle}
                    onChange={(event) => handleChange(event)}
                />
                <FormEditField
                    expId={data.id}
                    field={'location'}
                    content={data.location}
                    onChange={(event) => handleChange(event)}
                />

                <FormEditField
                    expId={data.id}
                    field={'startDate'}
                    content={formatDate(data.startDate)}
                    onChange={(event) => handleChange(event)}
                />
                <FormEditField
                    expId={data.id}
                    field={'endDate'}
                    content={formatDate(data.endDate)}
                    onChange={(event) => handleChange(event)}
                />
            </CardContent>
        </Card>
    )
}
