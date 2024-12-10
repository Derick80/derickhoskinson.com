'use server'
import { HeartIcon } from 'lucide-react'
import { Button } from '../ui/button'
import { Tooltip, TooltipTrigger } from '../ui/tooltip'

type LikeButtonProps = {
    postId: string
    onLike: () => void
    likes?: number
}

const LikeButton = (props: LikeButtonProps) => {
    const { postId, onLike } = props
    if (!postId) {
        return null
    }

    return (
        <Tooltip>
            <TooltipTrigger content='Login to like'
                asChild>
                <Button
                    variant='ghost'
                    className='flex items-center gap-2'
                    disabled={ true }
                >
                    <HeartIcon size={ 24 } />
                    <span>Like</span>
                </Button>
            </TooltipTrigger>
        </Tooltip>
    )
}

export default LikeButton
