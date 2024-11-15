import remarkGfm from 'remark-gfm'
import rehypeSlug from 'rehype-slug'
import { MDXPre } from '@/components/mdx/sync-functions'

import { ImageProps } from 'next/image'
import { Suspense } from 'react'
import CldImage from '@/components/shared/client-cloudinary'

export const mdxComponents = {
    components: {
        pre: MDXPre,
        img: ({ src, alt, ...rest }: ImageProps) => {
            return (
                <Suspense fallback={ <p>Loading Image...</p> }>
                    <CldImage
                        src={ src
                            ? src.toString()
                            : 'assets/images/placeholder-user.png'
                        }
                        alt={ alt }
                        width={ 500 }
                        height={ 500 }
                        { ...rest }
                    />
                </Suspense>
            )
        }
    }
}

export const mdxOptions = {
    options: {
        parseFrontmatter: true,
        mdxOptions: {
            remarkPlugins: [remarkGfm],
            rehypePlugins: [
                rehypeSlug,

            ]
        }
    }
}
