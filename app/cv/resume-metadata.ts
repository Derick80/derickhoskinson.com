'use server'
import { resume_basics } from '@/lib/resources/resume'
import { Metadata } from 'next'
import { getResume } from '../actions/cv'

export const generateResumeMetadata = async () => {
    const resume = await getResume()
    if (!resume) {
        const { title, summary, skills } = resume_basics
        const metadata: Metadata = {
            title: title,
            description: summary,
            openGraph: {
                title: title,
                description: summary,
                type: 'profile'
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: summary
            },

            keywords: skills.map((skill) => skill.skill)
        }
        return metadata
    }

    const {
        title,
        isPrimary,
        isCurrent,
        description,
        phoneNumber,
        email,
        website,
        location,
        summary,
        education,
        experience
    } = resume

    const educationKeywords = education.map((edu) => edu.institution)
    const educationProjects = education
        .map((edu) => edu.projects.map((project) => project.title))
        .flat()
    const experienceKeywords = experience.map((work) => work.jobTitle)
    const experienceDuties = experience
        .map((work) => work.duties.map((duty) => duty.title))
        .flat()
    const experienceJobTitles = experience.map((work) => work.jobTitle)

    const metadata: Metadata = {
        title: "Dr.Derick Hoskinson's CV",
        description: summary,
        applicationName: 'derickhoskinson.com',
        authors: [
            {
                name: 'Dr. Derick Hoskinson, PhD',
                url: 'https://derickhoskinson.com'
            }
        ],
        creator: 'Dr. Derick Hoskinson, PhD',
        openGraph: {
            title: title,
            description: summary,
            url: 'https://derickhoskinson.com/cv',
            type: 'profile'
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: summary
        },

        keywords: [
            title,
            description,
            phoneNumber,
            email,
            website,
            location,
            ...educationKeywords,
            ...experienceKeywords,
            ...experienceJobTitles
        ]
    }

    return metadata
}
