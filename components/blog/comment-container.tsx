import { ChatBubbleIcon } from '@radix-ui/react-icons'

import CommentForm from './comment-form'
import { labelCommentCounts } from '@/lib/utils'
import { CommentRetrievalType, CommentsContainerProps } from '@/lib/types'
import { Button } from '../ui/button'

const CommentsContainer = async ({
    postId,
    comments
}: CommentsContainerProps) => {
    return (
        <div className='flex w-full flex-col space-y-2 border-2'>
            <div className='flex cursor-pointer items-center'>
                <span>{ labelCommentCounts(comments?.length) }</span>
            </div>
            <CommentForm
                targetId={ postId }
                postId={ postId }
                comments={ comments?.map((comment) => comment) }
            />

            <div className='flex flex-col space-y-2'>
                { comments?.map((comment) => (
                    <div key={ comment.id }>
                        <div className='flex items-center space-x-2'>
                            <ChatBubbleIcon className='w-4 h-4' />
                            <span>{ comment.message }</span>
                        </div>
                    </div>
                )) }

            </div>
        </div>
    )
}

export default CommentsContainer
