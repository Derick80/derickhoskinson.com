'use client'
import React from 'react';
import { Card, CardContent } from '../ui/card';
import { Experience } from '@/lib/types';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { Label } from '../ui/label';
type ExperienceFormProps = {
    initialExperience: Experience;
}

const ExperienceForm = (
    { initialExperience }: ExperienceFormProps

) => {
    const [experience, setExperience] = React.useState({
        ...initialExperience,
        duties: initialExperience.duties.map((duty, index) =>
            ({ ...duty })

        )
    })

    const [isPending, setIsPending] = React.useTransition()
    console.log('experience', experience)


    const handleHeaderChange = (field: keyof Experience, value: string) => {
        setExperience((prev) => ({ ...prev, [field]: value }))
    }

    const handleDutyTextUpdate = (id: string, value: string) => {
        setExperience((prev) => ({
            ...prev,
            duties: prev.duties.map((d) => d.id === id ? { ...d, title: value } : d)
        }))

    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardContent className="p-2">
                <div className="space-y-4 mb-6">
                    <Label
                        htmlFor="company"
                    >Company
                        <Input
                            value={
                                experience.company
                            }
                            onChange={ (e) => handleHeaderChange('company', e.target.value) }

                        /></Label>
                    <Label
                        htmlFor="jobTitle"
                    >Job Title</Label>

                    <Input
                        value={ experience.jobTitle }
                        onChange={ (e) => handleHeaderChange('jobTitle', e.target.value) }
                    />
                    <Label
                        htmlFor='location'>
                        Location
                    </Label>
                    <Input
                        name='location'
                        value={ experience.location }
                        onChange={ (e) => handleHeaderChange('location', e.target.value) }
                    />
                    <div className="flex gap-2 text-muted-foreground">
                        <Input
                            type="date"
                            value={ experience.startDate }
                            onChange={ (e) => handleHeaderChange('startDate', e.target.value) }
                        />
                        <span>-</span>
                        <Input
                            type="date"
                            value={ experience.endDate }
                            onChange={ (e) => handleHeaderChange('endDate', e.target.value) }
                        />
                    </div>
                </div>



                <div className="mt-4 flex items-center gap-4">
                    <Button variant="outline"
                        disabled={ isPending }>
                        Add Duty
                    </Button>
                    { isPending && <Loader2 className="h-4 w-4 animate-spin" /> }
                </div>
            </CardContent>
        </Card >
    )
}


export default ExperienceForm;