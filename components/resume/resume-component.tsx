import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle
} from '../ui/card'

import { Label } from '../ui/label'
import { Button } from '../ui/button'
import Link from 'next/link'
import { DownloadIcon, ExternalLinkIcon } from 'lucide-react'
export type Skill = {
    skill: string
}
export type Education = {
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    duties: {
        description: string
    }[]
}
export type Publication = {
    title: string
    authors: string
    journal: string
    year: string
    edition: string
    type: string
    url: string
    pdf: string | null
}

export type ProfessionalExperience = {
    title: string
    company: string
    location: string
    startDate: string
    endDate: string
    duties: {
        description: string
    }[]
}
export type CV = {
    cv: {
        title: string
        phoneNumber: number
        email: string
        website: string
        location: string
        summary: string
        experience: ProfessionalExperience[]
        publications: Publication[]
        education: Education[]
        skills: Skill[]
    }
}

const ResumeCard = ({ cv }: CV) => {
    return (
        <div className='flex flex-col justify-center gap-5 font-Montserrat'>
            <div className='flex flex-col gap-1 md:gap-2'>
                <h1>{ cv.title }</h1>

                <p>{ cv.summary }</p>
            </div>

            { cv.experience.map((job, index) => (
                <Card
                    key={ index }
                    className='flex flex-col items-stretch gap-2 rounded-md border-2 p-1'
                >
                    <CardHeader className='ml-0 mr-0 p-0'>
                        <CardTitle>{ job.company }</CardTitle>
                    </CardHeader>
                    <CardDescription className=' flex items-center justify-between ont-Montserrat italic font-bold'>
                        { job.title }
                        { job.startDate } - { job.endDate }
                    </CardDescription>
                    <CardContent>
                        <ul className='flex flex-col gap-2 list-disc '>
                            { job.duties.map((duty, index) => (
                                <li
                                    className='list-disc prose prose-neutral dark:prose-invert'
                                    key={ index }
                                >
                                    { duty.description }
                                </li>
                            )) }
                        </ul>
                    </CardContent>
                </Card>
            )) }

            <h2>Publications</h2>

            { cv.publications.map((pub, index) => (
                <Card
                    key={ index }
                    className='flex flex-col items-stretch gap-2 rounded-md border-2 p-1'
                >
                    <CardHeader className='ml-0 mr-0 p-0'>
                        <CardTitle>{ pub.title }</CardTitle>
                    </CardHeader>
                    <CardDescription className=' flex items-center justify-between ont-Montserrat italic font-bold'>
                        { pub.journal }

                        { pub.year }
                    </CardDescription>
                    <CardContent className='pl-1 pb-2'>
                        <ul className='flex flex-col gap-2'>
                            <Label>Authors:</Label>

                            <li className='prose prose-neutral dark:prose-invert space-y-2 italic'>
                                <p>{ pub.authors }</p>
                            </li>
                        </ul>
                        <Label className='pl-0'>Article Information:</Label>{ ' ' }
                        <div className='flex flex-row flex-wrap gap-2'>
                            <p>{ pub.journal }</p>
                            <p>{ pub.year }:</p>
                            <p>{ pub.edition }</p>
                            <p>{ pub.type }</p>
                        </div>
                    </CardContent>
                    <CardFooter className='justify-end'>
                        { pub.pdf && (
                            <Button name='downloadPDF' variant='outline' size='sm' asChild>
                                <Link
                                    href={ pub.pdf }
                                    prefetch={ true }
                                    className='text-primary underline'
                                >
                                    Download PDF <DownloadIcon />
                                </Link>
                            </Button>
                        ) }
                        <Button
                            name='readAtJournalSite'
                            variant='outline'
                            size='sm'
                            asChild
                        >
                            <Link
                                href={ pub.url }
                                prefetch={ true }
                                className='text-primary underline'
                            >
                                Read at Journal Web Site <ExternalLinkIcon />
                            </Link>
                        </Button>
                    </CardFooter>
                </Card>
            )) }

            <h2>Education</h2>

            { cv.education.map((edu, index) => (
                <Card
                    key={ index }
                    className='flex flex-col items-stretch gap-2 rounded-md border-2 p-1'
                >
                    <CardHeader className='ml-0 mr-0 p-0'>
                        <CardTitle>{ edu.degree }</CardTitle>
                    </CardHeader>
                    <CardDescription className='flex items-center justify-between'>
                        { edu.degree }
                        { edu.startDate } - { edu.endDate }
                    </CardDescription>
                    <CardContent>
                        <ul className='flex flex-col gap-2 list-disc '>
                            { edu.duties.map((duty, index) => (
                                <li
                                    className='list-disc prose prose-neutral dark:prose-invert'
                                    key={ index }
                                >
                                    { duty.description }
                                </li>
                            )) }
                        </ul>
                    </CardContent>
                </Card>
            )) }

            <div className='flex flex-col'></div>
            <div className='flex flex-col items-stretch gap-1 md:gap-2 rounded-md p-1'>
                <div className='flex flex-col justify-between gap-2 text-xs'>
                    <h2>Skills</h2>

                    <ul className='flex list-none flex-row flex-wrap gap-2'>
                        { cv.skills.map((skill, index) => (
                            <li
                                className='t-rounded-md list-none border-2 p-1 text-xs '
                                key={ index }
                            >
                                <span className='text-xs leading-5 '>{ skill.skill }</span>
                            </li>
                        )) }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default ResumeCard
