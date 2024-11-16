import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { MDXPre, Paragraph } from '@/components/mdx/sync-functions'

import { ImageProps } from 'next/image'
import { ComponentPropsWithoutRef, Suspense } from 'react'
import CldImage from '@/components/shared/client-cloudinary'
import { cn } from '@/lib/utils'
import { Table } from '@/components/ui/table'


export default function CodeBlock ({
    children
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    children: any
    className: string
}) {
    const { className } = children

    const language = 'typescript'
    return (
        <code
            className={ cn(
                `language-${language} text-xs leading-tight md:text-base`,
                className
            ) }
        >
            { children }
        </code>
    )
}
export const mdxComponents = {
    components: {
        p: Paragraph,
        table: Table,
        code: CodeBlock,
        pre: ({
            className,
            ...props
        }: {
            className?: string
        } & ComponentPropsWithoutRef<'pre'>) => {

            return (
                <pre
                    className={
                        cn(
                            'mb-4 mt-2 overflow-x-auto rounded-lg',
                            className
                        )
                    }
                    { ...props }
                />
            )
        }
        ,

        img: ({ src, alt, ...rest }: ImageProps) => {
            return (
                <CldImage
                    src={
                        src
                            ? src.toString()
                            : 'assets/images/placeholder-user.png'
                    }
                    alt={ alt }
                    width={ 500 }
                    height={ 500 }
                    { ...rest }
                />
            )
        }
    }
}
