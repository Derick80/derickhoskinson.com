'use client'
import React from 'react'
import { updateComment } from '@/app/actions/comments'
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card'
import { AlertCircle, Calendar, User } from 'lucide-react'
import { Alert, AlertTitle, AlertDescription } from '../ui/alert'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '../ui/select'
import { Button } from '../ui/button'
import { CommentListProps, Comment } from '@/lib/types'

const CommentList = ({ postId, initialComments }: CommentListProps) => {
    const [comments, setComments] = React.useState(initialComments)
    const [viewMode, setViewMode] = React.useState<'flat' | 'nested'>('flat')
    const [sortBy, setSortBy] = React.useState<'date' | 'author'>('date')
    const [sortOrder, setSortOrder] = React.useState<'asc' | 'desc'>('desc')

    const organizedComments = React.useMemo(() => {
        if (!Array.isArray(comments) || comments.length === 0) {
            return []
        }
        const sortedComments = [...comments]

        sortedComments.sort((a, b) => {
            if (sortBy === 'date') {
                return sortOrder === 'asc'
                    ? new Date(a.createdAt).getTime() -
                          new Date(b.createdAt).getTime()
                    : new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime()
            } else {
                return sortOrder === 'asc'
                    ? a.author.localeCompare(b.author)
                    : b.author.localeCompare(a.author)
            }
        })
        // Sort comments
        // Organize into nested structure if viewMode is 'nested'
        if (viewMode === 'nested') {
            const commentMap = new Map<
                string,
                Comment & { replies: Comment[] }
            >()
            const rootComments: (Comment & { replies: Comment[] })[] = []

            sortedComments.forEach((comment) => {
                const commentWithReplies = { ...comment, replies: [] }
                commentMap.set(comment.id, commentWithReplies)

                if (!comment.parentId) {
                    rootComments.push(commentWithReplies)
                } else {
                    const parentComment = commentMap.get(comment.parentId)
                    if (parentComment) {
                        parentComment.replies.push(commentWithReplies)
                    } else {
                        rootComments.push(commentWithReplies)
                    }
                }
            })

            return rootComments
        }

        return sortedComments
    }, [comments, viewMode])

    const renderComment = (
        comment: Comment & { replies?: Comment[] },
        depth = 0
    ) => (
        <Card
            key={comment.id}
            className={`mb-4 ${depth > 0 ? 'ml-6 border-l-4 border-l-primary' : ''}`}
        >
            <CardHeader className='pb-2'>
                <CardTitle className='flex items-center text-sm font-medium'>
                    <User className='mr-2 h-4 w-4 text-primary' />
                    {comment.author}
                </CardTitle>
            </CardHeader>
            <CardContent>
                <p className='mb-2 text-sm'>{comment.message}</p>
                <div className='flex items-center text-xs text-muted-foreground'>
                    <Calendar className='mr-1 h-3 w-3' />
                    {new Date(comment.createdAt).toLocaleString()}
                </div>
                {comment.replies && (
                    <div className='mt-4 space-y-4'>
                        {comment.replies.map((reply) =>
                            renderComment(reply, depth + 1)
                        )}
                    </div>
                )}
            </CardContent>
        </Card>
    )

    if (!Array.isArray(comments)) {
        return (
            <Alert variant='destructive' className='mt-4'>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                    Unable to load comments. Please try again later.
                </AlertDescription>
            </Alert>
        )
    }

    if (comments.length === 0) {
        return (
            <Alert>
                <AlertCircle className='h-4 w-4' />
                <AlertTitle>No Comments</AlertTitle>
                <AlertDescription>
                    There are no comments to display at this time.
                </AlertDescription>
            </Alert>
        )
    }

    return (
        <div className='space-y-4'>
            <div className='flex justify-end space-x-4'>
                <Select
                    onValueChange={(value: 'date' | 'author') =>
                        setSortBy(value)
                    }
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Sort by' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='date'>Date</SelectItem>
                        <SelectItem value='author'>Author</SelectItem>
                    </SelectContent>
                </Select>
                <Select
                    onValueChange={(value: 'asc' | 'desc') =>
                        setSortOrder(value)
                    }
                >
                    <SelectTrigger className='w-[180px]'>
                        <SelectValue placeholder='Sort order' />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value='asc'>Ascending</SelectItem>
                        <SelectItem value='desc'>Descending</SelectItem>
                    </SelectContent>
                </Select>
                <Button
                    variant={viewMode === 'flat' ? 'default' : 'outline'}
                    onClick={() => setViewMode('flat')}
                >
                    Flat
                </Button>
                <Button
                    variant={viewMode === 'nested' ? 'default' : 'outline'}
                    onClick={() => setViewMode('nested')}
                >
                    Nested
                </Button>
            </div>
            <div className='space-y-4'>
                {organizedComments.map((comment) => renderComment(comment))}
            </div>
        </div>
    )
}

export default CommentList
