'use client'
import { cn } from '@/lib/utils'
import { Plus, Star, Trash2 } from 'lucide-react'
import { starUserImage } from '../actions/user-avatar'


type StartImageProps = {
    isUserAvatar: boolean
    imageId: string
}
const StarImage = (
    { isUserAvatar, imageId }: StartImageProps

) => {
    return (

        <button
            className={ cn("absolute top-0 right-0 rounded-full p-1 text-white outline outline-black/10 focus:outline-none  focus:ring-2",
                isUserAvatar ? "bg-yellow-500 hover:bg-red-600 focus:ring-red-300" : "bg-gray-400/20 hover:bg-yellow-600 focus:ring-yellow-300"
            )
            }
            name="_intent"
            value={ isUserAvatar ? 'remove-avatar' : 'make-primary' }
            onClick={ async () => {
                starUserImage(imageId)
            } }
        >
            { isUserAvatar ? <Star
                className=' fill-yellow-500' /> : <Star
                className='w-4 h-4' />

            }

        </button>
    )
}

export default StarImage