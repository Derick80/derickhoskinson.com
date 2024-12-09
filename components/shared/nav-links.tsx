'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent
} from '../ui/dropdown-menu'
import { Button } from '../ui/button'
import React from 'react'
import { Menu, X } from 'lucide-react'

// Extracted from NavigationBar component becuase I wanted to get the user data from the server but needed to use the hook usePathname.
const NavLinks = () => {
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    const toggleMenu = () => setIsOpen(!isOpen)

    return (
        <>
            <div className='hidden md:block'>
                <div className='flex w-full items-stretch justify-between'>
                    {navData.map((item, index) => (
                        <Link
                            key={index}
                            href={item.url}
                            prefetch
                            className={`rounded-md px-3 py-2 text-lg font-semibold hover:text-primary ${
                                pathname === item.url
                                    ? 'font-medium text-primary underline'
                                    : ''
                            }`}
                        >
                            {item.title}
                        </Link>
                    ))}
                </div>
            </div>
            <div className='md:hidden'>
                <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' onClick={toggleMenu}>
                            {isOpen ? (
                                <X
                                    className='block h-6 w-6'
                                    aria-hidden='true'
                                />
                            ) : (
                                <Menu
                                    className='block h-6 w-6'
                                    aria-hidden='true'
                                />
                            )}
                            <span className='sr-only'>Toggle menu</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='w-56'>
                        {navData.map((item, index) => (
                            <DropdownMenuItem key={index} asChild>
                                <Link
                                    href={item.url}
                                    prefetch
                                    className={`w-full px-3 py-2 text-lg ${
                                        pathname === item.url
                                            ? 'font-medium text-primary underline'
                                            : ''
                                    }`}
                                >
                                    {item.title}
                                </Link>
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </>
    )
}

const navData = [
    {
        title: 'Home',
        url: '/'
    },
    {
        title: 'Blog',
        url: '/blog'
    },
    {
        title: 'Projects',
        url: '/projects'
    },
    {
        title: 'CV',
        url: '/cv'
    },
    {
        title: 'About',
        url: '/about'
    },
    {
        title: 'Genetics',
        url: '/genetics'
    },
    {
        title: 'Community',
        url: '/community'
    }
]

export { NavLinks }
