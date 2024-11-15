import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

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
                {...rest}
                className='scrollbar-thinscrollbar-thumb-secondary scrollbar-thumb-rounded-full my- text-primsary w-full overflow-x-auto rounded-xl p-4 transition ease-in-out'
            >
                {children}
            </pre>
        </div>
    )
}
