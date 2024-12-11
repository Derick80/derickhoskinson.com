import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import NavigationBar from '@/components/shared/nav-bar'
import { Analytics } from '@vercel/analytics/react'
import { Toaster } from 'react-hot-toast'
import ErrorPage from './errors'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { TooltipProvider } from '@/components/ui/tooltip'

const lisaMono = localFont({
    src: './fonts/0-normal.woff2',
    variable: '--font-lisa-mono',
    weight: '100 900'
})

const ibmPlexMono = localFont({
    src: './fonts/IBMPlexMono-Regular.woff2',
    variable: '--front-ibm-plex-mono',
    weight: '100 900'
})

const poppinsSans = localFont({
    src: './fonts/poppins-medium-webfont.woff2',
    variable: '--font-poppins-sans',
    weight: '500'
})


export const metadata: Metadata = {
    title: "Derick Hoskinson's Personal Website",
    description:
        'A personal web app for Derick Hoskinson with a blog, curriculum vitae, and other genetic resources.'
}

export default function RootLayout ({
    children,
    error
}: Readonly<{
    children: React.ReactNode
    error?: Error
}>) {
    if (error) {
        return <ErrorPage error={ error } />
    }
    return (
        <html lang='en' suppressHydrationWarning>
            <body
                className={ `${poppinsSans.variable}  ${lisaMono.variable} ${ibmPlexMono.variable}  gap-20 antialiased` }
            >
                {/* <Analytics /> */ }
                <ThemeProvider attribute='class'>
                    <TooltipProvider>
                        <Toaster />

                        <main className='container relative mx-auto bg-background text-foreground w-full max-w-4xl space-y-6 px-4 py-2 sm:px-6 md:space-y-10 lg:px-8'>
                            <NavigationBar />
                            { children }
                        </main>
                    </TooltipProvider>
                </ThemeProvider>
            </body>
        </html >
    )
}
