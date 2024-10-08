import {
  getAllPosts,
} from "./actions/mdx-server";
import type { Metadata } from "next";
import BlogList from "@/components/blog/blog-list";
import CategorySelector from "./_components/categories/category-container";
import { Suspense } from "react";
import LandingAbout from "@/components/shared/landing-about";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import ContactForm from './_components/about/contact-form';
import PageOverLayBar from '@/components/shared/page-overlay-bar';

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
    "tufts genetics phd",
  ],
};

export default async function Home ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const categoriesParam = searchParams.categories;

  const categories =
    typeof categoriesParam === "string"
      ? categoriesParam.split(",")
      : categoriesParam || [];

  const allPosts = await getAllPosts(categories);
  return (
    <div
      id="home"
      className="flex min-h-screen flex-col py-2">
      <LandingAbout />
      {/* <CategoryBadges posts={ allPosts } /> */ }
      <CategorySelector posts={ allPosts } />
      <Suspense fallback={ <p>Loading results...</p> }>
        <div className="prose prose-neutral mt-4 flex min-w-full flex-col justify-center gap-4 dark:prose-invert prose-a:no-underline">
          <BlogList categories={ categories } />
        </div>
      </Suspense>
      <div
        id="contact"
        className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold tracking-tighter">Get in Touch</h2>
        <Card>
          <CardHeader>
            <CardTitle>Contact Me</CardTitle>
            <CardDescription>I&apos;d love to hear from you!</CardDescription>
          </CardHeader>
          <CardContent>
            <ContactForm />
          </CardContent>
        </Card>
      </div>
      <PageOverLayBar
        sectionIds={ ["home", "Introduction", "category-filter", "contact"] }

      />
    </div>
  );
}
