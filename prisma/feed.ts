import prisma from '@/lib/prisma'
import { Prisma } from '@prisma/client'

// get users from db and assign them posts and Ids.

export const testComments = [
    {
        message: 'This is a great post!'
    },
    {
        message: 'I completely agree with you.'
    },
    {
        message: 'Thanks for sharing this information.'
    },
    {
        message: 'Interesting perspective!'
    },
    {
        message: 'I learned something new today.'
    },
    {
        message: 'Can you provide more details?'
    }
]
