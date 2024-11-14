import { getAllPosts } from './actions/mdx-server'
import type { Metadata } from 'next'
import { Suspense } from 'react'
import LandingAbout from '@/components/shared/landing'
import ContactForm from '../components/about/contact-form'
import PageOverLayBar from '@/components/shared/page-overlay-bar'
import { BlogCard } from '@/components/blog/blog-card'

export const metadata: Metadata = {
    title: "Dr. Hoskinson's Blog",
    description: 'A personal web app for Dr. Hoskinson',
    keywords: [
        'clinical genetics',
        'genetics phd',
        'acmg',
        'variant classification',
        'somatic',
        'germline',
        'tufts genetics phd'
    ],
    robots: {
        index: true,
        follow: true,
        nocache: true,
        googleBot: {
            index: true,
            follow: true
        }
    }
}

export default async function Home() {
    const posts = await getAllPosts()
    return (
        <>
            <section id='Introduction'>
                <h2 className='mb-10'>Welcome!</h2>
                <LandingAbout />
            </section>
            <section id='blog' className='space-y-6'>
                <h2 className='mb-10'>Welcome to my blog</h2>
                <p>
                    This blog is a collection of thoughts and ideas on clinical
                    genetics, variant classification, and other topics related
                    to my work.
                </p>

                <Suspense fallback={<p>Loading results...</p>}>
                    {posts.map(
                        (post) =>
                            post.slug && <BlogCard key={post.slug} {...post} />
                    )}
                </Suspense>
            </section>
            <section id='contact' className='space-y-6'>
                <h2 className='mb-10'>Get in Touch</h2>
                <ContactForm />
            </section>
            <PageOverLayBar sectionIds={['Introduction', 'Blog', 'Contact']} />
        </>
    )
}
