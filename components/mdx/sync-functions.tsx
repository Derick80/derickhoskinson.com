import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
import { createHighlighter } from 'shiki'

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
                { ...rest }
                className='scrollbar-thinscrollbar-thumb-secondary scrollbar-thumb-rounded-full my- text-primsary w-full overflow-x-auto rounded-xl p-4 transition ease-in-out'
            >
                { children }
            </pre>
        </div>
    )
}
const options = {
    lang: 'typescript',
    themes: {
        dark: 'nord',
        light: 'nord'
    }
}
const highlighter = await createHighlighter({
    themes: ['nord', 'poimandres'],
    langs: ['typescript', 'javascript', 'html', 'css']
})
export const CodeBlock = async ({ code }: { code: string }) => {
    const out = (highlighter).codeToHast(code, options)
    return <div dangerouslySetInnerHTML={ { __html: out } } />
}