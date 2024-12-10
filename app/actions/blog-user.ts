'use server'

import prisma from '@/lib/prisma'
import { verifySession } from './auth'

export const likePost = async (postId: string) => {
    // get the current user
    const authCookie = await verifySession()
    if (!authCookie) {
        return null
    }
    const userId = authCookie.userId
    if (!userId) {
        return null
    }

    // determine if the user has already liked the post and if so remove the like otherwise add the like
    const userLike = await prisma.like.findFirst({
        where: {
            postId,
            userId
        }
    })

    if (userLike) {
        await prisma.like.delete({
            where: {
                postId_userId: userLike
            }
        })
    } else {
        await prisma.like.create({
            data: {
                postId,
                userId
            }
        })
    }
}
