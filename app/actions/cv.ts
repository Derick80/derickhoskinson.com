'use server'

import prisma from '@/lib/prisma'
import { revalidatePath, revalidateTag, unstable_cache } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const dutyTextSchema = z.object({
    dutyId: z.string({
        required_error: 'Duty ID is required'
    }),
    updatedTitle: z.string({
        required_error: 'Title is required'
    })
})

export const updateDutyText = async (formData: FormData) => {
    const validatedData = dutyTextSchema.safeParse(formData)
    if (!validatedData.success) {
        return { success: false, error: validatedData.error }
    }

    const { dutyId, updatedTitle } = validatedData.data
    try {
        await prisma.duty.update({
            where: { id: dutyId },
            data: { title: updatedTitle }
        })
        revalidateTag('experience')
        return { success: true }
    } catch (error) {
        console.error('Error updating duty text:', error)
        return { success: false, error: 'Failed to update duty text' }
    }

}


export const getResume = unstable_cache(async () => {
    // get the user's resume
    const resume = await prisma.curriculumVitae.findFirst({
        where: {
            isPrimary: true
        },
        include: {
            education: {
                include: {
                    projects: true
                }
            },
            experience: {
                include: {
                    duties: {
                        orderBy: {
                            position: 'asc'
                        }
                    },
                },
            },
            skills: true
        }
    })

    if (!resume) {
        throw new Error('Resume not found')
    }

    return resume
})

export const getResumeById = async ({ id }: { id: string }) => {
    // get the user's resume
    const resume = await prisma.curriculumVitae.findUnique({
        where: {
            id
        },
        include: {
            education: {
                include: {
                    projects: true
                }
            },
            experience: {
                include: {
                    duties: true
                },
                orderBy: {
                    startDate: 'desc'
                }
            },
            skills: true
        }
    })

    if (!resume) {
        throw new Error('Resume not found')
    }

    return resume
}

export const createTemplateResume = async () => {
    const newResume = await prisma.curriculumVitae.create({
        data: {
            isPrimary: false,
            isCurrent: false,

            title: "Derick Hoskinson's CV",
            description: 'This is a template resume',
            phoneNumber: '555-555-5555',
            email: 'test@acme.com',
            website: 'https://derickhoskinson.com',
            location: 'Chicago, IL',
            summary: 'This is a summary of the resume'
        }
    })
    if (!newResume) {
        throw new Error('Resume not created')
    }
    return redirect(`/cv/${newResume.id}`)
}

export const getAllExperience = async () => {
    const experience = await prisma.experience.findMany({
        include: {
            duties: true
        }
    })
    return experience
}

export const updateExperience = async (
    experienceId: string,
    field: string,
    value: string
) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    try {
        const updatedExperience = await prisma.experience.update({
            where: { id: experienceId },
            data: { [field]: value }
        })
        revalidateTag('experience')
        return {
            success: true
        }
    } catch (error) {
        console.error('Error updating experience:', error)
        return { success: false, error: 'Failed to update experience' }
    }
}

export const updateJobTitle = async (
    prevState: unknown,
    formData: FormData
) => { }

export const getExperienceByCvId = async ({ cvId }: { cvId: string }) => {
    const experiences = await prisma.experience.findMany({
        where: { cvId },
        orderBy: {
            startDate: 'desc'
        }
    })
    // format the dates for display

    // Format the dates for display
    const formattedExperiences = experiences.map((exp) => ({
        ...exp,
        startDate: new Date(exp.startDate).toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric'
        }),
        endDate: exp.endDate
            ? new Date(exp.endDate).toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric'
            })
            : 'Present' // Handle ongoing experiences
    }))

    return formattedExperiences
}
