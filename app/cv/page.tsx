import ResumeCard from '@/components/resume/resume-component'
import ResumeNavBar from '@/components/resume/resume-nav-bar'
import { resume_basics } from '@/lib/resources/resume'
import { generateResumeMetadata } from './resume-metadata'
import { getResume } from '../actions/cv'
import { verifySession } from '../actions/auth'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import CreateResumeButton from '@/components/resume/new-resume-button'

export const metadata = await generateResumeMetadata()

export default async function ResumeRoute() {
    const resume = await getResume()
    if (!resume) {
        throw new Error('No resume found')
    }
    const session = await verifySession()

    const isAuthorized = session?.isAuthenticated

    return (
        <div className='mt-4 flex min-h-screen flex-col items-center py-2'>
            {!isAuthorized && <CreateResumeButton />}
            <ResumeCard cv={resume_basics} />
            <ResumeNavBar />
        </div>
    )
}
