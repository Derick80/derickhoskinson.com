import React from "react";
import { getAllBlogPosts, getFilteredPosts } from "../actions/mdx-server";
import { verifySession } from '../actions/auth';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MDXFrontMatter } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BlogList } from '@/components/blog/blog-list';

export default async function Blog ({
  searchParams,
}: {
  searchParams: {
    category: string;
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
  // get unique categories
  const categories = posts.map((post) => post.categories).flat();

  const uniqueCategories = [...new Set(categories)];
  // transform into an object with category, related posts and count
  const categoryData = uniqueCategories.map((category) => {
    const related = posts
      .filter((post) => post.categories.includes(category))
      .map((post) => post.slug);
    return {
      category,
      related,
      categoryCount: related.length,
    };
  });

  return (
    <main className="flex flex-col border-2 border-purple-500 gap-4 justify-center mt-4 prose min-w-full dark:prose-invert prose-a:no-underline">
      <div
        className="flex flex-col border border-red-500">
        <h1
          className="text-4xl font-bold">
          Blog
        </h1>
        <p
          className="text-lg">
          Welcome to the blog page. Browse by category, search for a specific post or just scroll through the posts.
        </p>

      </div>

      <div
        className='flex flex-col gap-4'>


        { posts.map((post) => (

          <BlogList
            key={ post.slug }
            { ...post }
          />
        )) }
      </div>
    </main>
  );
}


const CategoryCount = ({
  categoryId,
  posts,
}: {
  categoryId: string;
  posts: MDXFrontMatter[];
}) => {
  // write function to count the number of posts in a category and return the count and the slug for the category post
  const count = posts.filter((post) => post.categories.includes(categoryId)).length;

  const related = posts
    .filter((post) => post.categories.includes(categoryId))
    .map((post) => post.slug);


  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge>
          { count }
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          { related.map((rel) => (
            <Link
              key={ rel }
              href={ `/blog/${rel}` }
              className="flex items-center justify-between gap-1"
            >
              { rel }
            </Link>
          )) }

        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
