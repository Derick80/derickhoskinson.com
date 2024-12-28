'use server'
import prisma from '@/lib/prisma'
import {
    commentPostSchema,
    CommentStateType,
    targetPostSchema,
    userSelectionPrisma
} from '@/lib/types'
import { CommentRetrievalType } from '@/lib/types'
import { initialCommentState } from '@/lib/types'
import { getUser, verifySession } from './auth'
import { redirect } from 'next/navigation'
import { revalidateTag } from 'next/cache'

export const getPostsComments = async ({ postId }: { postId: string }) => {
    const validatedData = targetPostSchema.safeParse({
        postId
    })
    if (!validatedData.success) {
        return {
            message: validatedData.error.flatten().fieldErrors
        }
    }

    const validatedPostId = validatedData.data.postId
    if (!validatedPostId) {
        return {
            message: 'No post ID found'
        }
    }

    const comments = await prisma.comment.findMany({
        where: {
            postId: validatedPostId
        }
    })

    if (!comments) {
        throw new Error('No comments found')
    }
    return {
        comments
    }
}

export const commentOnPost = async (
    formData: FormData,
    initialState: {
        message: string
    }
) => {
    const session = await verifySession()
    if (session?.isAuthenticated === false || !session) {
        return {
            message: 'You must be signed in to perform this action'
        }
    }

    const userId = session?.userId
    if (!userId) {
        redirect('/login')
    }

    const validData = commentPostSchema.safeParse({
        postId: formData.get('postId'),
        targetId: formData.get('targetId'),
        message: formData.get('commentMessage'),
        shield: formData.get('shield')
    })
    if (!validData.success) {
        return {
            message: validData.error.flatten().fieldErrors
        }
    }

    const { postId, targetId, message } = validData.data
    const user = await prisma.user.findFirst({
        where: {
            id: userId
        }
    })
    try {
        const created = await prisma.comment.create({
            data: {
                message,
                postId,
                author: user?.name || 'Anonymous',
                parentId: targetId === postId ? null : targetId,
                userId: userId
            }
        })

        if (!created) {
            return {
                success: false
            }
        }
        revalidateTag('comments')
        return {
            success: true
        }
    } catch (error) {
        console.error('Error creating comment:', error)
        return {
            message: 'Failed to create comment',
            error: error
        }
    }
}

export const getAllPostsSummary = async () => {
    try {
        const posts = await prisma.post.findMany({
            select: {
                id: true,
                slug: true,
                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                },
                likes: {
                    select: {
                        postId: true,
                        userId: true
                    }
                },
                comments: {
                    select: {
                        id: true,
                        message: true,
                        userId: true,
                        postId: true,
                        parentId: true,

                        children: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        userImages: {
                                            where: {
                                                userAvatar: true
                                            },
                                            select: {
                                                imageUrl: true,
                                                userAvatar: true
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                                userImages: {
                                    where: {
                                        userAvatar: true
                                    },
                                    select: {
                                        imageUrl: true,
                                        userAvatar: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })

        if (!posts) {
            return {
                message: 'Failed to retrieve posts'
            }
        }

        return {
            posts: posts.map((post) => {
                return {
                    id: post.slug,
                    slug: post.slug,
                    likes: post.likes,
                    comments: post.comments.map((comment) => {
                        return {
                            id: comment.id,
                            postId: comment.postId,
                            parentId: comment.parentId,
                            message: comment.message,
                            user: post.comments.map
                        }
                    })
                }
            })
        }
    } catch (error: unknown) {
        const err = error as Error
        console.error(
            `Error occurred while trying to retrieve posts: ${err.message}`
        )

        return {
            error: err.message
        }
    }
}

export const updateComment = async (formData: FormData, initialState: null) => {
    const session = await verifySession()
    if (session?.isAuthenticated === false || !session) {
        return {
            message: 'You must be signed in to perform this action'
        }
    }

    const validData = commentPostSchema.safeParse({
        postId: formData.get('postId'),
        targetId: formData.get('targetId'),
        userId: formData.get('userId'),
        message: formData.get('commentMessage'),
        shield: formData.get('shield')
    })
    if (!validData.success) {
        return {
            message: validData.error.flatten().fieldErrors
        }
    }
    const commentId = validData.data.targetId
    const message = validData.data.message.trim()
    const parentId =
        validData.data.postId === validData.data.targetId
            ? null
            : validData.data.targetId
    const userId = session?.userId
    if (!userId) {
        redirect('/login')
    }

    const updatedComment = await prisma.comment.upsert({
        where: {
            id: commentId
        },
        update: {
            message,
            parentId
        },
        create: {
            message,
            parentId,
            userId: userId,
            postId: validData.data.postId
        }
    })

    if (!updatedComment) {
        return {
            success: false
        }
    }

    return {
        success: true
    }
}

export const deleteComment = async (commentId: string) => {
    const session = await verifySession()
    if (session?.isAuthenticated === false || !session) {
        return {
            message: 'You must be signed in to perform this action'
        }
    }

    const deletedComment = await prisma.comment.delete({
        where: {
            id: commentId
        }
    })

    if (!deletedComment) {
        return {
            success: false
        }
    }

    return {
        success: true
    }
}

export const getComment = async (commentId: string) => {
    const comment = await prisma.comment.findUnique({
        where: {
            id: commentId
        },
        select: {
            id: true,
            message: true
        }
    })

    if (!comment) {
        return {
            success: false
        }
    }

    return {
        success: true
    }
}
