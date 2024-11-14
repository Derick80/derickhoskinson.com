'use client'
import { cn } from '@/lib/utils'
import { Plus, Star, Trash2 } from 'lucide-react'
import { starUserImage } from '../actions/user-avatar'

type StartImageProps = {
    isUserAvatar: boolean
    imageId: string
}
const StarImage = ({ isUserAvatar, imageId }: StartImageProps) => {
    return (
        <button
            className={cn(
                'absolute right-0 top-0 rounded-full p-1 text-white outline outline-black/10 focus:outline-none focus:ring-2',
                isUserAvatar
                    ? 'bg-yellow-300 hover:bg-yellow-600 focus:ring-yellow-300'
                    : 'bg-gray-400/20 hover:bg-yellow-600 focus:ring-yellow-300'
            )}
            name='_intent'
            value={isUserAvatar ? 'remove-avatar' : 'make-primary'}
            onClick={async () => {
                starUserImage(imageId)
            }}
        >
            {isUserAvatar ? (
                <Star className='fill-yellow-300' />
            ) : (
                <Star className='h-4 w-4' />
            )}
        </button>
    )
}

export default StarImage
