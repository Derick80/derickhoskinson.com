import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import {
    initialForumUsers,
    initialForums,
    initialPosts
} from '../lib/resources/test-forums'
import { resume } from '@/lib/resources/curriculum-vitae'
import syncWithDb from '@/scripts/sync-db'

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

export const moreTestComments = [
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

const seed = async () => {
    // Sync with the database
    // clear the database
    await prisma.entry.deleteMany()
    await prisma.comment.deleteMany()
    await prisma.like.deleteMany()
    await prisma.post.deleteMany()
    await prisma.session.deleteMany()

    await prisma.tag.deleteMany()
    await prisma.forum.deleteMany()
    await prisma.user.deleteMany()
    await prisma.curriculumVitae.deleteMany()

    // delete resume data
    await prisma.curriculumVitae.deleteMany()
    const createSkills = (skills: string[]) =>
        skills.map((skill) => ({ title: skill }))

    await syncWithDb()

    // Seed Users
    const users = await Promise.all(
        initialForumUsers.map((user) =>
            prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    ...user,
                    name: user.name,
                    email: user.email,

                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        )
    )

    const posts = await prisma.post.findMany({
        select: {
            id: true,
            slug: true
        }
    })

    const uniquePosts = new Set(posts.map((post) => post.slug))
    console.log(`Found ${uniquePosts.size} unique posts`)

    if (posts.length === 0) {
        console.log('Something went wrong. No posts found.')
        return
    }
    // use the unique posts to create comments
    const createComments = (comments: { message: string }[], postId: string) =>
        comments.map((comment) => ({
            message: comment.message,
            postId,
            userId: users[0].id,
            author: users[0].name
        }))
    // Seed Comments

    for (const post of posts) {
        const comments = await Promise.all(
            testComments.map((comment) =>
                prisma.comment.create({
                    data: {
                        author: users[0].name,
                        message: comment.message,
                        postId: post.slug,
                        userId: users[0].id,
                        parentId: null,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                        children: {
                            create: createComments(moreTestComments, post.slug)
                        }
                    }
                })
            )
        )

        if (!comments) {
            console.error(`Failed to create comments for post: ${post.slug}`)
            continue
        }
        console.log(`Seeded ${comments.length} comments for post: ${post.slug}`)
    }

    const createProjects = (projects: { title: string }[]) =>
        projects.map((project) => ({ title: project.title }))

    interface Education {
        institution: string
        description: string
        degree: string
        field: string
        startDate: string
        endDate: string
        projects: { title: string }[]
    }

    const createEducation = (education: Education[]) =>
        education.map((edu) => ({
            institution: edu.institution,
            description: edu.description,
            degree: edu.degree,
            field: edu.field,
            startDate: new Date(edu.startDate),
            endDate: new Date(edu.endDate),
            projects: { create: createProjects(edu.projects) }
        }))

    const createDuties = (duties: { duty: string }[]) =>
        duties.map((duty) => ({ title: duty.duty }))

    interface Experience {
        company: string
        jobTitle: string
        location: string
        startDate: string
        endDate: string
        duties: { duty: string }[]
    }

    const createExperience = (experience: Experience[]) =>
        experience.map((work) => ({
            company: work.company,
            jobTitle: work.jobTitle,
            location: work.location,
            startDate: new Date(work.startDate),
            endDate: new Date(work.endDate),
            duties: { create: createDuties(work.duties) }
        }))

    const curriculumVitae = await prisma.curriculumVitae.create({
        data: {
            title: resume.basics.title,
            phoneNumber: resume.basics.phoneNumber,
            email: resume.basics.email,
            website: resume.basics.website,
            location: resume.basics.location,
            summary: resume.basics.summary,
            createdAt: new Date(),
            description: 'initial resume',
            isCurrent: true,
            isPrimary: true,
            skills: { create: createSkills(resume.skills) },
            education: { create: createEducation(resume.education) },
            experience: { create: createExperience(resume.experience) }
        }
    })

    if (!curriculumVitae) {
        console.error('Failed to create resume data')
    }

    const forums = await Promise.all(
        initialForums.map((forum, index) =>
            prisma.forum.upsert({
                where: { title: forum.title },
                update: {},
                create: {
                    title: forum.title,
                    description: forum.description,
                    creatorId: users[index % users.length].id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        )
    )

    // Seed Forum Posts with Tags
    for (const [forumIndex, forumData] of initialPosts.entries()) {
        const forum = forums[forumIndex]

        for (const post of forumData.posts) {
            // Create tags if they don't exist
            const tags = await Promise.all(
                post.tags.map((tagTitle) =>
                    prisma.tag.upsert({
                        where: { title: tagTitle },
                        update: {},
                        create: {
                            title: tagTitle,
                            description: `Description for ${tagTitle}`,
                            createdAt: new Date(),
                            updatedAt: new Date()
                        }
                    })
                )
            )

            // Create forum posts and associate them with a forum and a user
            const entry = await prisma.entry.create({
                data: {
                    title: post.title || 'Untitled Post',
                    content: post.content,
                    description: post.description,
                    forumId: forum.id,
                    authorId: users[forumIndex % users.length].id,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    tags: {
                        connect: tags.map((tag) => ({ id: tag.id }))
                    }
                }
            })
            if (!entry) {
                console.error(`Failed to create forum post: ${post.title}`)
                continue
            }

            // // Optionally, create comments or likes if needed
            // await prisma.comment.create({
            //     data: {
            //         message: "This is a seeded comment.",
            //         postId: entry.id,
            //         userId: users[0].id,
            //         createdAt: new Date(),
            //         updatedAt: new Date(),
            //     },
            // });
        }
        console.log(
            `Seeded ${forumData.posts.length} posts for forum: ${forum.title}`
        )
    }
}
seed()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })
