'use server'

import prisma from '@/lib/prisma'
import { cache } from 'react'

export const getForumEntries = async () => {
    try {
        return await prisma.entry.findMany({
            include: {
                tags: {
                    include: {
                        relatedEntries: true
                    }
                }
            }
        })
    } catch (error) {
        console.error(error)
    }
}
export const getForumData = async () => {
    const entries = await prisma.entry.findMany({
        select: {
            id: true,
            title: true,
            description: true,
            content: true,
            tags: {
                select: {
                    id: true,
                    title: true,
                    description: true,
                    relatedEntries: {
                        select: {
                            id: true,
                            title: true,
                            description: true,
                            content: true
                        }
                    }
                }
            }
        }
    })

    const tags = await prisma.tag.findMany({
        include: {
            relatedEntries: true,
            _count: {
                select: { relatedEntries: true }
            }
        }
    })

    return { entries, tags }
}

export const getAllForums = async () => {
    // try {
    //     const forums = await prisma.forum.findMany()
    //     return forums;
    // } catch (error) {
    //     console.error(error);
    // }
    const forums = await prisma.forum.findMany()
    if (!forums) {
        return null
    }
    return forums
}

export const getForumPosts = cache(async () => {
    return await prisma.entry.findMany({
        include: {
            tags: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true
                }
            }
        }
    })
})

export const getUniqueTags = async () => {
    return await prisma.tag.findMany({
        distinct: ['title'],
        include: {
            relatedEntries: true
        }
    })
}
