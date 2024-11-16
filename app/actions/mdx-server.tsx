'use server'
import { ClassAttributes, HTMLAttributes, JSX } from 'react'
/* Parsing front matter */
import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki'

// Create a code block component. Apparently you cannot export an instance

export const ShikiCodeBlock = async ({ code }: { code: string }) => {
    const out = await codeToHast(code, {
        lang: 'ts',
        themes: {
            dark: 'nord',
            light: 'nord'
        }
    })
    return toJsxRuntime(out, {
        Fragment,
        // @ts-expect-error -- untyped
        jsx,
        // @ts-expect-error -- untyped
        jsxs,
        pre: (
            props: JSX.IntrinsicAttributes &
                ClassAttributes<HTMLPreElement> &
                HTMLAttributes<HTMLPreElement>
        ) => <pre { ...props } />
    })
}


