/* Mdx Blog types */

export type MDXFrontMatter = {
  title: string;
  author: string;
  date: string;
  published: boolean;
  slug: string;
  readingTime: string;
  wordCount: number;
  categories: string[];
};

export type CategoryFilterType = {
  category: string;
  related: string[];
  categoryCount: number;
};
