'use server'

import prisma from '@/lib/prisma'
import { verifySession } from './auth'
import { redirect } from 'next/navigation'
import { revalidatePath, revalidateTag } from 'next/cache'
import { cache } from 'react'
export const getUserImages = cache(async (userId: string) => {
    const userImages = await prisma.userImage.findMany({
        where: {
            userId
        },
        orderBy: [
            {
                userAvatar: 'desc'
            },
            {
                createdAt: 'desc'
            }
        ]
    })
    // We want to limit the number of images to 4 for the user so we want to return dummy images if the user has less than 4 images

    const arrayLength = userImages.length
    // get the difference between the length of the userImages and 4
    const difference = 4 - arrayLength
    // if the difference is greater than 0, then we need to add dummy images
    if (difference > 0) {
        for (let i = 0; i < difference; i++) {
            userImages.push({
                id: `dummy-${i}`,
                imageUrl: '/assets/images/placeholder-user.jpg',
                userAvatar: false,
                fileName: `dummy-${i}`,
                cloudinaryId: '',
                width: 200,
                height: 200,
                userId: '',
                createdAt: new Date(),
                updatedAt: new Date()
            })
        }
    }

    return userImages
})
export const starUserImage = async (imageId: string) => {
    const session = await verifySession()
    if (!session) redirect('/login')
    const userId = session.userId
    // Set all other images to false
    await prisma.userImage.updateMany({
        where: {
            userId: userId,
            userAvatar: true
        },
        data: {
            userAvatar: false
        }
    })

    // Set the selected image to true
    const updated = await prisma.userImage.update({
        where: {
            id: imageId // Assuming 'id' is the unique identifier for userImage
        },
        data: {
            userAvatar: true
        }
    })
    if (!updated) {
        throw new Error('Failed to update user image')
    }
    return revalidateTag('userImages')
}
