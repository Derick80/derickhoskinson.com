'use server'
import { z } from 'zod'
import cloudinary, { UploadApiResponse } from 'cloudinary'
import { NextRequest } from 'next/server'
import prisma from '@/lib/prisma'
import { revalidateTag } from 'next/cache'
import { cache } from 'react'

interface CloudinaryUploadResult {
    secure_url: string
    public_id: string
    format: string
    width: number
    height: number
    bytes: number
    original_filename: string
}
const NewImageSchema = z.object({
    imageField: z
        .array(z.instanceof(File))
        .refine(
            (files) => files.every((file) => file.size > 0),
            'Image is required'
        ),
    userId: z.string({
        required_error: 'User ID is required'
    }),
    intent: z.string({
        required_error: 'Intent is required'
    })
})

const cloudname = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
const apiKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY
const apiSecret = process.env.CLOUDINARY_API_SECRET

if (!cloudname || !apiKey || !apiSecret) {
    throw new Error('Missing cloudinary credentials')
}

cloudinary.v2.config({
    cloud_name: cloudname,
    api_key: apiKey,
    api_secret: apiSecret
})

export const create = cache(async (formData: FormData) => {
    const validatedFields = NewImageSchema.safeParse({
        imageField: formData.getAll('imageField'),
        userId: formData.get('userId'),
        intent: formData.get('intent')
    })
    if (!validatedFields.success) {
        return {
            message: validatedFields.error?.flatten().fieldErrors
        }
    }

    const files = formData.getAll('imageField') as File[]

    const userId = formData.get('userId') as string
    const user = await prisma.user.findUnique({
        where: {
            id: userId
        }
    })
    if (!user) {
        throw new Error('User not found')
    }

    const uploadPromises = files.map(async (file) => {
        const arrayBuffer = await file.arrayBuffer()
        const buffer = new Uint8Array(arrayBuffer)

        return new Promise<CloudinaryUploadResult>((resolve, reject) => {
            cloudinary.v2.uploader
                .upload_stream(
                    {
                        folder: 'dh-com',
                        filename_override: file.name,
                        discard_original_filename: false,
                        use_filename: true,
                        unique_filename: true,
                        overwrite: true,
                        transformation: [{ quality: 'auto' }]
                    },
                    (error, result) => {
                        if (error || !result) reject(error)
                        else resolve(result)
                    }
                )
                .end(buffer)
        })
    })
    // wait for files to upload
    const uploadResults = await Promise.all(uploadPromises)
    const saveImages = await Promise.all(
        uploadResults.map(async (result) => {
            return prisma.userImage.create({
                data: {
                    userId: user.id,
                    cloudinaryId: result.public_id,
                    imageUrl: result.secure_url,
                    fileName: result.original_filename,
                    userAvatar: false,
                    width: result.width,
                    height: result.height
                }
            })
        })
    )
    revalidateTag('userImages')
    return saveImages
})

export const deleteImage = cache(async (cloudinaryId: string) => {
    {
        const image = await prisma.userImage.findUnique({
            where: {
                cloudinaryId
            }
        })
        if (!image) {
            throw new Error('Image not found')
        }
        await cloudinary.v2.uploader.destroy(image.cloudinaryId)
        await prisma.userImage.delete({
            where: {
                cloudinaryId
            }
        })
        revalidateTag('userImages')
        return image
    }
})
