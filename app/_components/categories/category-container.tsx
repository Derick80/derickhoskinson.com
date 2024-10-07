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
    const uniqueCategories = [...new Set(categories)];

    // build a new array from the unique categories array. This new array will contain the category name, the number of posts in that category, and the slugs of the posts in that category.
    const postDataByCategory = uniqueCategories.map((category) => {
        const postsInCategory = posts.filter((post) => post.categories.includes(category));
        return {
            category,
            count: postsInCategory.length,
            slugs: postsInCategory.map((post) => post.slug),
        };
    }
    );
    // now reduce.
    const categoryData = postDataByCategory.reduce((acc: { category: string, count: number; slugs: string[] }[], post) => {
        const existingCategory = acc.find((cat) => cat.category === post.category);
        if (existingCategory) {
            existingCategory.count += post.count;
            existingCategory.slugs.push(...post.slugs);
        } else {
            acc.push({ category: post.category, count: post.count, slugs: post.slugs });
        }
        return acc;
    }, []);

    const router = useRouter();
    const searchParams = useSearchParams();

    // Initialize selected categories from URL params
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
        searchParams.get("categories")?.split(",") || []
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
                { uniqueCategories.map((cat) => (
                    <div key={ cat } className="flex items-center space-x-2">
                        <Checkbox
                            id={ cat }
                            checked={ selectedCategories.includes(cat) }
                            onCheckedChange={ () => toggleCategory(cat) }
                            className="sr-only"
                            disabled={ categoryData.find((c) => c.category === cat)?.count === 0 }
                        />
                        <Label
                            htmlFor={ cat }
                            className={ `flex-1 rounded-md border-2 px-4 py-2 text-center transition-colors hover:bg-primary/10 ${selectedCategories.includes(cat)
                                ? "border-primary bg-primary/20 text-primary"
                                : "border-input"
                                }` }
                        >
                            { cat }

                            <span className="text-sm text-muted-foreground">({ categoryData.find((c) => c.category === cat)?.count })</span>

                        </Label>
                    </div>
                )) }
            </div>
        </div>
    );
};

export default CategorySelector;
