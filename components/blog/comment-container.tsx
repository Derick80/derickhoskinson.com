import {
    commentOnPost,
    getPostInformation,
    getPostsComments
} from '@/app/actions/blog-user'
import { ChatBubbleIcon } from '@radix-ui/react-icons'
import CommentButton from './comment-button'
import { Comment } from '@prisma/client'
import CommentForm from './comment-form'
import { labelCommentCounts, reorganizeComments } from '@/lib/utils'
import { CommentRetrievalType } from '@/lib/types'
import { Button } from '../ui/button'
type CommentsContainerProps = {
    postId: string
    comments: CommentRetrievalType[] | undefined | null
    isAuth: boolean | undefined | null
    userId: string
}

const CommentsContainer = async ({
    postId,
    comments,
    isAuth,
    userId
}: CommentsContainerProps) => {
    return (
        <div className='flex w-full flex-col space-y-2 border-2'>
            <div className='flex cursor-pointer items-center'>
                <span>{ labelCommentCounts(comments?.length) }</span>
            </div>
            <CommentForm
                targetId={ postId }
                postId={ postId }
                userId={ userId }
                isAuth={ isAuth }

            />
            { comments?.map((comment) => (
                <div key={ comment.id } className='flex flex-col space-y-2'>
                    <div>
                        <span>{ comment?.author }</span>
                        <Button variant='ghost'>
                            <ChatBubbleIcon className='h-6 w-6' />
                        </Button>
                        <span>{ comment.message }</span>
                        <CommentButton
                            targetId={ comment.id }
                            isAuth={ isAuth }
                            commentCount={ comments.length }
                        />
                    </div>
                </div>
            )) }
        </div>
    )
}

export default CommentsContainer
