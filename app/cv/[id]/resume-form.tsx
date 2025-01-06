'use client'

import { useState } from 'react'

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { format } from 'date-fns'
import { ExperienceSchema, type ExperienceSchema as ExperienceType } from '@/lib/types/cv-resume'
import { updateExperience } from '@/app/actions/cv'
import { Experience } from '@prisma/client'
interface DynamicExperienceProps {
    initialData: ExperienceType
}

export function DynamicExperience ({ initialData }: DynamicExperienceProps) {
    const [data, setData] = useState(initialData)
    const [editingField, setEditingField] = useState<keyof ExperienceType | null>(null)
    const [errors, setErrors] = useState<Partial<Record<keyof ExperienceType, string>>>({})

    const handleChange = (key: keyof ExperienceType, value: string) => {
        setData(prevData => ({
            ...prevData,
            [key]: key.includes('Date') ? new Date(value) : value
        }))
    }

    const handleSubmit = async ({ event }: { event: React.ChangeEvent<HTMLInputElement> }

    ) => {
        const { target } = event
        const { name, value } = target
        console.log('submitting', name, value)
        //   get only the data that has changed  return the id of the experience and the changed data
        await updateExperience({
            id: data.id,
            field: name,
            value
        })


    }

    const renderField = (key: keyof ExperienceType, label: string) => {
        const isEditing = editingField === key
        const value = key.includes('Date')
            ? format(new Date(data[key] as Date), 'yyyy-MM-dd')
            : data[key] as string

        return (
            <div className="mb-4">
                <Label htmlFor={ key } className="block mb-2 font-semibold">{ label }</Label>
                <div className="relative">
                    <input
                        type='hidden'
                        value={ data.id }
                    />
                    <Input
                        id={ key }
                        type={ key.includes('Date') ? 'date' : 'text' }
                        name={ key }
                        value={ value }
                        onChange={ (e) => handleChange(key, e.target.value) }
                        onBlur={
                            (e) => {
                                handleSubmit({ event: e })
                                setEditingField(null)
                            }

                        }
                        onFocus={ () => setEditingField(key) }
                        className={ `w-full p-2 border rounded ${isEditing ? 'bg-red-300' : 'bg-primary-foreground cursor-pointer'}` }
                        readOnly={ !isEditing }
                    />
                    { !isEditing && (
                        <div
                            className="absolute inset-0 flex items-center pointer-events-none"
                            onClick={ () => setEditingField(key) }
                        >

                        </div>
                    ) }
                </div>
                { errors[key] && <p className="text-red-500 text-sm mt-1">{ errors[key] }</p> }
            </div>
        )
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Experience Details</CardTitle>
            </CardHeader>
            <CardContent>
                { renderField('company', 'Company') }
                { renderField('jobTitle', 'Job Title') }
                { renderField('location', 'Location') }
                { renderField('startDate', 'Start Date') }
                { renderField('endDate', 'End Date') }
            </CardContent>
        </Card>
    )
}

