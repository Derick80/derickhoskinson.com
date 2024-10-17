import { getAllPosts } from "./actions/mdx-server";
import type { Metadata } from "next";
import BlogList from "@/components/blog/blog-list";
import CategorySelector from "../components/blog/categories/categories/category-container";
import { Suspense } from "react";
import LandingAbout from "@/components/shared/landing-about";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ContactForm from "../components/about/contact-form";
import PageOverLayBar from "@/components/shared/page-overlay-bar";

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
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
    }

  }
};

export default async function Home (
  props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
  }
) {
  const searchParams = await props.searchParams;
  const categoriesParam = searchParams.categories;

  const categories =
    typeof categoriesParam === "string"
      ? categoriesParam.split(",")
      : categoriesParam || [];

  const allPosts = await getAllPosts(categories);
  return (
    <div id="home" className="flex min-h-screen flex-col py-2">
      <LandingAbout />
      <div id="Introduction" className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold tracking-tighter">
          Welcome to my blog
        </h2>
        <p className="text-lg">
          This blog is a collection of thoughts and ideas on clinical genetics,
          variant classification, and other topics related to my work.
        </p>
      </div>
      {/* <CategoryBadges posts={ allPosts } /> */ }
      <CategorySelector posts={ allPosts } />
      <Suspense fallback={ <p>Loading results...</p> }>
        <div className="prose prose-neutral mt-4 flex min-w-full flex-col justify-center gap-4 dark:prose-invert prose-a:no-underline">
          <BlogList categories={ categories } />
        </div>
      </Suspense>
      <div id="contact" className="mt-12 space-y-6">
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
