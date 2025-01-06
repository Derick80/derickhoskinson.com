import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '../ui/card'
import Link from 'next/link'
import { DownloadIcon, ExternalLinkIcon } from 'lucide-react'
import { Badge } from '../ui/badge'
import DownloadResumeButton from './resume-download'
import { ResumeType } from '@/lib/types/cv-resume'
import { formatDate } from '@/lib/utils'
import { JobSkill } from '@prisma/client'

type ResumeCardType = {
    cv: ResumeType
}
const ResumeCard = ({ cv }: ResumeCardType) => {
    // write a functrion that searches for my name in the authors. it appears as Hoskinson, D. C. or Hoskinson, D, or Hoskinson D.

    return (
        <div className='not-prose'>
            <h1>Derick Hoskinson&apos;s Curriculum Vitae</h1>
            <div className='mb-6 flex justify-between'>
                <DownloadResumeButton />
            </div>
            <div id='resume-content' className='space-y-6'>
                <HeaderSection
                    title={cv.title}
                    location={cv.location}
                    email={cv.email}
                    website={cv.website}
                />
                <SummarySection summary={cv.summary} />

                <ExperienceSection experience={cv.experience} />
                <PublicationsSection publications={cv.publications} />
                <EducationSection education={cv.education} />
                <SkillsSection skills={cv.skills} />
            </div>
        </div>
    )
}

export default ResumeCard

const HeaderSection = ({
    title,
    location,
    email,
    website
}: {
    title: string
    location: string
    email: string
    website: string
}) => (
    <header className='mb-4 text-center'>
        <h1>{title}</h1>
        <p className='text-muted-foreground'>{location}</p>
        <p className='text-muted-foreground'>{email}</p>
        <Link
            href={website}
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground'
        >
            {website}
        </Link>
    </header>
)

const SummarySection = ({ summary }: { summary: string }) => (
    <section id='summary'>
        <h2>Summary</h2>
        <p className='text-muted-foreground'>{summary}</p>
    </section>
)
// This code looks for my name from an array of possible combinations then it looks for a match in the authors string list.

const ExperienceSection = ({
    experience
}: {
    experience: ResumeType['experience']
}) => (
    <section id='experience'>
        <h2>Professional Experience</h2>
        {experience.map((job, index) => (
            <Card key={index} className='mb-4 border-none print:shadow-none'>
                <CardHeader>
                    <CardTitle>{job.company}</CardTitle>
                    <p className='text-muted-foreground'>{`${job.company} - ${job.location}`}</p>
                    <p className='text-sm text-muted-foreground'>{`${formatDate(job.startDate)} - ${formatDate(
                        job.endDate
                    )}`}</p>
                </CardHeader>
                <CardContent>
                    <ul className='list-disc pl-5'>
                        {job.duties.map((duty, dutyIndex) => (
                            <li className='text-sm' key={dutyIndex}>
                                {duty.title}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        ))}
    </section>
)

const PublicationsSection = ({
    publications
}: {
    publications: ResumeType['publications']
}) => (
    <section id='publications'>
        <h2>Publications</h2>
        {publications.map((pub, index) => (
            <Card key={index} className='mb-2 print:shadow-none'>
                <CardHeader>
                    <CardTitle className='text-lg'>{pub.title}</CardTitle>
                    <p className='text-muted-foreground'>{`${pub.journal}, ${pub.year}`}</p>
                </CardHeader>
                <CardContent>
                    <div className='flex gap-2'>
                        <Link
                            href={pub.doi}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary underline'
                        >
                            Journal Information: {pub.edition}
                        </Link>
                    </div>
                    <div className='flex justify-between gap-2'>
                        {pub.pdf && (
                            <Link
                                href={pub.pdf}
                                className='text-primary underline'
                            >
                                Download PDF <DownloadIcon />
                            </Link>
                        )}
                        <Link
                            href={pub.doi}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='text-primary underline'
                        >
                            Read <ExternalLinkIcon />
                        </Link>
                    </div>
                </CardContent>
            </Card>
        ))}
    </section>
)

const EducationSection = ({
    education
}: {
    education: ResumeType['education']
}) => (
    <section id='education'>
        <h2>Education</h2>
        {education.map((edu, index) => (
            <Card key={index} className='flex flex-col items-stretch gap-2 p-1'>
                <CardHeader>
                    <CardTitle>{edu.degree}</CardTitle>
                    <p className='text-muted-foreground'>{edu.institution}</p>
                    <p className='text-sm text-muted-foreground'>{`${formatDate(edu.startDate)} - ${formatDate(
                        edu.endDate
                    )}`}</p>
                </CardHeader>
                <CardDescription>{edu.description}</CardDescription>
                <CardContent>
                    <ul className='list-disc pl-5'>
                        {edu.projects.map((project, projIndex) => (
                            <li className='text-sm' key={projIndex}>
                                {project.title}
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        ))}
    </section>
)

type SkillObject = {
    id: string
    category: string
    skill: string[]
    cvId: string
}

type GroupedSkills = {
    [category: string]: JobSkill[]
}

const groupByCategory = (skills: ResumeType['skills']) => {
    return skills.reduce(
        (acc, skillObj) => {
            const { category } = skillObj
            if (!acc[category]) {
                acc[category] = []
            }
            acc[category].push(...skillObj.skill) // Spread the skill array to include individual skills
            return acc
        },
        {} as { [category: string]: string[] }
    )
}

const SkillsSection = ({ skills }: { skills: ResumeType['skills'] }) => {
    // group by category

    const groupedSkills = groupByCategory(skills)
    if (!groupedSkills) return null

    return (
        <section id='skills'>
            <h2>Skills</h2>
            <div className='space-y-4'>
                {Object.entries(groupedSkills).map(
                    ([category, skills], index) => (
                        <div key={index}>
                            <h3 className='text-lg font-semibold'>
                                {category}
                            </h3>
                            <div className='flex flex-wrap gap-2'>
                                {skills.map((skill, skillIndex) => (
                                    <Badge key={skillIndex} variant='secondary'>
                                        {skill}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    )
                )}
            </div>
        </section>
    )
}
const authorHighlight = (authors: string) => {
    const myNames = ['Hoskinson D', 'Hoskinson, DC.', 'Hoskinson, D']
    return (
        <span className='text-sm text-muted-foreground'>
            {authors.split('.').map((author, index) => (
                <React.Fragment key={index}>
                    {myNames.some((name) => author.includes(name)) ? (
                        <span className='font-bold text-primary'>{author}</span>
                    ) : (
                        <span>{author}</span>
                    )}
                </React.Fragment>
            ))}
        </span>
    )
}
