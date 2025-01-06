import ResumeNavBar from '@/components/resume/resume-nav-bar'
import { getResume } from '../actions/cv'
import { verifySession } from '../actions/auth'
import ResumeCard from '@/components/resume/resume-card'
import Link from 'next/link'

export default async function ResumeRoute() {
    const resume = await getResume()
    if (!resume) {
        throw new Error('No resume found')
    }
    // get the experience
    const experience = resume.experience
    const session = await verifySession()

    const isAuthorized = session?.isAuthenticated
    return (
        <div className='mt-4 flex min-h-screen flex-col items-center py-2'>
            {isAuthorized && <Link href={`cv/${resume.id}`}>Edit</Link>}
            <ResumeCard cv={resume} />
            <ResumeNavBar />
        </div>
    )
}
