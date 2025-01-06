'use server'

import prisma from '@/lib/prisma'
import { ExperienceSchema } from '@/lib/types/cv-resume'
import { revalidateTag, unstable_cache } from 'next/cache'
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
                    },
                },
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





export const getResumeById = unstable_cache(async (id: string) => {


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
                    startDate: 'desc'
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
            },
        }
    })
})

const Schema = z.discriminatedUnion('intent', [
    z.object({
        intent: z.literal('delete'),
        id: z.string()
    }),
    z.object({
        intent: z.literal('edit-company'),
        id: z.string(),
        content: z.string()
    }),
    z.object({
        intent: z.literal('edit-jobTitle'),
        id: z.string(),
        content: z.string()
    }),
]);



const UpdateSchema = z.object({
    id: z.string(),
    field: z.string(),
    value: z.string()

})

export type UpdateType = z.infer<typeof UpdateSchema>
export async function updateExperience (data: UpdateType) {
    try {
        // Validate the data
        const validatedData = UpdateSchema.safeParse(data)
        if (!validatedData.success) {
            return {
                message: validatedData.error?.flatten().fieldErrors
            }
        }

        const { id, field, value, ...rest } = validatedData.data
        if (!id) {
            throw new Error('ID is required')
        }
        // Update the experience
        const updated = prisma.experience.update({
            where: { id },
            data: {
                [field]: value

            }
        })

        console.log('Updating experience:', validatedData)
        if (!updated) {
            throw new Error('Update failed')
        }
        return { success: true, data: updated }
    } catch (error) {
        console.error('Validation error:', error)
        return { success: false, error: 'Validation failed' }
    }
}

export async function updateDuty (id: string, data: { title: string }) {
    return prisma.duty.update({
        where: { id },
        data,
    })
}

