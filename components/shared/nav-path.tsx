'use client'
import { usePathname } from 'next/navigation'
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from '../ui/breadcrumb'

const NavigationPath = () => {
    const pathname = usePathname()
    const segments = pathname.split('/').filter(segment => segment !== '')

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link href="/">Home</Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>
                { segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join('/')}`
                    const isLast = index === segments.length - 1

                    return (
                        <BreadcrumbItem key={ href }>
                            <BreadcrumbSeparator />
                            { isLast ? (
                                <BreadcrumbPage className="capitalize">{ segment }</BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link href={ href } className="capitalize">{ segment }</Link>
                                </BreadcrumbLink>
                            ) }
                        </BreadcrumbItem>
                    )
                }) }
            </BreadcrumbList>
        </Breadcrumb>
    )
}

export default NavigationPath
