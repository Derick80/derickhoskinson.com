'use client'
import { useRef } from 'react'
import {
    CopyIcon,
    DiscordLogoIcon,
    InstagramLogoIcon,
    Share1Icon,
    TwitterLogoIcon
} from '@radix-ui/react-icons'
import toast from 'react-hot-toast'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { Input } from '../ui/input'



type Props = {
    id: string
}

export function SharePostButton ({ id }: Props) {
    const postUrl = `https://derickhoskinson.com/blog/${id}`
    const encodedPostUrl = encodeURIComponent(postUrl)

    const ref = useRef<HTMLInputElement | null>(null)

    const copyLink = () => {
        ref.current?.select()
        ref.current?.setSelectionRange(0, 99999)
        navigator.clipboard.writeText(postUrl)
        toast('📝 Copied to Clipboard', {
            style: {
                background: 'green'
            }
        })
    }
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button type='button' variant='ghost' size='default'
                    className='flex items-center space-x-1'
                >
                    <Share1Icon className='text-primary md:size-6 size-4' />
                    <p>Share</p>
                </Button>
            </PopoverTrigger>
            <PopoverContent align='end' className='w-[250px] md:w-[520px]'>
                <div className='flex flex-col space-y-2 text-center sm:text-left'>
                    <h3>Share This Post</h3>
                    <div className='flex flex-row items-center justify-around'>
                        <Button type='button' variant='default' size='sm' asChild>
                            <a
                                href={ `https://www.instagram.com/sharer/sharer.php?u=${encodedPostUrl}` }
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <InstagramLogoIcon />
                            </a>
                        </Button>
                        <Button type='button' variant='default' size='sm' asChild>
                            <a
                                href={ `http://twitter.com/share?url=${encodedPostUrl}` }
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <TwitterLogoIcon />
                            </a>
                        </Button>
                        <Button type='button' variant='default' size='sm' asChild>
                            <a
                                href={ `https://discord.me/share/url?url=${encodedPostUrl}` }
                                target='_blank'
                                rel='noopener noreferrer'
                            >
                                <DiscordLogoIcon />
                            </a>
                        </Button>
                    </div>
                </div>
                <div className='flex items-center pt-4'>
                    <div className='grid flex-1 gap-2'>
                        <Label htmlFor='link' className='sr-only'>
                            Link
                        </Label>
                        <Input
                            id='link'
                            defaultValue={ postUrl }
                            readOnly
                            className='h-9 text-ellipsis'
                        />
                    </div>
                    <Button onClick={ copyLink } type='submit' size='sm'>
                        <span className='sr-only'>Copy</span>
                        <CopyIcon className='h-4 w-4' />
                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}
