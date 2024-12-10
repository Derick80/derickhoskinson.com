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

export type CategoryFilterType = {
    category: string
    related: string[]
    categoryCount: number
}

export const blogPostSchema = z.object({
    slug: z.string()
})
export type BlogPost = z.infer<typeof blogPostSchema>

export type AuthedUserMore = {
    id: string
    name: string | null
    email: string
    emailVerified: boolean | null
    userImages: {
        imageUrl: string
        userAvatar: boolean
    }[]
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
