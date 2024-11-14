'use server'
import path from 'path'
import readingTime from 'reading-time'
import { createHighlighter } from 'shiki'
import { cn } from '@/lib/utils'
import { frontMatterSchema, MDXFrontMatter } from '@/lib/types'
import crypto from 'crypto';
import * as fs from 'node:fs/promises';
import { cache } from 'react'



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
    const metadata: Partial<MDXFrontMatter> = {}
    // loop through the front matter lines
    frontMatterLines.forEach((line) => {
        // split each line into key and value
        const [key, ...valueArr] = line.split(': ')
        const value = valueArr.join(': ').trim()
        if (key === 'categories') {
            metadata.categories = value
                .replace('[', '')
                .replace(']', '')
                .split(', ')
                .map((cat) => cat.trim())
        } else if (key === 'published') {
            metadata.published = value === 'true'
        } else {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ; (metadata as any)[key] = value
        }
    })

    metadata.slug = generateSlug(metadata.title || '')
    metadata.readingTime = readingTime(content).text
    metadata.wordCount = content.split(/\s+/g).length
    metadata.content = content

    // Validate using Zod schema
    const parsedFrontMatter = frontMatterSchema.safeParse(metadata)

    if (!parsedFrontMatter.success) {
        throw new Error('Invalid front matter format')
    }

    return {
        metadata: parsedFrontMatter.data
    }
}

// Create a code block component

const highlighter = createHighlighter({
    themes: ['nord'],
    langs: ['typescript']
})

export const CodeBlock = async ({ code }: { code: string }) => {
    const out = (await highlighter).codeToHtml(code, {
        lang: 'typescript',
        theme: 'nord'
    })

    return <div dangerouslySetInnerHTML={ { __html: out } } />
}

const POSTS_FOLDER = path.join(process.cwd(), 'app/blog/content')

// Write a function to get all front matter and content

export const getAllPosts = cache(async (): Promise<MDXFrontMatter[]> => {
    const files = (await fs.readdir(POSTS_FOLDER)).filter((file) => path.extname(file) === '.mdx')

    const metadata = await Promise.all(
        files.map(async (file) => {
            const fileContent = await fs.readFile(path.join(POSTS_FOLDER, file), 'utf-8')
            const { metadata } = parseTheFrontmatter(fileContent)


            return metadata

        }
        )
    )
    return metadata
}

)






function abbreviateWord (word: string): string {
    return word.length > 5 ? word.slice(0, 3) + word.length : word;
}

function generateSlug (title: string): string {
    const hash = crypto.createHash('md5').update(title).digest('hex').slice(0, 6);
    const shortTitle = title
        .split(' ')
        .map(abbreviateWord)
        .join('-')
        .toLowerCase();
    return `${shortTitle}-${hash}`;
}
