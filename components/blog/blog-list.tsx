"use client";
import { MDXFrontMatter } from "@/app/actions/mdx-server";
import { BlogCard } from "./blog-card";
import React from "react";

export default function BlogList({ posts }: { posts: MDXFrontMatter[] }) {
  return (
    <div className="flex min-h-screen flex-col gap-5 py-2">
      {posts.map((post) => post.slug && <BlogCard key={post.slug} {...post} />)}
    </div>
  );
}
