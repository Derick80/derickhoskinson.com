import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import {
  initialForumUsers,
  initialForums,
  initialPosts,
} from "../lib/resources/test-forums";

const seed = async () => {
  // Seed Users
  const users = await Promise.all(
    initialForumUsers.map((user) =>
      prisma.user.upsert({
        where: { email: user.email },
        update: {},
        create: {
          ...user,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      }),
    ),
  );

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
          updatedAt: new Date(),
        },
      }),
    ),
  );

  // Seed Forum Posts with Tags
  for (const [forumIndex, forumData] of initialPosts.entries()) {
    const forum = forums[forumIndex];

    for (const post of forumData.posts) {
      // Create tags if they don't exist
      const tags = await Promise.all(
        post.tags.map((tagTitle) =>
          prisma.tag.upsert({
            where: { title: tagTitle },
            update: {},
            create: {
              title: tagTitle,
              createdAt: new Date(),
              updatedAt: new Date(),
            },
          }),
        ),
      );

      // Create forum posts and associate them with a forum and a user
      const forumPost = await prisma.forumPost.create({
        data: {
          title: post.title || "Untitled Post",
          content: post.content,
          forumId: forum.id,
          authorId: users[forumIndex % users.length].id,
          createdAt: new Date(),
          updatedAt: new Date(),
          tags: {
            connect: tags.map((tag) => ({ id: tag.id })),
          },
        },
      });
      if (!forumPost) {
        console.error(`Failed to create forum post: ${post.title}`);
        continue;
      }

      // // Optionally, create comments or likes if needed
      // await prisma.comment.create({
      //     data: {
      //         message: "This is a seeded comment.",
      //         postId: forumPost.id,
      //         userId: users[0].id,
      //         createdAt: new Date(),
      //         updatedAt: new Date(),
      //     },
      // });
    }
    console.log(
      `Seeded ${forumData.posts.length} posts for forum: ${forum.title}`,
    );
  }
};
seed()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
