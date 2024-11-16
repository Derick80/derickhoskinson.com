import Link from 'next/link'
import { getUser, logout } from '@/app/actions/auth'
import { NavLinks } from './nav-links'
import React from 'react'
import NavigationPath from './nav-path'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import { User } from 'lucide-react'
import ToggleTheme from '../theme/toggle-theme'
import { N } from 'vitest/dist/chunks/reporters.anwo7Y6a.js'

const NavigationBar = async () => {
    const userData = await getUser()

    return (
        <nav className='fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background/80 px-4shadow-md backdrop-blur-sm transition-transform duration-300 ease-in-out sm:px-6 lg:px-8'>
            <div
                className='flex flex-col w-full  items-center gap-2'>


                <div
                    className='flex items-center justify-between space-x-4 w-full'>

                    <NavLinks />

                    <div className='flex items-center  w-full space-x-4'>

                    </div>

                    { !userData && <Link href='/login'>Login</Link> }
                    <ToggleTheme />
                    { userData !== null && (
                        <DropdownMenu

                            modal={ false }>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    className='relative px-4  pr-2rounded-full'
                                >
                                    <Avatar className='h-6 w-6'>
                                        <AvatarImage
                                            className='object-cover'
                                            src={
                                                userData.userImages.length > 0 &&
                                                    userData.userImages[0]
                                                        .userAvatar === true
                                                    ? userData.userImages[0]
                                                        .imageUrl
                                                    : '/assets/images/placeholder-user.jpg'
                                            }
                                            alt={ userData.name || 'User avatar' }
                                        />
                                        <AvatarFallback>
                                            { userData.name ? (
                                                userData.name
                                                    .charAt(0)
                                                    .toUpperCase()
                                            ) : (
                                                <User />
                                            ) }
                                        </AvatarFallback>
                                    </Avatar>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent avoidCollisions={ true }>
                                <DropdownMenuItem>
                                    <Link href='/profile'>Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem></DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Button
                                        variant='outline'
                                        onClick={ logout }
                                    >
                                        Logout
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) }




                </div>
                <NavigationPath />
            </div>
        </nav>
    )
}

export default NavigationBar
