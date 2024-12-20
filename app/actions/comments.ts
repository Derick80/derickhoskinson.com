'use server'
import prisma from '@/lib/prisma'
import {
    commentPostSchema,
    targetPostSchema,
    userSelectionPrisma
} from '@/lib/types'
import { CommentRetrievalType } from '@/lib/types'
import { initialCommentState } from '@/lib/types'

export const getPostsComments = async ({ postId }: { postId: string }) => {
    const validatedData = targetPostSchema.safeParse({
        postId
    })
    if (!validatedData.success) {
        return {
            message: validatedData.error.flatten().fieldErrors
        }
    }

    const comments = await prisma.comment.findMany({
        where: {
            postId: validatedData.data.postId
        },
        select: {
            id: true,
            message: true,
            author: true,
            postId: true,
            parentId: true,
            createdAt: true,
            updatedAt: true,
            children: true,
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
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    if (!comments) {
        throw new Error('No comments found')
    }
    return {
        comments: comments.map((comment) => {
            const { user, ...rest } = comment
            if (!user) {
                return {
                    ...rest,
                    user: initialCommentState
                }
            }
            return {
                id: comment.id,
                message: comment.message,
                author: comment.author,
                postId: comment.postId,
                parentId: comment.parentId,
                createdAt: comment.createdAt,
                updatedAt: comment.updatedAt,
                children: comment.children,
                user: comment.user
            }
        })
    }
}

export const commentOnPost = async (
    prevState: CommentRetrievalType,
    formData: FormData
) => {
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
    const username = await prisma.user.findUnique({
        where: {
            id: validData.data.userId
        },
        select: {
            name: true
        }
    })

    const comments = await prisma.comment.create({
        data: {
            message: validData.data.message,
            postId: validData.data.postId,
            userId: validData.data.userId,
            author: username?.name || 'Anonymous',
            parentId:
                validData.data.targetId === validData.data.postId
                    ? null
                    : validData.data.targetId
        },
        select: {
            id: true,
            message: true,
            author: true,
            postId: true,
            parentId: true,
            createdAt: true,
            updatedAt: true,
            children: true,
            user: userSelectionPrisma
        }
    })

    if (!comments) {
        return {
            message: 'Comment not created'
        }
    }
    // revalidateTag('comments')

    return {
        message: 'Commented'
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
                    }
                    )
                }

            })
        }

    } catch (
    error: unknown
    ) {
        const err = error as Error;
        console.error(
            `Error occurred while trying to retrieve posts: ${err.message}`

        )

        return {
            error: err.message

        }
    }
}
