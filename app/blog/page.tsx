import React from "react";
import { getAllBlogPosts } from "../actions/mdx-server";
import { verifySession } from '../actions/auth';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { MDXFrontMatter } from '@/lib/types';
import BlogList from '@/components/blog/blog-list';


export default async function Blog ({

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


  return (
    <main className="flex flex-col border-2 border-purple-500 gap-4 justify-center mt-4 prose min-w-full dark:prose-invert prose-a:no-underline">

      <div
        className='flex flex-col gap-4'>




        <BlogList
          posts={ posts }
        />

      </div>
    </main>
  );
}
