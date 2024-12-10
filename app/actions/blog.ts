'use server'
import { MdxCompiled } from '@/lib/types'
import rehypeShiki from '@shikijs/rehype'
import * as fs from 'fs/promises'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import readingTime from 'reading-time'
import rehypeHighlight from 'rehype-highlight'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'

const POSTS_FOLDER = path.join(process.cwd(), 'app/blog/content')

export const getAllPosts = async () => {
    return await getMdXData(path.join(POSTS_FOLDER))
}

export const getPostBySlug = async (slug: string) => {
    return await getAllPosts().then((posts) => {
        return posts.find((post) => post.frontmatter.slug === slug)
    })
}

const getMDXFiles = async (dir: string) => {
    return await fs.readdir(dir).then((files) => {
        return files.filter((file) => path.extname(file) === '.mdx')
    })
}

const rehypeHighLightOptions = {
    theme: {
        dark: "nord",
        light: "github-light",
    },
};

const parseFrontmatter = async (rawContent: string) => {
    const { content, frontmatter } = await compileMDX<MdxCompiled>({
        source: rawContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [
                    [
                        rehypeHighlight,
                        rehypeHighLightOptions



                    ],

                    [rehypeSlug]
                ],
                remarkPlugins: [remarkGfm]
            }
        }
    })

    frontmatter.slug = frontmatter.title
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^a-zA-Z0-9-]/g, '')
    frontmatter.readingTime = readingTime(rawContent).text
    frontmatter.wordCount = rawContent.split(/\s+/g).length
    frontmatter.content = rawContent

    return {
        content,
        frontmatter
    }
}

const readMDXFile = async (filePath: string) => {
    const rawContent = await fs.readFile(filePath, 'utf-8')

    return await parseFrontmatter(rawContent)
}

const getMdXData = async (dir: string) => {
    const mdxFiles = await getMDXFiles(dir)

    return Promise.all(
        mdxFiles.map(async (file) => {
            return await readMDXFile(path.join(dir, file))
        })
    )
}
