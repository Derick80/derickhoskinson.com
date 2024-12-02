import { Paragraph } from '@/components/mdx/sync-functions'

import { ImageProps } from 'next/image'
import CldImage from '@/components/shared/client-cloudinary'
import { Table } from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import CodeBlock from './code-block-b'

export const mdxComponents = {
    components: {
        p: Paragraph,
        table: Table,
        pre: ({
            ...props
        }) => {

            const classNames = props.children.props.className.split("-")[1];
            const language = classNames.split(" ")[0];
            return (

                <div className='relative p-6  rounded-md bg-primary-foreground/80 '>


                    <CodeBlock
                        props={ props }
                    />
                    <Button
                        variant='default'
                        size='sm'
                        className='absolute top-0 right-0  p-1'
                    >
                        { language }
                    </Button>
                </div>

            )
        },
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
    }
}
