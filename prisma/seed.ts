import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import {
    initialForumUsers,
    initialForums,
    initialPosts
} from '../lib/resources/test-forums'
import { curriculumVitae } from '../lib/resources/cv-for-prisma'
import syncWithDb from '@/scripts/sync-db'

// get users from db and assign them posts and Ids.

export const testComments = [
    {
        postId: 'continuous-dhdotcom-development',
        message: 'This is a great post!'
    },
    {
        postId: 'continuous-dhdotcom-development',
        message: 'I completely agree with you.'
    },
    {
        postId: 'blog-templating-app-a',
        message: 'Thanks for sharing this information.'
    },
    {
        postId: 'blog-templating-app-a',
        message: 'Interesting perspective!'
    },
    {
        postId: 'blog-templating-app-b',

        message: 'I learned something new today.'
    },

    {
        postId: 'blog-templating-app-b',
        message: 'Can you provide more details?'
    }
]

export const moreTestComments = [
    {
        postId: 'blog-templating',
        message: 'This is a great post!'
    },
    {
        postId: 'blog-templating',
        message: 'I completely agree with you.'
    },
    {
        postId: 'blog-templating-app-a',
        message: 'Thanks for sharing this information.'
    },
    {
        postId: 'blog-templating-app-a',

        message: 'Interesting perspective!'
    },
    {
        postId: 'blog-templating-app-b',
        message: 'I learned something new today.'
    },
    {
        postId: 'blog-templating-app-b',
        message: 'Can you provide more details?'
    }
]

const seed = async () => {
    // Sync with the database
    // clear the database
    await prisma.comment.deleteMany()
    await prisma.entry.deleteMany()
    await prisma.comment.deleteMany()
    await prisma.like.deleteMany()
    await prisma.post.deleteMany()
    await prisma.session.deleteMany()

    await prisma.tag.deleteMany()
    await prisma.forum.deleteMany()
    await prisma.user.deleteMany()

    // delete resume data
    await prisma.curriculumVitae.deleteMany()

    const createSkills = (skills: string[]) =>
        skills.map((skill) => ({ title: skill }))

    // sync MY posts with the database

    await syncWithDb()

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
                    updatedAt: new Date(),
                    comments: {
                        create: testComments
                    }
                }
            })
        )
    )

    const createProjects = (projects: { title: string }[]) =>
        projects.map((project) => ({ title: project.title }))

    const skills = curriculumVitae.skills.map((skill) => ({ skill }))

    const cv = await prisma.curriculumVitae.create({
        data: {
            title: curriculumVitae.title,
            isCurrent: curriculumVitae.isCurrent,
            isPrimary: curriculumVitae.isPrimary,
            description: curriculumVitae.description,
            phoneNumber: curriculumVitae.phoneNumber,
            email: curriculumVitae.email,
            website: curriculumVitae.website,
            location: curriculumVitae.location,
            github: curriculumVitae.github,
            summary: curriculumVitae.summary,
            skills: {
                create: curriculumVitae.skills.map((skill) => ({
                    category: skill.category,
                    skill: skill.skill.map((s) => s)
                }))
            },
            education: {
                create: curriculumVitae.education.map((education) => ({
                    ...education,
                    startDate: new Date(education.startDate),
                    endDate: new Date(education.endDate),
                    projects: {
                        create: createProjects(education.projects)
                    }
                }))
            },
            experience: {
                create: curriculumVitae.experience.map((experience) => ({
                    ...experience,
                    startDate: new Date(experience.startDate),
                    endDate: new Date(experience.endDate),
                    duties: {
                        create: experience.duties
                    }
                }))
            },
            publications: {
                create: curriculumVitae.publications.map((pub) => ({
                    title: pub.title,
                    year: Number(pub.year),
                    journal: pub.journal,
                    authors: pub.authors.split(', '),
                    edition: pub.edition,
                    doi: pub.doi,
                    pmid: pub.pmid,
                    pmcid: pub.pmcid,
                    pdf: pub.pdf
                }))
            }
        }
    })

    if (!cv) {
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
