import { cn } from '@/lib/utils'
import {
    CrossCircledIcon,
    StarFilledIcon,
    StarIcon
} from '@radix-ui/react-icons'
import React from 'react'
import { flushSync } from 'react-dom'
import { ProfileImageDisplayProps } from './profile-image-display'
import { deleteImage } from '../actions/cloudinary'

export type FileImageProps = {
    cloudinaryId: string
    children: React.ReactNode
}
const FileImage = ({ cloudinaryId, children }: FileImageProps) => {
    const deleteImageWithCloudinaryId = deleteImage.bind(null, cloudinaryId)

    return (
        <div className='group relative'>
            {children}
            {/* // if you delete an image it falls back to the placeholder image */}
            <button
                type='button'
                onClick={deleteImageWithCloudinaryId}
                className='absolute -right-[0.625rem] -top-[0.125rem] block rounded-full bg-white text-black text-black/50'
            >
                <CrossCircledIcon />
            </button>
            {/*         className='absolute -right-[0.625rem] -bottom-[0.125rem] hidden rounded-full  hover:block  group-hover:block'
             */}
        </div>
    )
}

export default FileImage
