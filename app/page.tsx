import { BlogCard } from "@/components/blog/blog-card";
import {
  getAllBlogPosts,
  getAllPosts,
  getSlugsAndCategories,
} from "./actions/mdx-server";
import type { Metadata } from "next";
import CategoryContainer from "./_components/categories/category-container";
import BlogList from "@/components/blog/blog-list";
import CategoryBadges from "./_components/categories/category-badges";
import CategorySelector from "./_components/categories/category-container";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Dr. Hoskinson's Blog",
  description: "A personal web app for Dr. Hoskinson",
  keywords: [
    "clinical genetics",
    "genetics phd",
    "acmg",
    "variant classification",
    "somatic",
    "germline",
    "tufts genetics phd",
  ],
};

// This is a Server Component
async function SearchResults({ categories }: { categories?: string[] }) {
  // Simulate a database query or API call
  const posts = await getAllPosts(categories);

  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <ul>
      <BlogList posts={posts} />
    </ul>
  );
}
export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categoriesParam = searchParams.categories;

  const categories =
    typeof categoriesParam === "string"
      ? categoriesParam.split(",")
      : categoriesParam || [];

  const allPosts = await getAllPosts(categories);
  return (
    <div className="flex min-h-screen flex-col py-2">
      {/* <CategoryBadges posts={ allPosts } /> */}
      <CategorySelector posts={allPosts} />
      <Suspense fallback={<p>Loading results...</p>}>
        <div className="prose mt-4 flex min-w-full flex-col justify-center gap-4 dark:prose-invert prose-a:no-underline">
          <SearchResults categories={categories} />
        </div>
      </Suspense>
    </div>
  );
}
