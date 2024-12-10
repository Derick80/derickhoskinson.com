import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
import {
    initialForumUsers,
    initialForums,
    initialPosts
} from '../lib/resources/test-forums'
import { resume } from '@/lib/resources/curriculum-vitae'

const seed = async () => {
    // delete resume data
    await prisma.curriculumVitae.deleteMany()
    // generate resume data

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
            skills: {
                create: resume.skills.map((skill) => ({
                    title: skill
                }))
            },
            education: {
                create: resume.education.map((edu) => ({
                    institution: edu.institution,
                    description: edu.description,
                    degree: edu.degree,
                    field: edu.field,
                    startDate: new Date(edu.startDate),
                    endDate: new Date(edu.endDate),
                    projects: {
                        create: edu.projects.map((project) => ({
                            title: project.title
                        }))
                    }
                }))
            },
            experience: {
                create: resume.experience.map((work) => ({
                    company: work.company,
                    jobTitle: work.jobTitle,
                    location: work.location,
                    startDate: new Date(work.startDate),
                    endDate: new Date(work.endDate),
                    duties: {
                        create: work.duties.map((duty) => ({
                            title: duty.duty
                        }))
                    }
                }))
            }
        }
    })

    if (!curriculumVitae) {
        console.error('Failed to create resume')
    }
    // Seed Users
    const users = await Promise.all(
        initialForumUsers.map((user) =>
            prisma.user.upsert({
                where: { email: user.email },
                update: {},
                create: {
                    ...user,
                    createdAt: new Date(),
                    updatedAt: new Date()
                }
            })
        )
    )

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
