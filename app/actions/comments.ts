'use server'
import prisma from '@/lib/prisma'
import { z } from 'zod'
export const commentPostSchema = z.object({
    message: z.string({
        required_error: 'Message is required
    }),
    postId: z.string({
        required_error: 'Post ID is required'
    }),
    targetId: z.string().optional(),
    userId: z.string({
        required_error: 'User ID is required
    }),
    shield: z.string({
        required_error: 'Shield is required'
    })
})
export const commentOnPost = async (state: {
    message: string,
    postId: string,
    targetId: string,
    userId: string,
    shield: string,
}, formData: FormData) => {

    const validData = commentPostSchema.safeParse(formData)
    if (!validData.success) {
        return {
            message: validData.error.flatten().fieldErrors
        }
    }
    const username = await prisma.user.findUnique({
        where: {
            id: validData.data.userId
        },
        select: {
            name: true
        }
    })

    return await
        prisma.comment.create({
            data: {
                message: validData.data.message,
                postId: validData.data.postId,
                userId: validData.data.userId,
                author: username?.name || 'Anonymous',
                parentId: validData.data.targetId ===
                    validData.data.postId ? null : validData.data.targetId
            }
        })
}
