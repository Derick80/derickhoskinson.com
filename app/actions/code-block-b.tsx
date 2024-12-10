import React from 'react'
import { codeToHtml } from 'shiki'

export default async function CodeBlock({
    props
}: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    props: any
}) {
    const out = await codeToHtml(props.children.props.children, {
        lang: 'ts',
        theme: 'nord'
    })
    const wonder = props.children.props.children
    const codeString = React.Children.toArray(wonder)[0]?.toString() || ''
    const lineCount = codeString.split('\n').length
    console.log(lineCount)
    const classNames = props.children.props.className.split('-')[1]
    const language = classNames.split(' ')[0]

    return (
        <div
            className={`language-${language}text-xs leading-tight md:text-base`}
            dangerouslySetInnerHTML={{ __html: out }}
        />
    )
}
