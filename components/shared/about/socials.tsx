import { Button } from '@/components/ui/button'
import {
    LinkedInLogoIcon,
    GitHubLogoIcon,
    TwitterLogoIcon
} from '@radix-ui/react-icons'
import { MailIcon } from 'lucide-react'
import Link from 'next/link'

// This was isolated from the original landing.tsx code. I may use this more than once but since I do not yet I will not refactor it to it's own card.

const Socials = () => {
    return (
        <div className='flex flex-col gap-4'>
            <p className='text-muted-foreground'>
                Connect with me on social media
            </p>

            <div className='flex flex-wrap gap-4'>
                {socialsArray.map((soc) => (
                    <Button
                        key={soc.social}
                        variant='outline'
                        size='icon'
                        asChild
                    >
                        <Link
                            title={soc.social}
                            href={soc.link}
                            target='_blank'
                            aria-label={`Visit ${soc.social}`}
                            referrerPolicy='no-referrer'
                        >
                            {soc.icon}
                        </Link>
                    </Button>
                ))}
            </div>
        </div>
    )
}

const socialsArray = [
    {
        social: 'LinkedIn',
        link: 'https://www.linkedin.com/in/dhoskinson/',
        icon: <LinkedInLogoIcon className='h-4 w-4' />
    },
    {
        social: 'GitHub',
        link: 'https://github.com/Derick80',
        icon: <GitHubLogoIcon className='h-4 w-4' />
    },
    {
        social: 'Twitter',
        link: 'https://www.twitter.com/GeneticsStar',
        icon: <TwitterLogoIcon className='h-4 w-4' />
    },
    {
        social: 'Email',
        link: 'mailto:derickchoskinson@gmail.com',
        icon: <MailIcon className='h-4 w-4' />
    }
]

export default Socials
