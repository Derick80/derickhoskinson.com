import { getResumeById } from '@/app/actions/cv'
import { z } from 'zod'
import { ResumeType } from '@/lib/types/cv-resume'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { scrollToSection } from '@/lib/utils'
import ResumeStats from './resume-stats-box'
import { DynamicExperience } from './resume-form'

const resumeIdSchema = z.object({
    id: z.string({
        required_error: 'ID is required'
    })
})

export default async function ResumeRoute (props: {
    params: Promise<{
        cvId: string
    }>
}) {
    const params = await props.params
    const { id } = resumeIdSchema.parse(params)
    if (!id) {
        throw new Error('No id provided')
    }

    const resume = await getResumeById(id)
    if (!resume) {
        throw new Error('No resume found')
    }
    const { experience, education, skills, publications } = resume
    console.log(resume.experience, 'experience')


    return (
        <div className='mt-4 flex min-h-screen flex-col gap-4 items-center py-2 space-y-2'>
            <ResumeStats
                countOfExperience={ experience.length }
                countOfEducation={ education.length }
                countOfSkills={ skills.length }
                countOfPublications={ publications.length }
                countOfDuties={ experience.reduce((acc, cur) => acc + cur.duties.length, 0) }
                countOfProjects={ education.reduce((acc, cur) => acc + cur.projects.length, 0) }

            />
            <Separator />

            {
                experience.map((exp) => (
                    <DynamicExperience initialData={ exp } key={ exp.id } />
                ))
            }


        </div>
    )
}


