import {
    CustomOl,
    CustomUl,
    Figure,
    Paragraph
} from '@/components/mdx/sync-functions'
import { createHighlighter } from 'shiki'

import { ImageProps } from 'next/image'
import CldImage from '@/components/shared/client-cloudinary'
import { cn } from '@/lib/utils'
import { Children, createElement, isValidElement } from 'react'
import { codeToHtml } from 'shiki'
import {
    transformerNotationHighlight,
    transformerNotationDiff
} from '@shikijs/transformers'
function slugify(str: string) {
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/&/g, '-and-') // Replace & with 'and'
        .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
}
function createHeading(level: number) {
    const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
        const childrenString = Children.toArray(children).join('')
        const slug = slugify(childrenString)
        return createElement(`h${level}`, { id: slug }, [
            createElement(
                'a',
                {
                    href: `#${slug}`,
                    key: `link-${slug}`,
                    className: 'anchor'
                },
                children
            )
        ])
    }
    HeadingComponent.displayName = `Heading${level}`
    return HeadingComponent
}
const CodeBlock = async ({
    children,
    ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) => {
    // Extract className from the children code tag
    const codeElement = Children.toArray(children).find(
        (child) => isValidElement(child) && child.type === 'code'
    ) as React.ReactElement<HTMLPreElement> | undefined

    const className = codeElement?.props?.className ?? ''
    const isCodeBlock =
        typeof className === 'string' && className.startsWith('language-')

    if (isCodeBlock) {
        const lang = className.split(' ')[0]?.split('-')[1] ?? ''
        console.log(lang)
        if (!lang) {
            return <code {...props}>{children}</code>
        }
        const highlighter = createHighlighter({
            themes: ['nord', 'github-light'],
            langs: [
                'javascript',
                'typescript',
                'json',
                'html',
                'css',
                'bash',
                'python',
                'java',
                'csharp',
                'cpp',
                'ruby',
                'go',
                'rust',
                'swift',
                'kotlin',
                'php',
                'sql',
                'yaml',
                'markdown',
                'shell',
                'plaintext'
            ]
        })
        const html = (await highlighter).codeToHtml(
            String(codeElement?.props.children),
            {
                lang,
                themes: {
                    light: 'github-light',
                    dark: 'nord'
                },
                transformers: [
                    transformerNotationHighlight(),
                    transformerNotationDiff()
                ]
            }
        )
        return <div dangerouslySetInnerHTML={{ __html: html }} />
    }
    // If not, return the component as is
    return <pre {...props}>{children}</pre>
}

export const MdxComponents = {
    components: {
        pre: CodeBlock,
        Figure,
        p: Paragraph,
        h1: createHeading(1),
        h2: createHeading(2),
        h3: createHeading(3),
        h4: createHeading(4),
        h5: createHeading(5),
        h6: createHeading(6),
        ul: CustomUl,
        ol: CustomOl,
        table: ({
            className,
            ...props
        }: React.HTMLAttributes<HTMLTableElement>) => (
            <div className='post:mb-4 overflow-clip rounded-lg border border-gray-300 bg-white/30 dark:border-white/25 dark:bg-white/10'>
                <table
                    className='divide-y divide-gray-300 dark:divide-white/25'
                    {...props}
                />
            </div>
        ),
        tr: ({
            className,
            ...props
        }: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr
                className={cn('last:border-b-none m-0 border-b', className)}
                {...props}
            />
        ),

        th: ({
            className,
            ...props
        }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <th
                className={cn(
                    'px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right',
                    className
                )}
                {...props}
            />
        ),
        td: ({
            className,
            ...props
        }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <td
                className={cn(
                    'px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right',
                    className
                )}
                {...props}
            />
        ),
        CldImage,
        img: ({ src, alt, ...rest }: ImageProps) => {
            return (
                <CldImage
                    src={
                        src
                            ? src.toString()
                            : 'assets/images/placeholder-user.png'
                    }
                    rawTransformations={['f_auto']}
                    format='webp'
                    alt={alt}
                    width={500}
                    height={500}
                    {...rest}
                />
            )
        }
    }
}
