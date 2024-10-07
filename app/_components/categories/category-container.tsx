"use client";
import {
  getAllBlogPosts,
  getAllPosts,
  MDXFrontMatter,
} from "@/app/actions/mdx-server";
import CategorySelect from "./custom-checkbox";
import CategoryBadges from "./category-badges";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

type CategorySelectorProps = {
  posts: MDXFrontMatter[];
};
const CategorySelector = ({ posts }: CategorySelectorProps) => {
  const categories = posts.flatMap((post) => post.categories);
  const uniqueCategories = [...new Set(categories)].map((category) => ({
    id: category,
    name: category,
  }));

  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialize selected categories from URL params
  const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
    () => {
      const params = new URLSearchParams(searchParams.toString());
      return params.get("categories")?.split(",") || [];
    },
  );

  const toggleCategory = (categoryId: string) => {
    const updatedCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter((id) => id !== categoryId)
      : [...selectedCategories, categoryId];

    setSelectedCategories(updatedCategories);
    updateURLParams(updatedCategories);
  };

  const updateURLParams = (categories: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categories.length > 0) {
      params.set("categories", categories.join(","));
    } else {
      params.delete("categories");
    }
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Update component state when URL params change
  React.useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const urlCategories = params.get("categories")?.split(",") || [];
    setSelectedCategories(urlCategories);
  }, [searchParams]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select Categories</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
        {uniqueCategories.map((category) => (
          <div key={category.id} className="flex items-center space-x-2">
            <Checkbox
              id={category.id}
              checked={selectedCategories.includes(category.id)}
              onCheckedChange={() => toggleCategory(category.id)}
              className="sr-only"
            />
            <Label
              htmlFor={category.id}
              className={`flex-1 rounded-md border-2 px-4 py-2 text-center transition-colors hover:bg-primary/10 ${
                selectedCategories.includes(category.id)
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-input"
              }`}
            >
              {category.name}
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
