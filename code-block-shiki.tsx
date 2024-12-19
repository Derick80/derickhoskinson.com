import type { BundledLanguage } from 'shiki'
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast, codeToHtml } from 'shiki'
import { cn } from './lib/utils'

interface Props {
    children: string
    lang: BundledLanguage
}

const CodeBlock = async (props: Props) => {
    const out = await codeToHast(props.children, {
        lang: props.lang,
        theme: 'nord'
    })

    return <pre className={cn('language-' + props.lang)}></pre>
}

export default CodeBlock
