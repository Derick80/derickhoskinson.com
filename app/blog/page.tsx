import React from "react";
import { getAllBlogPosts, getSlugsAndCategories } from "../actions/mdx-server";
import CategoriesContainer from "@/components/blog/categories/categories-container";
import { verifySession } from '../actions/auth';

export default async function Blog ({
  searchParams,
}: {
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
}) {
  const sessionData = await verifySession()

  const isAuthenticated = sessionData?.isAuthenticated

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Not authenticated</h1>
        <p>You need to be authenticated to view this page</p>
      </div>
    )
  }
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
