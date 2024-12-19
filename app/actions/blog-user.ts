'use server'

import prisma from '@/lib/prisma'
import { getUser, verifySession } from './auth'
import { z } from 'zod'
import { reorganizeComments } from '@/lib/utils'
import { revalidatePath, revalidateTag } from 'next/cache'
import { initialCommentState } from '@/lib/types'

const targetPostSchema = z.object({
    postId: z.string({
        required_error: 'Post ID is required'
    }),
    shield: z.string().max(0)
})
export const editLike = async (prevState: { message: string }, formData: FormData) => {
    const validatedFields = targetPostSchema.safeParse({
        postId: formData.get('postId'),
        shield: formData.get('shield')
    })
    if (!validatedFields.success) {
        return {
            message: validatedFields.error?.flatten().fieldErrors
        }
    }
    const postId = validatedFields.data.postId
    if (!postId) {
        return
    }
    // get the current user
    const authCookie = await verifySession()
    if (authCookie?.isAuthenticated === false || !authCookie) {
        return {
            message: 'Not authenticated'
        }
    }
    // check if the user has already liked the post
    const like = await prisma.like.findFirst({
        where: {
            userId: authCookie?.userId,
            postId
        }
    })

    if (like) {
        // unlike the post
        await prisma.like.delete({
            where: {
                postId_userId: {
                    postId,
                    userId: authCookie.userId
                }
            },

        })
        revalidateTag('postComments')

        return {
            message: 'Unliked'
        }
    } else {
        // like the post
        await prisma.like.upsert({
            where: {
                postId_userId: {
                    postId,
                    userId: authCookie.userId
                }
            },
            create: {
                postId,
                userId: authCookie.userId
            },
            update: {}
        })
        revalidateTag('postComments')
        return {

            message: 'Commented'
        }
    }
}

export const getPostInformation = async ({ postId }: { postId: string }) => {
    console.log('postId', postId)
    const authCookie = await verifySession()

    // get the post information
    const post = await prisma.post.findUnique({
        where: {
            slug: postId
        },

        select: {
            id: true,
            slug: true,
            _count: {
                select: {
                    likes: true,
                    comments: true
                }
            },
            comments: {
                include: {
                    user: {
                        select: {
                            name: true,
                            id: true,
                            email: true
                        }
                    },
                    children: {
                        include: {
                            user: {
                                select: {
                                    name: true,
                                    id: true,
                                    email: true
                                }
                            }
                        }
                    }
                }
            },
            likes: {
                select: {
                    userId: true,
                    postId: true,
                    user: {
                        select: {
                            name: true,
                            id: true,
                            email: true
                        }
                    }
                }
            }
        }
    })
    return {
        likes: post?.likes || [],
        comments: post?.comments ? reorganizeComments(post.comments) : [],
        postId: post?.slug,
        post: post,
        isAuthenticated: authCookie?.isAuthenticated
    }
}

export const getPostsComments = async ({ postId }: { postId: string }) => {
    const comments = await prisma.comment.findMany({
        where: {
            postId
        },
        orderBy: {
            createdAt: 'desc'
        },
        select: {
            message: true,
            author: true,
            userId: true,
            postId: true,
            parentId: true,
            createdAt: true,
            updatedAt: true,
            children: true,
            id: true
        }
    })


    return {
        postId,
        comments: reorganizeComments(comments)
    }
}

const commentPostSchema = z.object({
    targetId: z.string({
        required_error: 'Post ID is required'
    }),
    postId: z.string({
        required_error: 'Post ID is required'
    }),
    shield: z.string().max(0),
    userId: z.string({
        required_error: 'User ID is required'
    }),
    message: z.string({
        required_error: 'Message is required'
    })
})


export const commentOnPost = async (
    initialState: typeof initialCommentState,
    formData: FormData) => {
    const session = await verifySession()
    if (session?.isAuthenticated === false || !session) {
        return {
            message: 'You must be signed in to perform this action'
        }
    }

    const user = await getUser()
    if (!user) {
        return {
            message: 'User not found'
        }
    }

    console.log('user Session in commentOnPost', user)
    const validatedFields = commentPostSchema.safeParse({
        targetId: formData.get('targetId'),
        postId: formData.get('postId'),
        shield: formData.get('shield'),
        message: formData.get('comment-message'),
        userId: formData.get('userId')
    })

    if (!validatedFields.success) {
        return {
            initialCommentState,
            message: validatedFields.error?.flatten().fieldErrors

        }
    }
    const data = validatedFields.data

    const comment = await prisma.comment.create({
        data: {
            message: data.message,
            postId: data.postId,
            userId: data.userId,
            parentId:
                data.targetId === data.postId ? null : data.targetId,
        }
    })
    if (!comment) {
        return {
            initialCommentState,
            message: 'Comment failed'
        }
    }
    revalidateTag('postComments')
    return {
        message: 'Commented'
    }




}
