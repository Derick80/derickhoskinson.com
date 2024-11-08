import { getAllPosts } from "@/app/actions/mdx-server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const syncwithDb = async () => {
  const posts = await getAllPosts();

  if (!posts)
    return {
      message: "No posts were found",
    };

  if (posts === null)
    return {
      message: "No posts were found",
    };

  const updated = await Promise.all(
    posts.map(async (post) => {
      await prisma.post.upsert({
        where: { slug: post.slug },
        update: {
          title: post.title,
          slug: post.slug,

        },
        create: {
          title: post.title,
          slug: post.slug,

        },
      });
    }),
  );
  if (!updated)
    return {
      message: "No posts were updated",
    };
  return {
    message: `Updated ${updated.length} posts`,
  };
};

await syncwithDb();
