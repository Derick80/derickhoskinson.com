'use server'
import path from 'path'
import readingTime from 'reading-time'
import { createHighlighter } from 'shiki'
import { cn } from '@/lib/utils'
import { FrontMatter, mdxcompiled, MdxCompiled } from '@/lib/types'
import * as fs from 'node:fs/promises'
import { cache, DetailedHTMLProps, HTMLAttributes } from 'react'
import matter from 'gray-matter'
import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { ImageProps } from 'next/image'
import { CldImage } from 'next-cloudinary'
/* Parsing front matter */

const parseTheFrontmatter = (fileContent: string) => {
    // extract the front matter from the content
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/
    // look for matches in the content
    const match = frontmatterRegex.exec(fileContent)
    // trim content
    const content = fileContent.replace(frontmatterRegex, '').trim()
    if (!match) {
        throw new Error('No front matter found in the file')
    }

    // if ther eis a match return the front matter
    const frontMatterblock = match![1]
    // split the front matter into an array of lines
    const frontMatterLines = frontMatterblock.trim().split('\n')
    // create an object to store the front matter
    const posts: MdxCompiled = {
        title: '',
        date: '',
        author: '',
        description: '',
        published: false,
        categories: [],
        slug: '',
        readingTime: '',
        wordCount: 0,
        content: ''
    }
    // loop through the front matter lines
    frontMatterLines.forEach((line) => {
        // split each line into key and value
        const [key, ...valueArr] = line.split(': ')
        const value = valueArr.join(': ').trim()
        if (key === 'categories') {
            posts.categories = value
                .replace('[', '')
                .replace(']', '')
                .split(', ')
                .map((cat) => cat.trim())
        } else if (key === 'published') {
            posts.published = value === 'true'
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(posts as any)[key] = value
        }
    })
    posts.slug = posts.title.replace(/\s+/g, '-').toLowerCase() || ''

    posts.readingTime = readingTime(content).text
    posts.wordCount = content.split(/\s+/g).length
    posts.content = content

    // Validate using Zod schema
    const validatedPosts = mdxcompiled.safeParse(posts)

    if (!validatedPosts.success) {
        throw new Error('Invalid front matter format')
    }

    return {
        posts: validatedPosts.data
    }
}

// Create a code block component. Apparently you cannot export an instance

const highlighter = createHighlighter({
    themes: ['nord', 'poimandres'],
    langs: ['typescript', 'javascript', 'html', 'css']
})

const options = {
    lang: 'typescript',
    themes: {
        dark: 'nord',
        light: 'nord'
    }
}

export const CodeBlock = async ({ code }: { code: string }) => {
    const out = (await highlighter).codeToHast(code, options)
    return <div dangerouslySetInnerHTML={{ __html: out }} />
}

const POSTS_FOLDER = path.join(process.cwd(), 'app/blog/content')

// Write a function to get all front matter and content

export const getAllPosts = cache(async (): Promise<MdxCompiled[]> => {
    const files = (await fs.readdir(POSTS_FOLDER)).filter(
        (file) => path.extname(file) === '.mdx'
    )

    const posts = await Promise.all(
        files.map(async (file) => {
            const fileContent = await fs.readFile(
                path.join(POSTS_FOLDER, file),
                'utf-8'
            )
            const { posts } = parseTheFrontmatter(fileContent)
            posts.slug = file.replace(/\.mdx$/, '')
            return posts
        })
    )
    return posts
})

const POSTS_FOLTER = path.join(process.cwd(), 'app/blog/content')

export const getPostBySlug = cache(async (slug: string) => {
    const filePath = path.join(POSTS_FOLTER, `${slug}.mdx`)
    const fileContent = await fs.readFile(filePath, 'utf8')
    const content_two = await matter(fileContent)
    const { frontmatter, content } = await compileMDX<FrontMatter>({
        source: content_two.content,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: []
            }
        },
        components: {
            pre: ({
                children,
                ...props
            }: DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>) => (
                <CodeBlock code={content_two.content} {...props} />
            ),
            img: ({ src, ...props }: ImageProps) => (
                <div className={cn('relative', props.className)}>
                    <CldImage
                        src={String(src)}
                        width={250}
                        height={props.height || 250}
                        {...props}
                        alt='blog image'
                    />
                </div>
            )
        }
    })
    return {
        meta: {
            ...frontmatter,
            slug
        },
        content_two: fileContent,
        content
    }
})
export const getPostsMetaData = async () => {
    const files = await fs.readdir(POSTS_FOLTER)
    const posts = []
    for (const fileName of files) {
        const { meta } = await getPostBySlug(fileName)
        posts.push(meta)
    }
    return posts
}
export const getPageData = async (slug: string) => {
    const { meta, content_two, content } = await getPostBySlug(slug)
    return { meta, content, content_two }
}
