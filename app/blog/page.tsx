import React, { Suspense } from "react";
import { getAllPosts } from "../actions/mdx-server";
import BlogList from "@/components/blog/blog-list";
import CategorySelector from "../../components/blog/categories/categories/category-container";
import { BlogCard } from '@/components/blog/blog-card';

export default async function Blog () {


  const posts = await getAllPosts();
  if (!posts) return null;
  return (
    <div className="flex min-h-screen flex-col py-2 gap-4 md:gap-6">
      <h1>
        Blog
      </h1>
      <p>
        Welcome to my blog! This blog is a collection of thoughts and ideas on clinical genetics,
        bioinformatics, and other topics that interest me. You may filter the posts by category and read the entire post by clicking on the Read More button.
      </p>

      <Suspense fallback={ <p>Loading results...</p> }>

        { posts.map((post) => post.slug && <BlogCard key={ post.slug } { ...post } />) }
      </Suspense>
    </div>
  );
}
