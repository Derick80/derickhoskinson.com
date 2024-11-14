/* Mdx Blog types */
import { z } from 'zod'

export const frontMatterSchema = z.object({
    title: z.string(
        {
            required_error: 'Title is required You forgot to add a title in the front matter'
        }
    ),
    date: z.string(
        {
            required_error: 'Date is required You forgot to add a date in the front matter'
        }
    ),
    author: z.string(
        {
            required_error: 'Author is required You forgot to add an author in the front matter'
        }
    ),
    description: z.string(
        {
            required_error: 'Description is required'
        }
    ),
    imageUrl: z.string().optional().optional(),
    published: z.boolean(
        {
            required_error: 'Published is required'
        }
    ),
    categories: z.array(z.string(
        {
            required_error: 'At least one category should be assigned.'

        }
    )),
    slug: z.string(),
    readingTime: z.string().optional(),
    wordCount: z.number().optional(),
    content: z.string().optional()
})
export type MDXFrontMatter = z.infer<typeof frontMatterSchema>

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
