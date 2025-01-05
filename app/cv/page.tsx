import ResumeNavBar from '@/components/resume/resume-nav-bar'
import { getResume } from '../actions/cv'
import { verifySession } from '../actions/auth'

import CreateResumeButton from '@/components/resume/new-resume-button'
import ExperienceForm from '@/components/resume/experience-form'
import ResumeCard from '@/components/resume/resume-template'


export default async function ResumeRoute () {
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
            <ResumeCard
                cv={ resume


                }
            />
            <ResumeNavBar />
        </div>
    )
}
