import { cn } from '@/lib/utils'
import { DetailedHTMLProps, HTMLAttributes } from 'react'

interface CalloutProps {
    icon?: string
    children?: React.ReactNode
    type?: 'default' | 'warning' | 'danger'
}

export const Callout = ({
    children,
    icon,
    type = 'default',
    ...props
}: CalloutProps) => {
    return (
        <div
            className={cn(
                'my-6 flex items-start rounded-md border border-l-4 p-4',
                {
                    'border-red-900 bg-red-50': type === 'danger',
                    'border-yellow-900 bg-yellow-50': type === 'warning'
                }
            )}
            {...props}
        >
            {icon && <span className='mr-4 text-2xl'> {icon} </span>}
            <div> {children} </div>
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
                {...rest}
                className='scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full my-7 w-full overflow-x-auto rounded-xl p-4 text-primary transition ease-in-out'
            >
                {children}
            </pre>
        </div>
    )
}
