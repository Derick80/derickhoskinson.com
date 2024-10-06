'use client'
import Link from 'next/link'
import { useSelectedLayoutSegments } from 'next/navigation'
import { ChevronRight, Home } from 'lucide-react'

const Breadcrumbs = () => {
    const segments = useSelectedLayoutSegments()

    return (
        <nav aria-label="Breadcrumb" className="text-muted-foreground text-sm ml-2 mb-4">
            <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                    <Link href="/" className="hover:text-gray-700 transition-colors duration-200 ease-in-out">
                        <Home className="h-4 w-4" />
                        <span className="sr-only">Home</span>
                    </Link>
                </li>
                { segments.map((segment, index) => {
                    const href = `/${segments.slice(0, index + 1).join('/')}`
                    const label = segment.charAt(0).toUpperCase() + segment.slice(1)
                    const isLast = index === segments.length - 1

                    return (
                        <li key={ href } className="flex items-center">
                            <ChevronRight className="h-4 w-4 mx-2" />
                            { isLast ? (
                                <span aria-current="page" className="text-gray-700 font-medium">
                                    { label }
                                </span>
                            ) : (
                                <Link
                                    href={ href }
                                    className="hover:text-gray-700 transition-colors duration-200 ease-in-out"
                                >
                                    { label }
                                </Link>
                            ) }
                        </li>
                    )
                }) }
            </ol>
        </nav>
    )
}

export default Breadcrumbs