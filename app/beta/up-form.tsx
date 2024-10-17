'use client'
import { useActionState, useRef } from 'react'
import { uploadImagesToCloudinary, uploadImageToCloudinary } from '../actions/cloudinary'
import type { UploadApiResponse } from 'cloudinary'
import { useDropzone } from 'react-dropzone-esm'
import React from 'react'
import { ImageIcon, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { UserImage } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { verifySession } from '../actions/auth'

type UploadState = {
    success: boolean
    error?: string
    results?: UploadApiResponse[]
}

const initialState: UploadState = {
    success: false
}
export const UploadImageForm = ({
    userImages,
    onUploadComplete,
    userData

}: {
    userImages: UserImage[]
    onUploadComplete: () => void
    userData: { userId: string, isAuthed: boolean }

}) => {



    const [pendingFiles, setPendingFiles] = React.useState<File[]>([])
    const formRef = useRef<HTMLFormElement>(null)
    const [state, action, isPending] = useActionState<typeof uploadImagesToCloudinary, UploadState>(uploadImagesToCloudinary, initialState)

    const { getRootProps, getInputProps, isDragActive, inputRef } = useDropzone({
        onDrop: async (acceptedFiles) => {
            try {
                const newFiles = acceptedFiles.filter((file) => {
                    return !userImages.some(
                        (existingImage) => existingImage.fileName === file.name.split('.')[0]
                    )
                })
                setPendingFiles((prev) => [...prev, ...newFiles])
            } catch (error) {
                console.error('Error adding files:', error)
            }
        },
        noClick: true
    })



    return (
        <form
            ref={ formRef }
            action={
                action
            }
            className="space-y-4"
        >
            <div
                { ...getRootProps({
                    className: cn('w-full h-fit cursor-pointer', {
                        'bg-primary/10': isDragActive,
                        'bg-secondary': !isDragActive
                    })
                }) }
            >
                <Label htmlFor="imageField" className="block w-full">
                    <div className="flex gap-2 place-items-center rounded-md border-2 border-dashed px-4 py-6 md:py-12 text-muted-foreground transition-colors hover:border-primary hover:text-primary w-full justify-center">
                        <ImageIcon className="h-8 w-8" />
                        <span>Drop images here or click to select</span>
                    </div>
                    <Input
                        { ...getInputProps() }
                        type="file"
                        name="files"
                        id="imageField"
                        multiple
                        className="sr-only"
                    />
                </Label>
                <input
                    type="hidden"
                    name="userId"
                    value={
                        userData.userId }
                />
            </div>

            { pendingFiles.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-sm font-medium mb-2">Selected files:</h3>
                    <ul className="list-disc pl-5">
                        { pendingFiles.map((file, index) => (
                            <li key={ index } className="text-sm">{ file.name }</li>
                        )) }
                    </ul>
                </div>
            ) }

            { state.error && (
                <p className="text-destructive text-sm mt-2">{ state.error }</p>
            ) }

            <Button type="submit" disabled={ state.pending || pendingFiles.length === 0 }>
                { state.pending ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                    </>
                ) : (
                    'Upload Images'
                ) }
            </Button>

            { state.success && (
                <p className="text-green-600 text-sm mt-2">Images uploaded successfully!</p>
            ) }
        </form>
    )
}