import { BlogCard } from "@/components/blog/blog-card";
import CategorySelect from "./_components/categories/custom-checkbox";
import { getAllBlogPosts, getSlugsAndCategories } from "./actions/mdx-server";
import type { Metadata } from "next";
import CategoryContainer from "./_components/categories/category-container";

export const metadata: Metadata = {
  title: "Dr. Hoskinson's Blog",
  description: "A personal web app for Dr. Hoskinson",
  keywords: [
    "clinical genetics",
    "genetics phd",
    "acmg",
    "variant classification",
    "somatic",
    "germline",
    "tufts genetids phd",
  ],
};

export default async function Home ({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const allPosts = await getAllBlogPosts();
  if (!allPosts) return null;
  // sort the posts by date
  const sortedPosts = allPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const filteredPosts = sortedPosts.filter((post) => {
    return searchParams.category
      ? post.categories.includes(searchParams.category)
      : true;
  });

  const postcategories = allPosts.flatMap((post) => post.categories);
  const uniqueCategories = [...new Set(postcategories)];
  console.log(uniqueCategories, "uniqueCategories");
  const categoriesMap = await getSlugsAndCategories();
  if (!categoriesMap) return null;

  return (
    <div className="flex min-h-screen flex-col py-2">
      <CategoryContainer params={ searchParams } />
      <div
        className="prose mt-4 flex min-w-full flex-col justify-center gap-4 dark:prose-invert prose-a:no-underline">
        { filteredPosts.map((post) => (
          <BlogCard key={ post.slug } { ...post } />
        )) }
      </div>
    </div>
  );
}
