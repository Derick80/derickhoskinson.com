'use server'
import prisma from '@/lib/prisma'
import { verifySession } from './auth'

type Likes = {
    postId: string
    userId: string
}

export const getPostLikes = async (postId: string): Promise<Likes[]> => {
    return await prisma.like.findMany({
        where: {
            postId
        },
        select: {
            postId: true,
            userId: true
        }
    })
}

export const likePost = async (postId: string) => {
    const session = await verifySession()
    if (!session) {
        throw new Error('No session')
    }
    const userId = session.userId

    if (!userId) {
        throw new Error('You must be logged in to like a post')

    }


    const userHasLiked = await prisma.like.findFirst({
        where: {
            postId,
            userId
        }
    })
    if (userHasLiked) {
        await prisma.like.delete({
            where: {
                postId_userId: {
                    postId,
                    userId
                }
            }
        })
        return false
    } else {
        await prisma.like.upsert({
            where: {
                postId_userId: {
                    postId,
                    userId
                }
            },
            update: {},
            create: {
                postId,
                userId
            }
        })
        return true
    }

}
