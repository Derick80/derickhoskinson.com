/* eslint-disable @next/next/no-img-element */
'use client'
import React, { use, useId } from 'react'
import { useDropzone } from 'react-dropzone-esm'
import { Upload, File, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import toast from 'react-hot-toast'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui/input'
import { create } from '../actions/cloudinary'
import { Label } from '@/components/ui/label'

import { CustomUserImageType } from '@/lib/types'
import { useFileURLs } from './use-file-url'
import FileImage from './file-image'
import { ImageWithPlaceholder } from './image-with-placeholder'
// V0 help here.

interface UploadResponse {
    url: string
    publicId: string
    format: string
    width: number
    height: number
}

export default function ImageDropZone ({
    userImages,
    userId
}: {
    userImages: CustomUserImageType[]
    userId: string
}) {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const [errorMessage, setErrorMessage] = React.useState('')
    const [files, setFiles] = React.useState<File[]>([])
    const [uploading, setUploading] = React.useState(false)

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        async onDrop (files) {
            try {
                if (inputRef.current) {
                    inputRef.current.value = ''
                }
                const formData = new FormData()

                files.forEach((file) => {
                    formData.append('imageField', file)
                    formData.append('userId', userId)
                    formData.append('intent', 'upload')
                })
                try {
                    const response = await fetch('/cloudinary', {
                        method: 'POST',
                        body: formData
                    })
                    const data: UploadResponse[] = await response.json()
                    console.log(data, 'data from cloudinary')
                    if (data) {
                        toast('Upload successful:')
                    }
                    // Handle successful upload response
                } catch (error) {
                    if (error instanceof Error) {
                        setErrorMessage(error.message)
                    }
                    setFiles([])
                    // Handle upload error
                } finally {
                    setUploading(false)
                }
            } catch (error) {
                console.error(error)
            }
        }
    })

    return (
        <div className='p-4'>
            <h2>Upload Image</h2>
            <div className='mt-4 flex flex-wrap gap-4'>
                { userImages.map((image) => (
                    <FileImage
                        key={ image.fileName }
                        cloudinaryId={ image?.cloudinaryId }
                    >
                        <ImageWithPlaceholder
                            key={ image.fileName }
                            src={ image.imageUrl || '' }
                            className='mt-2 h-20 w-20 rounded-lg border-2 border-white ring-2 ring-neutral-400 ring-offset-1 hover:ring-primary-foreground'
                            placeholderSrc={
                                '/assets/images/placeholder-user.jpg'
                            }
                        />
                    </FileImage>
                )) }
            </div>

            <div className='mt-4'>
                {/* Dropzone */ }
                <form
                    action={ create }
                    { ...getRootProps({
                        className: cn('w-full h-fit', {
                            'bg-primary-foreground': isDragActive,
                            'bg-neutral-100': !isDragActive
                        })
                    }) }
                    className={ `cursor-pointer rounded-lg border-2 border-dashed p-8 text-center transition-colors ${isDragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                        }` }
                >
                    <Label
                        htmlFor='imageField'
                        className='block w-full items-center'
                    >
                        <div className='flex w-full cursor-pointer place-items-center justify-center gap-2 rounded-md border-2 border-dashed px-4 py-6 text-neutral-500 transition-colors hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-800 md:py-12'>
                            <Upload className='mx-auto h-12 w-12 text-muted-foreground' />
                            <p className='mt-2 text-sm text-gray-600'>
                                Drag or drop some files here, or click to select
                                files
                            </p>
                        </div>

                        <Input
                            { ...getInputProps() }
                            type='file'
                            name='imageField'
                            id='imageField'
                            multiple
                            className='hidden'
                        />
                    </Label>
                </form>
                { errorMessage && <p className='text-red-500'>{ errorMessage }</p> }
            </div>
        </div>
    )
}
