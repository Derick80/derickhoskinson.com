import Link from 'next/link'
import { getUser, logout } from '@/app/actions/auth'
import { NavLinks } from './nav-links'
import React from 'react'
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
        <nav className='px-4shadow-md sticky z-50 flex justify-between bg-background/80 backdrop-blur-sm transition-transform duration-300 ease-in-out'>
            <div className='flex w-full flex-col justify-between gap-2'>
                <div className='w-fulsl flex items-center justify-between space-x-4'>
                    <NavLinks />

                    {!userData && <Link href='/login'>Login</Link>}
                    <ToggleTheme />
                    {userData !== null && (
                        <DropdownMenu modal={false}>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant='ghost'
                                    className='pr-2rounded-full relative px-4'
                                >
                                    <Avatar>
                                        <AvatarImage
                                            className='object-cover'
                                            src={
                                                userData.userImages.length >
                                                    0 &&
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
                                    <Button variant='outline' onClick={logout}>
                                        Logout
                                    </Button>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                {/* <NavigationPath /> */}
            </div>
        </nav>
    )
}

export default NavigationBar
