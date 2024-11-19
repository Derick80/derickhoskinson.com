'use client'


import { Button } from '@/components/ui/button'
import React from 'react'

const MDXButton = ({ message, children, ...rest }: {
    children: React.ReactNode,
    message?: string
}) => {
    const [toggle, setToggle] = React.useState(false)

    return (
        <Button
            variant='default'
            onClick={ () => setToggle(!toggle) }
            { ...rest }
        >
            { toggle ? message : 'Click Me' }
        </Button>
    )
}

export default MDXButton