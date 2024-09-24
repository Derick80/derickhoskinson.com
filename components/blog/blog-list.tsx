import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader } from '../ui/card';
import { Separator } from '@radix-ui/react-dropdown-menu';
import { ShareIcon, MessageCircleIcon } from 'lucide-react';
import { MDXFrontMatter } from '@/lib/types';
import { Badge } from '../ui/badge';


export const BlogList = (props: MDXFrontMatter) => {
  const {
    title,
    date,
    author,
    description,
    wordCount,
    readingTime,
    categories,
    slug,
    imageUrl
  } = props

  return (
    <Card className="max-w-4xl shadow-2xl overflow-hidden">
      <div className="md:flex">
        <div className="md:flex-1">
          <CardHeader className="p-4 pb-0">
            <Link prefetch href={ `/blog/${slug}` } className="text-lg font-semibold hover:underline">
              { title }
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              { date } • { author }
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <p className="text-muted-foreground italic">{ description }</p>
            <div className="mt-4 text-sm text-muted-foreground">
              <span>{ wordCount } words</span>
              <span className="mx-2">•</span>
              <span>{ readingTime } min read</span>
            </div>
          </CardContent>
        </div>
        <div className="md:w-1/3 md:flex md:items-center">
          {
            imageUrl ? (

              <Image
                src={ imageUrl }
                alt={ title }
                width={ 300 }
                height={ 200 }
                className="w-full h-48 md:h-full object-cover"
              />
            ) : (
              <Image
                src="/assets/images/placeholder-user.jpg"
                alt="Placeholder"
                width={ 300 }
                height={ 200 }
                className="w-full h-48 md:h-full object-cover"
              />

            )
          }
        </div>
      </div>

      <CardFooter className="p-4">
        <div className="flex flex-col gap-1 md:gap-2 w-full justify-between">
          <div className="flex flex-wrap gap-1 md:gap-2">
            { categories.map((category, index) => (
              <Badge
                variant='outline'
                key={ index }
                className="mr-2 hover:bg-accent hover:cursor-pointer">
                <Link
                  prefetch
                  href={ `/blog/category/${category}` }>
                  { category }
                </Link>
              </Badge>
            )) }
          </div>


          <Separator className="my-2" />
          <div className="flex gap-4 items-center justify-between mt-2">
            <button className="flex items-center gap-1 text-sm">
              <ShareIcon className="w-4 h-4" />
              Share
            </button>
            <button className="flex items-center gap-1 text-sm">
              <MessageCircleIcon className="w-4 h-4" />
              Comment
            </button>
          </div>
          <Separator className="my-2" />
        </div>
      </CardFooter>
    </Card>
  )
}