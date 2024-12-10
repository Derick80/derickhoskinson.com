import { cn } from '@/lib/utils'
import React from 'react'
import { codeToHtml } from 'shiki'

const CodeBlock = async ({ className, ...props }: React.HTMLAttributes<HTMLElement>) => {

    const out = await codeToHtml(props?.children?.props?.children, {
        lang: 'ts',
        theme: 'nord'
    })
    const wonder = props?.children?.props?.children
    const codeString = React.Children.toArray(wonder)[0]?.toString() || ''
    const lineCount = codeString.split('\n').length
    console.log(lineCount)
    const language = classNames.split(' ')[0]

    return (
        <div
            className={ cn(
                "relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm",
                className
            ) }
            dangerouslySetInnerHTML={ { __html: out } }
        />
    )
}


export default CodeBlock