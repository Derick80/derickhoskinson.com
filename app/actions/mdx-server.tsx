'use server'
import path from 'path'
import readingTime from 'reading-time'
import { createHighlighter } from 'shiki'
import { cn } from '@/lib/utils'
import { FrontMatter, frontMatter, mdxcompiled, MdxCompiled } from '@/lib/types'
import crypto from 'crypto'
import * as fs from 'node:fs/promises'
import { cache } from 'react'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki'
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
            ; (posts as
                any
            )[key] = value
        }
    })
    posts.slug = posts.title.replace(/\s+/g, "-").toLowerCase() || ''

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

export const CodeBlock = async ({ code }: { code: string }) => {
    const out = (await highlighter).codeToHast(code, {
        lang: 'typescript',
        themes: {
            dark: 'poimandres',
            light: 'nord'
        }
    })
    console.log(out)
    return toJsxRuntime(out, {
        Fragment,
        jsx,
        jsxs,
        components: {
            // your custom `pre` element
            pre: props => <pre data-custom-codeblock { ...props } />
        },
    })
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

            return posts
        })
    )
    return posts
})

function abbreviateWord (word: string): string {
    const removeSpecialChars = word.replace(/[^a-zA-Z ]/g, '')

    return removeSpecialChars.length > 5
        ? removeSpecialChars.slice(0, 3) + removeSpecialChars.length
        : removeSpecialChars

}
