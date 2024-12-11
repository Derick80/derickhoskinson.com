
import { cn } from '@/lib/utils'
import { Children, isValidElement } from "react"
import { codeToHtml, createHighlighter } from 'shiki'
import { transformerCopyButton } from '@rehype-pretty/transformers'

// It looks like using the async highlighter then the synchronous codeToHTML isnecessary for the theme to be applied. I still haven't really figutreed out the lightlighting
const options = {
    theme: {
        dark: "github-dark-dimmed",
        light: "github-light",
    },
};
export const Pre = async ({
    children,
    ...props
}: React.HtmlHTMLAttributes<HTMLPreElement>) => {
    // Extract className from the children code tag
    const codeElement = Children.toArray(children).find(
        (child) => isValidElement(child) && child.type === "code",
    ) as React.ReactElement<HTMLPreElement> | undefined

    const className = codeElement?.props?.className ?? ""
    const isCodeBlock =
        typeof className === "string" && className.startsWith("language-")

    if (isCodeBlock) {
        const lang = className.split(" ")[0]?.split("-")[1] ?? ""

        if (!lang) {
            return <code { ...props }>{ children }</code>
        }

        const html = await codeToHtml(String(codeElement?.props.children), {
            lang,
            themes: {
                dark: "vesper",
                light: "vitesse-light",
            },
        })

        return <div dangerouslySetInnerHTML={ { __html: html } } />
    }

    // If not, return the component as is
    return <pre { ...props }>{ children }</pre>
}