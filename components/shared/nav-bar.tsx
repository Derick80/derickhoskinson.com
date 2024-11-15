import Link from 'next/link'
import { getUser } from '@/app/actions/auth'
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

const NavigationBar = async () => {
    const userData = await getUser()

    return (
        <nav className='fixed left-0 right-0 top-0 z-50 flex items-center justify-between bg-background/80 px-4 shadow-md backdrop-blur-sm transition-transform duration-300 ease-in-out sm:px-6 lg:px-8'>
            <NavLinks />

            <NavigationPath />
            <div className='flex items-center space-x-4'>
                {userData !== null && (
                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant='ghost'
                                className='relative h-8 w-8 rounded-full'
                            >
                                <Avatar className='h-8 w-8'>
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
                                        alt={userData.name || 'User avatar'}
                                    />
                                    <AvatarFallback>
                                        {userData.name ? (
                                            userData.name
                                                .charAt(0)
                                                .toUpperCase()
                                        ) : (
                                            <User />
                                        )}
                                    </AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent avoidCollisions={true}>
                            <DropdownMenuItem>
                                <Link href='/profile'>Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem></DropdownMenuItem>
                            <DropdownMenuItem>
                                <Link href='/logout'>Logout</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}

                {!userData && <Link href='/login'>Login</Link>}
                <ToggleTheme />
            </div>
        </nav>
    )
}

export default NavigationBar
