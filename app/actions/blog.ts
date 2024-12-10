import { MdxCompiled } from '@/lib/types'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { cache } from 'react'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from './mdx-config'
import rehypeShiki from '@shikijs/rehype'
import rehypeHighlight from 'rehype-highlight'
import * as fs from 'fs/promises'
import readingTime from 'reading-time'
import matter from 'gray-matter'
import * as z from 'zod'
import { unstable_cache } from 'next/cache'
import prisma from '@/lib/prisma'

const slugSchema = z.object({
    slug: z.string({
        message: 'Invalid slug'
    })
})
export const POSTS_FOLDER = path.join(process.cwd(), 'app/blog/content')



export const getPostsMetaData = cache(async () => {
    const files = await fs.readdir(POSTS_FOLDER)
    if (!files) {
        throw new Error('No files found')
    }
    const posts: MdxCompiled[] = []
    for (const fileName of files) {
        const post = await getPostBySlug(fileName.replace(/\.mdx$/, ''))
        if (post && post.frontmatter) {
            posts.push({ ...post.frontmatter })
        }
    }
    if (posts.length === 0) {
        throw new Error('No posts found')
    }

    return posts
})

export const getPostBySlug = async (slug: string) => {
    console.log(slug, 'slug getPostBySlug')
    const filePath = path.join(POSTS_FOLDER, `${slug}.mdx`)

    const postFile = await fs.readFile(filePath, 'utf8')
    if (!postFile) {
        throw new Error('No file found')
    }
    const { content, frontmatter } = await compileMDX<MdxCompiled>({
        source: postFile,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    [
                        rehypeHighlight,
                        { subset: true },
                        rehypeShiki,
                        {
                            theme: 'nord',
                            langs: [
                                'typescript',
                                'javascript',
                                'html',
                                'css',
                                'json',
                                'mdx'
                            ]
                        }
                    ],
                    [rehypeSlug]
                ]
            }
        },
        components: mdxComponents.components
    })

    frontmatter.slug = slug
    frontmatter.readingTime = readingTime(postFile).text
    frontmatter.wordCount = postFile.split(/\s+/g).length
    frontmatter.content = postFile
    return {
        frontmatter,
        compiledSource: content

    }
}

export const getPostData = unstable_cache(
    async ({ slug }: { slug: string }) => {
        const verifiedSlug = slugSchema.parse({ slug })
        if (!verifiedSlug) {
            throw new Error('No slug found')
        }
        console.log(verifiedSlug.slug, 'verifiedSlug')

        return await prisma.post.findUnique({
            where: { slug: verifiedSlug.slug },
            select: {
                id: true,
                slug: true,
                likes: {
                    select: {
                        user: {
                            select: {
                                name: true,
                                userImages: {
                                    where: {
                                        userAvatar: true
                                    }
                                }
                            }
                        },
                        postId: true
                    }
                },

                _count: {
                    select: {
                        comments: true,
                        likes: true
                    }
                }
            }
        })
    }
)
