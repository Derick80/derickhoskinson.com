'use client'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import EvidenceButton from './update-evidence-button'
import React from 'react'
import { Input } from '@/components/ui/input'

type ExperienceType = {
    experience: {
        id: string
        company: string
        jobTitle: string
        location: string
        startDate: Date
        endDate: Date
        duties: {
            id: string
            title: string
            experienceId: string
        }[]
    }
}

const Experience = ({ experience }: ExperienceType) => {
    const [editingField, setEditingField] = React.useState({
        evidenceId: '',
        field: ''
    })

    const handleEdit = (field: string, value: string) => {
        setEditingField({
            evidenceId: experience.id,
            field
        })
    }

    return (
        <div className='flex flex-col gap-2 space-y-2'>
            <div className='flex flex-col gap-2 space-y-2'>
                <Label htmlFor='company'>Company</Label>
                <Input
                    id='company'
                    name='company'
                    value={
                        editingField.field === 'company'
                            ? ''
                            : experience.company
                    }
                    onChange={(event) => {
                        handleEdit('company', event.target.value)
                    }}
                />
            </div>
            <div className='flex flex-col gap-2 space-y-2'>
                <Label htmlFor='jobTitle'>Job Title</Label>
                <Input
                    id='jobTitle'
                    value={experience.jobTitle}
                    onChange={(event) => {
                        handleEdit('jobTitle', event.target.value)
                    }}
                />
            </div>
            <div className='flex flex-col gap-2 space-y-2'>
                <Label htmlFor='location'>Location</Label>
                <Input
                    id='location'
                    value={experience.location}
                    onChange={(event) => {
                        handleEdit('location', event.target.value)
                    }}
                />
            </div>
            <div className='flex flex-col gap-2 space-y-2'>
                <Label htmlFor='startDate'>Start Date</Label>
                <Input
                    id='startDate'
                    value={experience.startDate.toString()}
                    onChange={(event) => {
                        handleEdit('startDate', event.target.value)
                    }}
                />
            </div>
            <div className='flex flex-col gap-2 space-y-2'>
                <Label htmlFor='endDate'>End Date</Label>
                <Input
                    id='endDate'
                    value={experience.endDate.toString()}
                    onChange={(event) => {
                        handleEdit('endDate', event.target.value)
                    }}
                />
            </div>
            <div className='flex flex-col gap-2 space-y-2'>
                <Label htmlFor='duties'>Duties</Label>
            </div>
        </div>
    )
}

export default Experience
