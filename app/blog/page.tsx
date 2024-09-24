import React from "react";
import { getAllBlogPosts, getFilteredPosts } from "../actions/mdx-server";
import { verifySession } from '../actions/auth';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MDXFrontMatter } from '@/lib/types';

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
  console.log(uniqueCategories, 'uniqueCategories');

  return (
    <div className="prose min-w-full dark:prose-invert prose-a:no-underline">
      { uniqueCategories.map((post) => (
        <Badge
          key={ post }
          className="mr-2">

          { post }
          <CategoryCount
            posts={ posts }
            categoryId={ post }
          />
        </Badge>
      ))
      }
    </div>
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
