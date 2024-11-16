import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { MDXPre } from '@/components/mdx/sync-functions'

import { ImageProps } from 'next/image'
import { ComponentPropsWithoutRef, Suspense } from 'react'
import CldImage from '@/components/shared/client-cloudinary'
import { cn } from '@/lib/utils'
export default function CodeBlock ({
    children
}: {
    children: any
    className: string
}) {
    const { className } = children

    const language = 'typescript'
    return <code className={ `language-${language} text-xs md:text-base leading-tight` }>
        { children }</code>
}
export const mdxComponents = {
    components: {
        code: CodeBlock,
        pre: ({
            className,
            ...props
        }: {
            className?: string
        } & ComponentPropsWithoutRef<'pre'>) => (
            <pre
                className={ cn('mb-4 mt-2 overflow-x-auto  rounded-lg', className) }
                { ...props }
            />
        ),
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

export const mdxOptions = {
    options: {
        parseFrontmatter: true,
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [rehypeSlug]
        }
    }
}
