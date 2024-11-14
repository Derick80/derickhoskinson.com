import { cn } from '@/lib/utils'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

interface CalloutProps {
    children: React.ReactNode;
}

export const Callout = ({ children }:
    { children: CalloutProps }) => {
    const iconMap = {
        note: '📝',
        tip: '💡',
        important: '🔥',
        warning: '⚠️',
        danger: '🚨'

    }

    const content = React.Children.toArray(children);
    console.log(content)
    const firstLine = content[0]?.toString().toLowerCase() || '';



    return (
        <div className={ cn('prose-callout'

        ) }>
            <div className='prose-callout-icon'>{ }</div>
            <div className='prose-callout-content border-2'>{
                content.slice(1)
            }</div>
        </div>
    )


}

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
                className='scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full my- w-full overflow-x-auto rounded-xl p-4 text-primsary transition ease-in-out'
            >
                { children }
            </pre>
        </div>
    )
}
