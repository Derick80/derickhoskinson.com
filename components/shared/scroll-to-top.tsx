'use client'
import React from 'react'
import { Button } from '../ui/button'
import { ChevronUp } from 'lucide-react'

const ScrollToTopButton = () => {
    const [showScrollTop, setShowScrollTop] = React.useState(false)

    React.useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    return (
        <div className='right-0 flex items-center gap-2'>
            {showScrollTop && (
                <Button
                    variant='ghost'
                    size='icon'
                    onClick={scrollToTop}
                    className='ml-2'
                >
                    <ChevronUp className='h-4 w-4' />
                </Button>
            )}
        </div>
    )
}

export default ScrollToTopButton
