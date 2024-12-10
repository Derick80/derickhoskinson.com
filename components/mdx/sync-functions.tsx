import { cn } from '@/lib/utils'
// import { codeToHtml } from 'shiki'
import { codeToHtml } from 'shiki/bundle/full'
import { HTMLAttributes, HtmlHTMLAttributes, PropsWithChildren } from "react";

export const Table = (props: HtmlHTMLAttributes<HTMLTableElement>) => {
    return (
        <div className="overflow-clip rounded-lg border border-gray-300 bg-white/30 post:mb-4 dark:border-white/25 dark:bg-white/10">
            <table
                className=" divide-y divide-gray-300 dark:divide-white/25"
                { ...props }
            />
        </div>
    );
}

export function TableHeader (props: HTMLAttributes<HTMLTableSectionElement>) {
    return <thead className="bg-gray-100 dark:bg-white/10" { ...props } />;
}

export function TableHeadingCell (
    props: HtmlHTMLAttributes<HTMLTableCellElement>
) {
    return <th className="px-4 py-2 font-bold" { ...props } />;
}

export function TableBody (props: HTMLAttributes<HTMLTableSectionElement>) {
    return (
        <tbody
            className="divide-y divide-gray-300 dark:divide-white/25"
            { ...props }
        />
    );
}

export function TableRow (props: HtmlHTMLAttributes<HTMLTableRowElement>) {
    return (
        <tr className="divide-x divide-gray-300 dark:divide-white/25" { ...props } />
    );
}

export function TableCell (props: HtmlHTMLAttributes<HTMLTableCellElement>) {
    return <td className="px-4 py-2" { ...props } />;
}



/**
 * Props for the Figure component.
 */
export interface FigureProps extends PropsWithChildren {
    /**
     * The caption for the figure.
     */
    caption: string;
}

export function Figure ({ caption, children }: FigureProps) {
    return (
        <div className="flex flex-col items-center justify-center gap-y-3 post:mb-4">
            { children }
            <figcaption className="w-full grow text-center text-sm text-gray-600 dark:text-white/60">
                { caption }
            </figcaption>
        </div>
    );
}
interface CustomListProps {
    children: React.ReactNode
}
// not usimng these yet.
export const CustomUl: React.FC<CustomListProps> = ({ children }) => {
    return <ul className='list-inside list-disc pl-4'>{ children }</ul>
}

export const CustomOl: React.FC<CustomListProps> = ({ children }) => {
    return <ol className='list-inside list-decimal pl-4'>{ children }</ol>
}

export const CustomLi = (props: { children: React.ReactNode }) => {
    return <li className='text-base leading-7'>{ props.children }</li>
}

export const Paragraph = (props: { children?: React.ReactNode }) => {
    if (typeof props.children !== 'string' && props.children === 'img') {
        return <>{ props.children }</>
    }

    return <p className='leading-7 [&:not(:first-child)]:mt-6' { ...props } />
}
