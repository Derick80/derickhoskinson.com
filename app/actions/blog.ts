import { MdxCompiled } from '@/lib/types'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { cache } from 'react'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from './mdx-config'
import rehypeShiki from '@shikijs/rehype'
import * as fs from 'fs/promises'
import readingTime from 'reading-time'

const POSTS_FOLDER = path.join(process.cwd(), 'app/blog/content')

export const getPostBySlug = async (slug: string) => {
    const filePath = path.join(POSTS_FOLDER, `${slug}`)
    const source = await fs.readFile(filePath, 'utf8')
    if (!source) {
        throw new Error('No file found')
    }
    const { frontmatter } = await compileMDX<MdxCompiled>({
        source: source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug]
            }
        },
        components: mdxComponents.components
    })

    if (!frontmatter) {
        throw new Error('No frontmatter found')
    }

    frontmatter.slug = slug
    frontmatter.readingTime = readingTime(source).text
    frontmatter.wordCount = source.split(/\s+/g).length
    frontmatter.content = source
    return {
        frontmatter
    }
}

export const getPostsMetaData = cache(async () => {
    const files = await fs.readdir(POSTS_FOLDER)
    if (!files) {
        throw new Error('No files found')
    }
    const posts = []
    for (const fileName of files) {
        const { frontmatter } = await getPostBySlug(fileName)
        posts.push({ ...frontmatter })
    }
    if (!posts) {
        throw new Error('No posts found')
    }

    return posts
})

export const getOnePost = async (slug: string) => {
    const filePath = path.join(POSTS_FOLDER, `${slug}`)

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
                        rehypeShiki,
                        {
                            theme: 'nord',
                            langs: [
                                'typescript',
                                'javascript',
                                'html',
                                'css',
                                'mdx'
                            ]
                        }
                    ],
                    rehypeSlug
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
