'use client'
import React from 'react'
import Link from 'next/link'
import {
    Briefcase,
    GraduationCap,
    Code2,
    MailIcon,
    ExternalLinkIcon
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CldImage } from 'next-cloudinary'
import { aboutMeDetails } from '../../about/about'
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
    CardDescription
} from '../../ui/card'
import {
    LinkedInLogoIcon,
    GitHubLogoIcon,
    TwitterLogoIcon
} from '@radix-ui/react-icons'

const TestLanding = () => {
    return (
        <section id='Introduction'>
            <Card className=''>
                <CardHeader>
                    <CardTitle>{aboutMeDetails.fullname}</CardTitle>{' '}
                </CardHeader>
                <CardContent className='flex flex-col gap-2 md:gap-4'>
                    <div className='space-y-2'>
                        <p className='font-semibold'>🎉 Nice To Meet You!</p>
                        <p className='text-muted-foreground'>
                            Hey, I&apos;m Derick. This space is for me to
                            experiment with web development, showcase my
                            curriculum vitae, develop fun genetic tools and
                            occasionally report my musings.
                        </p>
                    </div>
                    <div className='mb-6 flex flex-col justify-between gap-2 md:flex-row'>
                        <div className='f flex flex-col gap-4'>
                            <div className='rounded-lg border bg-card p-4'>
                                <p className='font-semibold'>
                                    🧬 Current Interests
                                </p>
                                <p className='text-muted-foreground'>
                                    Exploring the intersection of clinical
                                    genetics and web technology.
                                </p>
                            </div>

                            <div className='space-y-2 rounded-lg border bg-card p-4'>
                                <p className='font-semibold'>🙋‍♂️ About</p>
                                <p className='text-muted-foreground'>
                                    Are you interested in learning more about my
                                    background, experience, and interests?
                                </p>

                                <Button
                                    variant='outline'
                                    size='sm'
                                    className=''
                                    asChild
                                >
                                    <Link href='/about'>
                                        Read More About Me
                                        <ExternalLinkIcon className='h-4 w-4' />
                                    </Link>
                                </Button>
                            </div>
                            {/* <div className="rounded-lg border bg-card p-4">
                                <p className="font-semibold">💻 Web Apps</p>
                                <p className="text-muted-foreground">
                                    Building with Next.js, TypeScript, and Prisma. Passionate about creating intuitive user interfaces and robust backend systems.
                                </p>
                            </div> */}
                        </div>

                        <div className='hidden items-center md:flex md:flex-col'>
                            <div className='relative h-[400px] w-[400px] overflow-hidden rounded-lg shadow-lg'>
                                <CldImage
                                    src={aboutMeDetails.imageUrl}
                                    alt={`Photo of ${aboutMeDetails.fullname}`}
                                    priority
                                    fill
                                    sizes='(max-width: 768px) 100vw, 400px'
                                    className='object-cover transition-transform duration-300 hover:scale-105'
                                />
                            </div>
                        </div>
                    </div>
                    <div className='mb-6 flex flex-wrap gap-4'>
                        <div className='flex items-center space-x-2'>
                            <Briefcase className='h-4 w-4 text-muted-foreground' />
                            <span>10+ Years in Clinical Science</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <GraduationCap className='h-4 w-4 text-muted-foreground' />
                            <span>PhD in Genetics</span>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <Briefcase className='h-4 w-4 text-muted-foreground' />
                            <span>Senior Clinical Scientist</span>
                        </div>

                        <div className='flex items-center space-x-2'>
                            <Code2 className='h-4 w-4 text-muted-foreground' />
                            <span>Full Stack Developer</span>
                        </div>
                    </div>

                    <div className='mb-6 rounded-lg border bg-card p-4'>
                        <h4 className='font-semibold'>🔬 Featured Project</h4>
                        <p className='mb-2 text-muted-foreground'>
                            Check out my latest genetic analysis tool - I am
                            building a variant classification calculator based
                            on ACMG guidelines and more.
                        </p>
                        <Button variant='outline' size='sm' asChild>
                            <Link href='/genetics'>
                                Explore Variant Calculator
                            </Link>
                        </Button>
                    </div>
                </CardContent>
                <CardFooter>
                    <div className='flex flex-col gap-4'>
                        <p className='italic text-muted-foreground'>
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
                </CardFooter>
            </Card>
        </section>
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

export default TestLanding
