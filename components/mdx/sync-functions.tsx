import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { createHighlighter } from 'shiki'

import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypePrettyCode from 'rehype-pretty-code'
import { transformerCopyButton } from '@rehype-pretty/transformers'
export const MDXPre = (
    MDXPreProps: DetailedHTMLProps<
        HTMLAttributes<HTMLPreElement>,
        HTMLPreElement
    >
) => {
    const { children, ...rest } = MDXPreProps

    return (
        <div className='group relative'>
            <pre
                {...rest}
                className='scrollbar-thinscrollbar-thumb-secondary scrollbar-thumb-rounded-full my- text-primsary w-full overflow-x-auto rounded-xl p-4 transition ease-in-out'
            >
                {children}
            </pre>
        </div>
    )
}
const options = {
    lang: 'typescript',
    themes: {
        dark: 'github-dark',
        light: 'github-light'
    }
}
const highlighter = await createHighlighter({
    themes: ['nord', 'poimandres'],
    langs: ['typescript', 'javascript', 'html', 'css']
})
export const CodeBlock = async ({ code }: { code: string }) => {
    const out = highlighter.codeToHast(code, options)
    return <div dangerouslySetInnerHTML={{ __html: out }} />
}

export async function Code({ code }: { code: string }) {
    const highlightedCode = await highlightCode(code)
    return (
        <section
            dangerouslySetInnerHTML={{
                __html: highlightedCode
            }}
        />
    )
}

async function highlightCode(code: string) {
    const file = await unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(rehypePrettyCode, {
            transformers: [
                transformerCopyButton({
                    visibility: 'always',
                    feedbackDuration: 3_000
                })
            ]
        })
        .use(rehypeStringify)
        .process(code)

    return String(file)
}

function Table({
    data
}: {
    data: {
        headers: string[]
        rows: string[][]
    }
}) {
    const headers = data.headers.map((header, index) => (
        <th key={index}>{header}</th>
    ))
    const rows = data.rows.map((row, index) => (
        <tr key={index}>
            {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
            ))}
        </tr>
    ))

    return (
        <table>
            <thead>
                <tr>{headers}</tr>
            </thead>
            <tbody>{rows}</tbody>
        </table>
    )
}

interface CustomListProps {
    children: React.ReactNode
}
// not usimng these yet.
export const CustomUl: React.FC<CustomListProps> = ({ children }) => {
    return <ul className='list-inside list-disc pl-4'>{children}</ul>
}

export const CustomOl: React.FC<CustomListProps> = ({ children }) => {
    return <ol className='list-inside list-decimal pl-4'>{children}</ol>
}

export const CustomLi = (props: { children: React.ReactNode }) => {
    return <li className='text-base leading-7'>{props.children}</li>
}

export const Paragraph = (props: { children?: React.ReactNode }) => {
    if (typeof props.children !== 'string' && props.children === 'img') {
        return <>{props.children}</>
    }

    return <p className='leading-7 [&:not(:first-child)]:mt-6' {...props} />
}
