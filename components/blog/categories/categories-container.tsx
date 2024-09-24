'use client'
import { CategoryFilterType, MDXFrontMatter } from "@/lib/types";
import Category from "./category";
import React from "react";
import BlogList from "../blog-list";
import { Separator } from "@/components/ui/separator";
import { getAllBlogPosts, getSlugsAndCategories } from '@/app/actions/mdx-server';
import ClearSearchParamsButton from '@/components/shared/clear-button';

type CategoriesContainerProps = {

  categories: CategoryFilterType[];
};


const CategoriesContainer = async ({ categories }: {

  categories: CategoryFilterType[];

}) => {
  const posts = await getAllBlogPosts();
  const [activeCategories, setActiveCategories] = React.useState<string[]>([]);


  const filteredPosts = posts.filter((post: MDXFrontMatter) => {
    const searchParam = searchParams.category
    if (!searchParam) {
      return true;
    }
    console.log(searchParam, 'searchParam');
    // look at the post categories and see if it includes the searchParams
    for (const category of post.categories) {
      if (category === searchParam) {
        return true;
      }
    }
    return false;
  }
  );

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const newCategories = activeCategories.includes(value)
      ? activeCategories.filter((category) => category !== value)
      : [...activeCategories, value];
    const newSearchParams = {
      ...searchParams,
      categories: newCategories.join(','),
    };
    window.location.search = new URLSearchParams(newSearchParams as any).toString();
  }



  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-2xl font-bold">Categories</h2>
      <ClearSearchParamsButton
        searchParams={ Object.fromEntries(
          Object.entries(searchParams).filter(
            ([_, value]) => typeof value === 'string'
          )
        ) as { [key: string]: string } }
      />
      <p className="text-sm">Browse by category</p>
      <div className="flex flex-wrap gap-2 p-2">

        <Category
          data={
            categories
          }

          activeCategories={ activeCategories }
          setActiveCategories={ setActiveCategories }
        />
      </div>

      <Separator />
      { filteredPosts.length > 0 ? (
        <BlogList

          posts={ filteredPosts }
        />
      ) : (
        <p>No posts found</p>
      ) }

    </div>
  );
};

export default CategoriesContainer;
