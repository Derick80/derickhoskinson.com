"use server";
import path from "path";
import fs from "fs";
import readingTime from "reading-time";
import { createHighlighter } from "shiki";
import { DetailedHTMLProps, HTMLAttributes } from "react";
import { z } from "zod";

const frontMatterSchema = z.object({
  title: z.string(),
  date: z.string(),
  author: z.string(),
  description: z.string(),
  imageUrl: z.string().optional(),
  published: z.boolean(),
  categories: z.array(z.string()),
  slug: z.string(),
  readingTime: z.string(),
  wordCount: z.number(),
  content: z.string(),
});
export type MDXFrontMatter = z.infer<typeof frontMatterSchema>;

/* Parsing front matter */

const parseTheFrontmatter = (fileContent: string) => {
  // extract the front matter from the content
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  // look for matches in the content
  const match = frontmatterRegex.exec(fileContent);
  // trim content
  const content = fileContent.replace(frontmatterRegex, "").trim();
  if (!match) {
    throw new Error("No front matter found in the file");
  }

  // if ther eis a match return the front matter
  const frontMatterblock = match![1];
  // split the front matter into an array of lines
  const frontMatterLines = frontMatterblock.trim().split("\n");
  // create an object to store the front matter
  const metadata: Partial<MDXFrontMatter> = {};
  // loop through the front matter lines
  frontMatterLines.forEach((line) => {
    // split each line into key and value
    const [key, ...valueArr] = line.split(": ");
    const value = valueArr.join(": ").trim();
    if (key === "categories") {
      metadata.categories = value
        .replace("[", "")
        .replace("]", "")
        .split(", ")
        .map((cat) => cat.trim());
    } else if (key === "published") {
      metadata.published = value === "true";
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (metadata as any)[key] = value;
    }
  });

  metadata.slug = metadata.title?.replace(/\s+/g, "-").toLowerCase();
  metadata.readingTime = readingTime(content).text;
  metadata.wordCount = content.split(/\s+/g).length;
  metadata.content = content;

  // Validate using Zod schema
  const parsedFrontMatter = frontMatterSchema.safeParse(metadata);

  if (!parsedFrontMatter.success) {
    throw new Error("Invalid front matter format");
  }

  return {
    metadata: parsedFrontMatter.data,
  };
};

// Create a code block component
const highlighter = createHighlighter({
  themes: ["nord"],
  langs: ["typescript"],
});
async function CodeBlock ({ code }: { code: string }) {
  const out = (await highlighter).codeToHtml(code, {
    lang: "typescript",
    theme: "nord",
  });

  return <div dangerouslySetInnerHTML={ { __html: out } } />;
}

const MDXPre = (
  MDXPreProps: DetailedHTMLProps<
    HTMLAttributes<HTMLPreElement>,
    HTMLPreElement
  >,
) => {
  const { children, ...rest } = MDXPreProps;

  return (
    <div className="group relative">
      <pre
        { ...rest }
        className="scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full my-7 w-full overflow-x-auto rounded-xl p-4 text-primary transition ease-in-out"
      >
        { children }
      </pre>
    </div>
  );
};

const TableComponent = ({ children }: { children: React.ReactNode }) => {
  return (
    <table className="not-prose bg-content1 rounded-large shadow-small my-10 h-auto w-full min-w-full table-auto overflow-auto">
      { children }
    </table>
  );
};
import { cn } from "@/lib/utils";

interface CalloutProps {
  icon?: string;
  children?: React.ReactNode;
  type?: "default" | "warning" | "danger";
}
const Callout = ({
  children,
  icon,
  type = "default",
  ...props
}: CalloutProps) => {
  return (
    <div
      className={ cn("my-6 flex items-start rounded-md border border-l-4 p-4", {
        "border-red-900 bg-red-50": type === "danger",
        "border-yellow-900 bg-yellow-50": type === "warning",
      }) }
      { ...props }
    >
      { icon && <span className="mr-4 text-2xl">{ icon }</span> }
      <div>{ children }</div>
    </div>
  );
};

const POSTS_FOLTER = path.join(process.cwd(), "app/blog/content");

// Write a function to get all front matter and content

const getAllBlogPosts = async () => {
  const files = fs
    .readdirSync(POSTS_FOLTER)
    .filter((file) => path.extname(file) === ".mdx");

  return files.map((file) => {
    const { metadata } = parseTheFrontmatter(
      fs.readFileSync(path.join(POSTS_FOLTER, file), "utf-8"),
    );
    return metadata;
  });
  // sort
};

const getAllPosts = async (category?: string[]): Promise<MDXFrontMatter[]> => {
  const selectedCategory = category;
  console.log(selectedCategory, "selectedCategory");
  //

  const files = fs
    .readdirSync(POSTS_FOLTER)
    .filter((file) => path.extname(file) === ".mdx");

  const metadata = files.map((file) => {
    const { metadata } = parseTheFrontmatter(
      fs.readFileSync(path.join(POSTS_FOLTER, file), "utf-8"),
    );
    // Modify the metadata here if needed
    return metadata;
  });

  // if there is a category filter the posts
  if (selectedCategory && selectedCategory.length > 0) {
    const filteredPosts = metadata.filter((post) =>
      selectedCategory.some((cat) => post.categories.includes(cat)),
    );
    return filteredPosts;
  }
  return metadata;
};

const getSlugsAndCategories = async () => {
  const posts = await getAllBlogPosts();
  const myData = transformArray({ posts });
  return myData;
};

const transformArray = ({ posts }: { posts: MDXFrontMatter[] }) => {
  const categories = posts.flatMap((post) => post.categories);
  const uniqueCategories = [...new Set(categories)];
  const myData = uniqueCategories.map((category) => {
    const related = posts
      .filter((post) => post.categories.includes(category))
      .map((post) => post.slug);
    return {
      category,
      related,
      categoryCount: related.length,
    };
  });
  return myData;
};

const getFilteredPosts = async ({
  searchParams,
}: {
  searchParams?: { category: string };
}) => {
  console.log(searchParams, "searchParams");

  const files = fs
    .readdirSync(POSTS_FOLTER)
    .filter((file) => path.extname(file) === ".mdx");
  return files.map((file) => {
    const metadata = parseTheFrontmatter(
      fs.readFileSync(path.join(POSTS_FOLTER, file), "utf-8"),
    );
    const post = metadata.metadata;
    //    if there is a search param filter the posts
    if (searchParams?.category) {
      return post.categories.includes(searchParams.category);
    }
    return post;
  });
};

export {
  getAllBlogPosts,
  CodeBlock,
  MDXPre,
  TableComponent,
  getSlugsAndCategories,
  getFilteredPosts,
  getAllPosts,
  Callout,
};
