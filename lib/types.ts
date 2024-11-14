/* Mdx Blog types */
import { z } from "zod";

export const frontMatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  author: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  published: z.boolean(),
  categories: z.array(z.string()),
  slug: z.string(),
  readingTime: z.string(),
  wordCount: z.number(),
  content: z.string(),
});
export type MDXFrontMatter = z.infer<typeof frontMatterSchema>;

export type CategoryFilterType = {
  category: string;
  related: string[];
  categoryCount: number;
};

export const blogPostSchema = z.object({
  slug: z.string(),
});
export type BlogPost = z.infer<typeof blogPostSchema>;

export type AuthedUserMore = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean | null;
  userImages: {
    imageUrl: string;
    userAvatar: boolean;
  }[];
};

export type CustomUserImageType = {
  id: string;
  userId: string;
  imageUrl: string | null;
  cloudinaryId: string;
  fileName: string;
  width: number;
  height: number;
  userAvatar: boolean;
};
