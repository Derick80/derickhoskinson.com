import {
    Figure,
    Paragraph, Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeadingCell,
    TableRow,
} from '@/components/mdx/sync-functions'

import { ImageProps } from 'next/image'
import CldImage from '@/components/shared/client-cloudinary'
import { Button } from '@/components/ui/button'
import CodeBlock from './code-block-b'
import { Pre } from '@/components/mdx/mdx-async'
import { JSX, HtmlHTMLAttributes, HTMLAttributes } from 'react'
import { Code } from '@/components/mdx/code-component'

export const MdxComponents = {
    components: {
        Figure,
        p: Paragraph,
        pre: (props: React.HTMLProps<HTMLPreElement>) => <Pre { ...props } />,
        // code: (props: JSX.IntrinsicElements['code']) => <Code
        //     code={ props.children as string }
        //     { ...props } />,

        CldImage,
        img: ({ src, alt, ...rest }: ImageProps) => {
            return (
                <CldImage
                    src={
                        src
                            ? src.toString()
                            : 'assets/images/placeholder-user.png'
                    }
                    rawTransformations={ ['f_auto'] }
                    format='webp'
                    alt={ alt }
                    width={ 500 }
                    height={ 500 }
                    { ...rest }
                />
            )
        },
        Button,
    }
}
