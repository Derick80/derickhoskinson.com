import React, { Suspense } from "react";
import { getAllPosts } from "../actions/mdx-server";
import { verifySession } from "../actions/auth";
import BlogList from "@/components/blog/blog-list";
import CategorySelector from "../../components/blog/categories/categories/category-container";

export default async function Blog(props: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const searchParams = await props.searchParams;
  const categoriesParam = searchParams.categories;

  const categories =
    typeof categoriesParam === "string"
      ? categoriesParam.split(",")
      : categoriesParam || [];

  const posts = await getAllPosts();
  if (!posts) return null;
  return (
    <div className="flex min-h-screen flex-col py-2">
      <CategorySelector posts={posts} />
      <Suspense fallback={<p>Loading results...</p>}>
        <div className="prose prose-neutral mt-4 flex min-w-full flex-col justify-center gap-4 dark:prose-invert prose-a:no-underline">
          <BlogList categories={categories} />
        </div>
      </Suspense>
    </div>
  );
}
