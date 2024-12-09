import { getResumeById } from '@/app/actions/cv'
import { z } from 'zod'

const resumeIdSchema = z.object({
    id: z.string({
        required_error: 'ID is required'
    })
})

export default async function ResumeRoute(props: {
    params: Promise<{
        id: string
    }>
}) {
    const params = await props.params
    const { id } = resumeIdSchema.parse(params)
    if (!id) {
        throw new Error('No id provided')
    }

    const resume = await getResumeById({ id })
    if (!resume) {
        throw new Error('No resume found')
    }

    // get resume sections
    const { skills, experience, education } = resume
    console.log(experience)
    return (
        <div className='mt-4 flex min-h-screen flex-col items-center py-2'>
            {/* {
                skills && (
                    <ResumeSkills skills={ skills } />
                )
            } */}

            <div className='mt-4 flex w-full flex-col gap-4 border-2 border-purple-500'>
                <h3>Experience</h3>
                <p>
                    Click on a field to edit it. Click the checkmark or press
                    enter to save. Click the x or press escape to cancel.
                </p>
            </div>
        </div>
    )
}
