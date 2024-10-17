'use server'

import cloudinary from 'cloudinary'
import { revalidatePath } from 'next/cache'
import prisma from '@/lib/prisma'

cloudinary.v2.config({
    cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function uploadImagesToCloudinary (prevState: any, formData: FormData) {
    const files = formData.getAll('files') as File[]
    if (files.length === 0) {
        return { success: false, error: 'No files found in FormData' }
    }
    const userId = formData.get('userId') as string


    const uploadPromises = files.map(file =>
        new Promise<cloudinary.UploadApiResponse>((resolve, reject) => {
            const stream = cloudinary.v2.uploader.upload_stream(
                {
                    folder: 'personal_blog_2024',
                    filename_override: file.name,
                    discard_original_filename: false,
                    use_filename: true,
                    unique_filename: false,
                    overwrite: true,
                    transformation: [{
                        quality: 'auto',
                        fetch_format: 'webp'
                    }]
                },
                (error, result) => {
                    if (error) reject(error)
                    else if (result) resolve(result)
                }
            )

            const reader = file.stream().getReader()
            const pump = () => {
                reader.read().then(({ done, value }) => {
                    if (done) {
                        stream.end()
                    } else {
                        stream.write(value)
                        pump()
                    }
                })
            }
            pump()
        })
    )

    try {
        const results = await Promise.all(uploadPromises)

        // Save image information to the database
        await Promise.all(results.map(result =>
            prisma.userImage.upsert({
                where: {
                    id: result.public_id,
                    fileName: result.original_filename
                },
                update: {},
                create: {
                    cloudinaryId: result.public_id,
                    userId,
                    fileName: result.original_filename,
                    imageUrl: result.secure_url,
                    // is it possible to check if I ahve a userAvatar set to True and if so set it to false?
                    userAvatar: false

                }
            })
        ))

        revalidatePath('/') // Revalidate the path where images are displayed
        return { success: true, results }
    } catch (error) {
        console.error('Error uploading images:', error)
        return { success: false, error: 'Failed to upload images' }
    }
}