/* Mdx Blog types */
import { z } from 'zod'

export const BASE_URL = 'https://derickhoskinson.com'
export const frontMatter = z.object({
    title: z.string({
        required_error:
            'Title is required You forgot to add a title in the front matter'
    }),
    date: z.string({
        required_error:
            'Date is required You forgot to add a date in the front matter'
    }),
    author: z.string({
        required_error:
            'Author is required You forgot to add an author in the front matter'
    }),
    description: z.string({
        required_error: 'Description is required'
    }),
    imageUrl: z.string().optional(),
    published: z.boolean({
        required_error: 'Published is required'
    }),
    categories: z.array(
        z.string({
            required_error: 'At least one category should be assigned.'
        })
    )
})

export type FrontMatter = z.infer<typeof frontMatter>

export const mdxcompiled = frontMatter.extend({
    slug: z.string({
        required_error:
            'Slug is required. Something went wrong with the slug generation'
    }),
    readingTime: z.string({
        required_error:
            'Reading time is required. Something went wrong with the reading time calculation'
    }),
    wordCount: z.number({
        required_error:
            'WordCount is required. Something went wrong with the word count calculation'
    }),
    content: z.string({
        required_error:
            'Content is required. Something went wrong with the content'
    })
})

export type MdxCompiled = z.infer<typeof mdxcompiled>
export const commentPostSchema = z.object({
    message: z.string({
        required_error: 'Message is required    '
    }),
    postId: z.string({
        required_error: 'Post ID is required'
    }),
    targetId: z.string({
        required_error: 'Target ID is required'
    }),
    userId: z.string({
        required_error: 'User ID is required    '
    }),
    shield: z.string({
        required_error: 'Shield is required'
    })
})
export type CategoryFilterType = {
    category: string
    related: string[]
    categoryCount: number
}

export const blogPostSchema = z.object({
    slug: z.string({
        required_error: 'Slug is required'
    })
})

export const targetPostSchema = z.object({
    postId: z.string({
        required_error: 'Post ID is required'
    })
})

export type BlogPostSlug = z.infer<typeof blogPostSchema>
export type TargetPostId = z.infer<typeof targetPostSchema>

export type CommentRetrievalType = {
    id: string
    message: string
    author: string | null
    postId: string
    userId: string | null
    parentId: string | null
    children: CommentRetrievalType[]
    createdAt: Date
    updatedAt: Date
    user: UserInterActionType
}

export type CustomUserImageType = {
    id: string
    userId: string
    imageUrl: string | null
    cloudinaryId: string
    fileName: string
    width: number
    height: number
    userAvatar: boolean
}

export const initialCommentState = {
    shield: '',
    postId: '',
    targetId: '',
    userId: '',
    message: ''
}

export type CommentStateType = typeof initialCommentState
export type CommentFormStateType = {
    comment: CommentStateType
    setComment: React.Dispatch<React.SetStateAction<CommentStateType>>
    onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export type CommentFormProps = {
    postId: string
    targetId: string
    isAuth: boolean | undefined | null
    comments: CommentRetrievalType[] | undefined | null
    userId: string
}

export type CreateOrEditCommentFormProps = {
    postId: string
    targetId: string
    userId: string
    isAuth: boolean | undefined | null
    message: string
    setComment: (formData: FormData, prev: CommentStateType) => void
    onCommentChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export type CommentsContainerProps = {
    postId: string
    comments: CommentRetrievalType[] | undefined | null
}

export type CommentButtonProps = {
    targetId: string
    isAuth: boolean | undefined | null
    commentCount: number
}

export type CommentButtonActionType = {
    isReplying: boolean
    isEditing: boolean
}

export type UserInterActionType = {
    user: {
        id: string
        name?: string
        email: string
        userId: string
        userImages: CustomUserImageType[]
    }
}

export const userSelectionPrisma = {
    select: {
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

export const commentsSelectionType = {
    select: {
        id: true,
        message: true,
        author: true,
        userId: true,
        postId: true,
        parentId: true,
        createdAt: true,
        updatedAt: true,
        children: true,
        user: userSelectionPrisma.select
    }
}

export const selectComments = {
    select: commentsSelectionType
}

export const experienceSchema = z.discriminatedUnion('intent', [
    z.object({
        intent: z.literal('update-company'),
        company: z
            .string({
                required_error: 'Company is required'
            })
            .min(3, 'Company name must be at least 3 characters long'),
        id: z.string(),
        cvId: z.string()
    }),
    z.object({
        intent: z.literal('update-job-title'),
        jobTitle: z
            .string({
                required_error: 'Job title is required'
            })
            .min(3, 'Job title must be at least 3 characters long'),
        id: z.string(),
        cvId: z.string()
    }),
    z.object({
        intent: z.literal('update-location'),
        location: z
            .string({
                required_error: 'Location is required'
            })
            .min(3, 'Location must be at least 3 characters long'),
        id: z.string(),
        cvId: z.string()
    }),
    z.object({
        intent: z.literal('update-duty'),
        title: z.string({
            required_error: 'Title is required'
        }),
        id: z.string({
            required_error: 'Duty ID is required'
        }),
        cvId: z.string()
    })
])

export type UpdateExperienceErrorType = z.inferFlattenedErrors<
    typeof experienceSchema
>

export type updateExperienceType = z.infer<typeof experienceSchema>
