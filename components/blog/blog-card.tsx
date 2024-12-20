import { MdxCompiled } from '@/lib/types'
import { Bookmark, Heart, MessageCircle } from 'lucide-react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Badge } from '../ui/badge'
import Link from 'next/link'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { SharePostButton } from './share-button'
import LikeButton from './like-button'
import BlogCardFooter from './card-footer'
import { verifySession } from '@/app/actions/auth'
// inspo https://www.leohuynh.dev/
export const BlogCard = async (props: MdxCompiled) => {
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
    const session = await verifySession()
    const isAuth = session?.isAuthenticated || false
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

            <CardFooter>
                {isAuth ? (
                    <BlogCardFooter postId={slug}>
                        <LikeButton
                            postId={slug}
                            isAuth={session?.isAuthenticated}
                        />
                        <SharePostButton id={slug} />
                    </BlogCardFooter>
                ) : (
                    <div className='flex gap-2'>
                        <LikeButton
                            postId={slug}
                            isAuth={session?.isAuthenticated}
                        />

                        <SharePostButton id={slug} />
                    </div>
                )}
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
