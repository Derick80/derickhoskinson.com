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

export default async function Home({
  searchParams,
}: {
  searchParams: { category: string };
}) {
  const allPosts = await getAllBlogPosts();
  if (!allPosts) return null;

  const filteredPosts = allPosts.filter((post) => {
    return searchParams.category
      ? post.categories.includes(searchParams.category)
      : true;
  });

  console.log(filteredPosts.length, "filteredPosts");
  const postcategories = allPosts.flatMap((post) => post.categories);
  const uniqueCategories = [...new Set(postcategories)];
  console.log(uniqueCategories, "uniqueCategories");
  const categoriesMap = await getSlugsAndCategories();
  if (!categoriesMap) return null;

  return (
    <div className="mt-10 flex min-h-screen flex-col items-center py-2">
      <div className="flex flex-wrap">
        <CategoryContainer params={searchParams} />

        {filteredPosts.map((post) => (
          <BlogCard key={post.slug} {...post} />
        ))}
      </div>
    </div>
  );
}
