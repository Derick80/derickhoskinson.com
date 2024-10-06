import React from "react";
import { getAllBlogPosts } from "../actions/mdx-server";
import { verifySession } from "../actions/auth";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MDXFrontMatter } from "@/lib/types";
import BlogList from "@/components/blog/blog-list";

export default async function Blog ({ }) {
  const sessionData = await verifySession();

  const isAuthenticated = sessionData?.isAuthenticated;

  if (!isAuthenticated) {
    return (
      <div>
        <h1>Not authenticated</h1>
        <p>You need to be authenticated to view this page</p>
      </div>
    );
  }

  const posts = await getAllBlogPosts();
  // console.log(posts, "posts");
  return (
    <main className="prose mt-4 flex min-w-full flex-col justify-center gap-4 dark:prose-invert prose-a:no-underline">
      <div className="flex flex-col gap-4">
        <BlogList posts={ posts } />
      </div>
    </main>
  );
}
