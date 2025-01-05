'use server'

import prisma from '@/lib/prisma'
import { unstable_cache } from 'next/cache'

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
