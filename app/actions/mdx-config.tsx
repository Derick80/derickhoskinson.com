import {
    CustomOl,
    CustomUl,
    Figure,
    Paragraph
    ,
} from '@/components/mdx/sync-functions'
import { ImageProps } from 'next/image'
import CldImage from '@/components/shared/client-cloudinary'
import { cn } from '@/lib/utils'
import { Children, createElement } from "react"

function slugify (str: string) {
    return str
        .toString()
        .toLowerCase()
        .trim() // Remove whitespace from both ends of a string
        .replace(/\s+/g, "-") // Replace spaces with -
        .replace(/&/g, "-and-") // Replace & with 'and'
        .replace(/[^\w\-]+/g, "") // Remove all non-word characters except for -
        .replace(/\-\-+/g, "-") // Replace multiple - with single -
}
function createHeading (level: number) {
    const HeadingComponent = ({ children }: { children: React.ReactNode }) => {
        const childrenString = Children.toArray(children).join("")
        const slug = slugify(childrenString)
        return createElement(`h${level}`, { id: slug }, [
            createElement(
                "a",
                {
                    href: `#${slug}`,
                    key: `link-${slug}`,
                    className: "anchor",
                },
                children,
            ),
        ])
    }
    HeadingComponent.displayName = `Heading${level}`
    return HeadingComponent
}

export const MdxComponents = {
    components: {
        Figure,
        p: Paragraph,
        h1: createHeading(1),
        h2: createHeading(2),
        h3: createHeading(3),
        h4: createHeading(4),
        h5: createHeading(5),
        h6: createHeading(6),
        ul: CustomUl,
        ol: CustomOl,
        table: ({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) => (
            <div className="my-6 w-full overflow-y-auto">
                <table
                    className={ cn(
                        "relative w-full overflow-hidden border-none text-sm",
                        className
                    ) }
                    { ...props }
                />
            </div>
        ),
        tr: ({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) => (
            <tr
                className={ cn("last:border-b-none m-0 border-b", className) }
                { ...props }
            />
        ),
        th: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <th
                className={ cn(
                    "px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right",
                    className
                ) }
                { ...props }
            />
        ),
        td: ({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) => (
            <td
                className={ cn(
                    "px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right",
                    className
                ) }
                { ...props }
            />
        ),
        CldImage,
        img: ({ src, alt, ...rest }: ImageProps) => {
            return (
                <CldImage
                    src={
                        src
                            ? src.toString()
                            : 'assets/images/placeholder-user.png'
                    }
                    rawTransformations={ ['f_auto'] }
                    format='webp'
                    alt={ alt }
                    width={ 500 }
                    height={ 500 }
                    { ...rest }
                />
            )
        },

    }
}
