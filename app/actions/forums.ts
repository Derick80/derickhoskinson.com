"use server";

import prisma from "@/lib/prisma";
import { cache } from "react";

export const getAllForums = async () => {
    // try {
    //     const forums = await prisma.forum.findMany()
    //     return forums;
    // } catch (error) {
    //     console.error(error);
    // }
    const forums = await prisma.forum.findMany();
    if (!forums) {
        return null;
    }
    return forums;
};

export const getForumPosts = cache(async () => {
    return await prisma.forumPost.findMany({
        include: {
            tags: true,
            author: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
});

export const getUniqueTags = async () => {
    return await prisma.tag.findMany({
        distinct: ['title'],
        include: {
            forumPosts: true,
        },
    })
}