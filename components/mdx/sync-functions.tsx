import { cn } from '@/lib/utils'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'

interface CalloutProps {
    children: string
}

export const Callout = ({ props }) => {
    const iconMap = {
        note: '📝',
        tip: '💡',
        important: '🔥',
        warning: '⚠️',
        danger: '🚨'

    }

    //  `children` array within `props`
    const childrenInProps = props.children[1].props.children;
    // Output: [ { type: 'strong', key: null, props: { children: 'Warning:' }, ... }, ' Urgent' ]

    // If you want to access the specific elements inside this array:
    const firstChildText = childrenInProps.children; // "Warning:"
    const secondChildText = childrenInProps[1].trim(); // "Urgent"

    console.log(firstChildText, 'firstchild'); // Output: "Warning:"
    console.log(secondChildText, 'second'); // Output: "Urgent"
    return (
        <div className={ cn('prose-callout'

        ) }>
            <div className='prose-callout-icon'>{ }</div>
            <div className='prose-callout-content border-2'>{
                props.children
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
