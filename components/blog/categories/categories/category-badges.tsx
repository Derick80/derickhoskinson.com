"use client";
import { getAllPosts, } from "@/app/actions/mdx-server";
import { Badge } from "@/components/ui/badge";
import CategoryButton from "./category-button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { cn } from "@/lib/utils";
import { MDXFrontMatter } from '@/lib/types';

const CategoryBadges = ({ posts }: { posts: MDXFrontMatter[] }) => {
  const searchParams = useSearchParams();
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    [],
  );
  const router = useRouter();
  const pathname = usePathname();
  const categories = posts.flatMap((post) => post.categories);
  const uniqueCategories = [...new Set(categories)];
  const filteredCategories = uniqueCategories.map((category) => ({
    category,
    count: posts.filter((post) => post.categories.includes(category)).length,
  }));

  const handleCategorySelect = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (selectedCategories.includes(category)) {
      params.delete("category");
      setSelectedCategories(
        selectedCategories.filter((cat) => cat !== category),
      );
      router.push(pathname + "?" + params.toString());
    } else {
      params.append("category", category);
      setSelectedCategories([...selectedCategories, category]);
      return params.toString();
    }
  };

  return (
    <div className="mt-4 flex flex-wrap gap-2">
      { " " }
      { filteredCategories.map((cat) => (
        <div
          key={ cat.category }
          className={ cn(
            "flex gap-2",
            selectedCategories.includes(cat.category)
              ? "border-2 border-primary-foreground bg-primary-foreground/90"
              : "",
          ) }
        >
          <CategoryButton
            category={ cat.category }
            count={ cat.count }
            onCategorySelect={ handleCategorySelect }
          />
        </div>
      )) }
    </div>
  );
};

export default CategoryBadges;
