import React from "react";
import { getAllBlogPosts, getSlugsAndCategories } from "../actions/mdx-server";
import CategoriesContainer from "@/components/blog/categories/categories-container";

export default async function Blog ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const posts = await getAllBlogPosts();
  if (!posts) {
    throw new Error("No posts found");
  }
  const categories = await getSlugsAndCategories();

  if (!categories) {
    throw new Error("No categories found");
  }

  return (
    <div className="prose min-w-full dark:prose-invert prose-a:no-underline">
      <CategoriesContainer
        data={ categories }
        posts={ posts.map((post) => post.metadata) }
        searchParams={ searchParams }
      />
    </div>
  );
}
