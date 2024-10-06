import { resume_basics } from '@/lib/resources/resume'
import { Metadata } from 'next'

const generateResumeMetadata = () => {

    const { title, summary, skills } = resume_basics
    const metadata: Metadata = {
        title: title,
        description: summary,
        openGraph: {
            title: title,
            description: summary,
            type: 'profile',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: summary,
        },

        keywords: skills.map((skill) => skill.skill)
    }
    return metadata

}

export { generateResumeMetadata }