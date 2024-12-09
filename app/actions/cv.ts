'use server'

import prisma from '@/lib/prisma'
import { experienceSchema } from '@/lib/types'
import { revalidatePath, revalidateTag } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'

export const getResume = async () => {
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
                    duties: true
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

export const updateExperience = async (formData: FormData) => {
    const rawFormData = Object.fromEntries(formData.entries())
    const validatedFields = experienceSchema.safeParse(rawFormData)

    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors
        }
    }

    const { id, intent, cvId } = validatedFields.data

    switch (intent) {
        case 'update-company':
            const companyUpdate = await prisma.experience.update({
                where: {
                    id
                },
                data: {
                    company: validatedFields.data.company
                }
            })
            if (!companyUpdate) {
                throw new Error('Company not updated')
            }
            return {
                message: 'company updated'
            }

            break
        case 'update-job-title':
            const jobTitleUpdate = await prisma.experience.update({
                where: {
                    id
                },
                data: {
                    jobTitle: validatedFields.data.jobTitle
                }
            })
            if (!jobTitleUpdate) {
                throw new Error('Job title not updated')
            }
            return {
                message: 'job title updated'
            }
            break
        case 'update-location':
            const locationUpdate = await prisma.experience.update({
                where: {
                    id
                },
                data: {
                    location: validatedFields.data.location
                }
            })
            if (!locationUpdate) {
                throw new Error('Location not updated')
            }
            return {
                message: 'location updated'
            }
            break
        case 'update-duty':
            const dutyUpdate = await prisma.duty.update({
                where: {
                    id
                },
                data: {
                    title: validatedFields.data.title
                }
            })
            if (!dutyUpdate) {
                throw new Error('Duty not updated')
            }
            return {
                message: 'Duty updated'
            }
            break
        default:
            throw new Error('Invalid intent')
    }
}
export const updateJobTitle = async (
    prevState: unknown,
    formData: FormData
) => {}
