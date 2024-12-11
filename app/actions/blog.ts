'use server'
import { MdxCompiled } from '@/lib/types'
import * as fs from 'fs/promises'
import { compileMDX } from 'next-mdx-remote/rsc'
import path from 'path'
import readingTime from 'reading-time'
import rehypeSlug from 'rehype-slug'
import remarkGfm from 'remark-gfm'
import { MdxComponents } from './mdx-config'
import MDXButton from '@/components/mdx/mdx-button'
import { Options } from "rehype-pretty-code";
import { transformerNotationDiff } from '@shikijs/transformers';

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

const rehypePrettyCodeOptions: Partial<Options> = {
    theme: {
        dark: "nord",
        light: "github-light",
    },
    onVisitLine (element) {
        console.log("Visited line");
    },
    onVisitHighlightedChars (element) {
        console.log("Visited highlighted chars");
    },
    onVisitTitle (element) {
        console.log("Visited title");
    },
    onVisitCaption (element) {
        console.log("Visited caption");
    },
    onVisitHighlightedLine (node) {
        node.properties.className?.push("line--highlighted");
    },
    transformers: [
        transformerNotationDiff(),

    ]

};

const parseFrontmatter = async (rawContent: string) => {
    const { content, frontmatter } = await compileMDX<MdxCompiled>({
        source: rawContent,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [

                    [rehypeSlug]
                ],

                format: 'mdx'
            }
        },
        components: {
            ...MdxComponents.components,
            MDXButton
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
