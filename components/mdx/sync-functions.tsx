import { cn } from '@/lib/utils'
import React, { DetailedHTMLProps, HTMLAttributes } from 'react'
// import { codeToHtml } from 'shiki'
import { codeToHtml } from 'shiki/bundle/full'


export const Table = ({
    data
}: {
    data: {
        headers: string[]
        rows: string[][]
    }
}) => {
    const headers = data.headers.map((header, index) => (
        <th key={ index }>{ header }</th>
    ))
    const rows = data.rows.map((row, index) => (
        <tr key={ index }>
            { row.map((cell, cellIndex) => (
                <td key={ cellIndex }>{ cell }</td>
            )) }
        </tr>
    ))

    return (
        <table>
            <thead>
                <tr>{ headers }</tr>
            </thead>
            <tbody>{ rows }</tbody>
        </table>
    )
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


