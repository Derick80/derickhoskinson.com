import { MdxCompiled } from '@/lib/types'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { SharePostButton } from './share-button'
import LikeButton from './like-button'
// inspo https://www.leohuynh.dev/
export const BlogCard = (props: MdxCompiled) => {
    const {
        title,
        date,
        author,
        description,
        wordCount,
        readingTime,
        categories,
        content,
        slug,
        imageUrl
    } = props

    return (
        <Card className='flex flex-col'>
            <CardContent className='flex-grow p-4'>
                <div className='mb-4 flex flex-wrap gap-2'>
                    {categories.map((category) => (
                        <Badge key={category} variant='secondary'>
                            {category}
                        </Badge>
                    ))}
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <div className='flex items-center space-x-2'>
                        <Avatar>
                            <AvatarImage src={imageUrl} alt={author} />
                            <AvatarFallback>NL</AvatarFallback>
                        </Avatar>
                        <div className='flex flex-col space-y-1'>
                            <p className='text-sm font-medium'>{author}</p>
                            <p className='text-xs text-muted-foreground'>
                                {date}
                            </p>
                        </div>
                    </div>
                    <div className='text-right text-xs text-muted-foreground'>
                        {wordCount} words · {readingTime}
                    </div>
                </div>
                <h2 className='mb-2 mt-2 border-none pb-0 text-2xl font-bold'>
                    {title}
                </h2>
                <p className='mb-4 line-clamp-3 text-muted-foreground'>
                    {description}
                </p>
                <Button variant='outline' size='sm' asChild className='mt-auto'>
                    <Link title={slug} href={`/blog/${slug}`} prefetch>
                        Read More
                    </Link>
                </Button>
            </CardContent>
            <CardFooter className='flex items-center justify-between border-t p-2'>
                <LikeButton postId={slug} onLike={() => console.log('like')} />
                <Button
                    variant='ghost'
                    size='sm'
                    className='flex items-center space-x-1'
                >
                    <MessageCircle className='h-5 w-5' />
                    <span>{6}</span>
                </Button>
                <Button variant='ghost' size='sm'>
                    <Bookmark
                        className={`h-5 w-5 ${1 ? 'fill-current' : ''}`}
                    />
                </Button>
                <SharePostButton id={slug} />
            </CardFooter>
        </Card>
    )
}

{
    /* <div className="mb-2 flex flex-wrap gap-2">
  { categories.map((category) => (
    <Badge key={ category } variant="secondary">
      { category }
    </Badge>
  )) }
</div> */
}
