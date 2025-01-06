'use server'

import prisma from '@/lib/prisma'

export const getUsersList = async () => {
    return await prisma.user.findMany({
        select: {
            name: true,
            emailVerified: true,
            createdAt: true
        }
    })
}
