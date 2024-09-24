"use client";
import { CategoryFilterType, MDXFrontMatter } from "@/lib/types";
import Category from "./category";
import React from "react";
import BlogList from "../blog-list";
import { Separator } from "@/components/ui/separator";

type CategoriesContainerProps = {
  data: CategoryFilterType[];
  posts: MDXFrontMatter[];
  searchParams: {
    [key: string]: string | string[] | undefined;
  };
};

const CategoriesContainer = ({
  data,
  posts,
  searchParams,
}: CategoriesContainerProps) => {
  console.log(searchParams, "searchParams");

  const [activeCategories, setActiveCategories] = React.useState(() => {
    return typeof searchParams.category === "string"
      ? searchParams.category.split(",")
      : [];
  });

  const filteredPosts = posts.filter((post) => {
    if (activeCategories.length === 0) {
      return true;
    }

    return activeCategories.some((category) => {
      return post.categories.includes(category);
    });
  });
  function handleCategorySelect({
    target,
  }: React.ChangeEvent<HTMLInputElement>) {
    setActiveCategories((prevTags) => {
      if (prevTags.includes(target.value)) {
        return prevTags.filter((tag) => target.value !== tag);
      } else {
        return [...prevTags, target.value];
      }
    });
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <h2 className="text-2xl font-bold">Categories</h2>
      <p className="text-sm">Browse by category</p>
      <div className="flex flex-wrap gap-2 p-2">
        {data.map((category) => (
          <Category
            key={category.category}
            data={category}
            onCategorySelect={handleCategorySelect}
            activeCategories={activeCategories}
          />
        ))}
      </div>
      <Separator />
      <BlogList posts={filteredPosts} />
    </div>
  );
};

export default CategoriesContainer;
