'use server'

import prisma from '@/lib/prisma'
import { ExperienceSchema } from '@/lib/types/cv-resume'
import { Duty, Experience } from '@prisma/client'
import { revalidateTag, unstable_cache } from 'next/cache'
import toast from 'react-hot-toast'
import { z } from 'zod'

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
                    }
                }
            },
            publications: true,
            skills: true
        }
    })

    if (!resume) {
        throw new Error('Resume not found')
    }

    return resume
})

export const getResumeById = async (id: string) => {
    // get the user's resume
    return await prisma.curriculumVitae.findFirst({
        where: {
            id: id
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
                    }
                },
                orderBy: {
                    endDate: 'desc'
                }
            },
            publications: true,
            skills: true,
            _count: {
                select: {
                    experience: true,
                    education: true,
                    publications: true,
                    skills: true
                }
            }
        }
    })
}

const ExperienceFieldSchema = z.object({
    field: z.string({
        required_error: 'Field is required'
    }),
    value: z.string({
        required_error: 'Value is required'
    })
})

const ExperienceUpdateSchema = z.object({
    id: z.string({
        required_error: 'Id is required'
    }),
    content: z.string({
        required_error: 'Field is required'
    })
})
export async function updateExperience(formData: FormData) {
    const validatedData = ExperienceUpdateSchema.safeParse({
        id: formData.get('id'),
        content: formData.get('content')
    })
    if (!validatedData.success) {
        return {
            success: false,
            error: validatedData.error
        }
    }

    const { id, content } = validatedData.data

    const value = formData.get(content) as string

    if (content === 'startDate') {
        const date = new Date(value)
        const updated = prisma.experience.update({
            where: {
                id
            },
            data: {
                startDate: date
            }
        })
        if (!updated) {
            return {
                success: false,
                error: 'Failed to update experience'
            }
        }

        return {
            success: true,
            data: updated
        }
    } else {
        const updated = prisma.experience.update({
            where: {
                id
            },
            data: {
                [content]: value
            }
        })
        if (!updated) {
            return {
                success: false,
                error: 'Failed to update experience'
            }
        }

        return {
            success: true,
            data: updated
        }
    }
}
export async function updateDuty(id: string, data: Partial<Duty>) {
    await prisma.duty.update({
        where: { id },
        data
    })
}
