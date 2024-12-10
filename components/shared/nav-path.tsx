'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator
} from '../ui/breadcrumb'

const NavigationPath = () => {
    const pathname = usePathname()
    //    get the segments but remove the .mdx if it's there
    const segments = pathname
        .split('/')
        .filter((segment) => segment !== '' && !segment.includes('.mdx'))

    console.log(segments)

    return (
        <div className='ml-4 flex w-full items-start gap-2 italic'>
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link href='/' prefetch>
                                Home
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    {segments.map((segment, index) => {
                        const href = `/${segments.slice(0, index + 1).join('/')}`
                        const isLast = index === segments.length - 1

                        return (
                            <BreadcrumbItem key={href}>
                                <BreadcrumbSeparator />
                                {isLast ? (
                                    <BreadcrumbPage className='capitalize'>
                                        {segment}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link
                                            href={href}
                                            className='capitalize'
                                        >
                                            {segment}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        )
                    })}
                </BreadcrumbList>
            </Breadcrumb>
        </div>
    )
}

export default NavigationPath
