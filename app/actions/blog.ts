import { MdxCompiled } from '@/lib/types'
import rehypeShiki from '@shikijs/rehype'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import { cache } from 'react'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { mdxComponents } from './mdx-config'
import * as fs from 'fs/promises'
import readingTime from 'reading-time'

const POSTS_FOLTER = path.join(process.cwd(), 'app/blog/content')

export const getPostBySlug = cache(async (slug: string) => {
    const filePath = path.join(POSTS_FOLTER, `${slug}`)
    const source = await fs.readFile(filePath, 'utf8')
    const { content, frontmatter } = await compileMDX<MdxCompiled>({
        source: source,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [
                    [
                        rehypeShiki,
                        {
                            theme: 'aurora-x',
                            useBackground: false
                        }
                    ],
                    rehypeSlug]
            }
        },
        components: mdxComponents.components
    })

    frontmatter.slug = slug
    frontmatter.readingTime = readingTime(source).text
    frontmatter.wordCount = source.split(/\s+/g).length

    return {
        frontmatter,
        compiledSource: content
    }
})

export const getPostsMetaData = cache(async () => {
    const files = await fs.readdir(POSTS_FOLTER)

    const posts = []
    for (const fileName of files) {
        const { compiledSource, frontmatter } = await getPostBySlug(fileName)
        posts.push({ compiledSource, ...frontmatter })
    }
    return posts
})

// Uses the getPostBySlug function to get the content and meta data of a page.
export const getPageData = cache(async (slug: string) => {
    return await getPostBySlug(slug)
})


