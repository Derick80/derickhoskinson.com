"use server";
import path from "path";
import fs from "fs";
import readingTime from "reading-time";
import { createHighlighter } from "shiki";
import { cn } from "@/lib/utils";
import { frontMatterSchema, MDXFrontMatter } from "@/lib/types";

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

export const CodeBlock = async ({ code }: { code: string }) => {
  const out = (await highlighter).codeToHtml(code, {
    lang: "typescript",
    theme: "nord",
  });

  return <div dangerouslySetInnerHTML={{ __html: out }} />;
};

const POSTS_FOLTER = path.join(process.cwd(), "app/blog/content");

// Write a function to get all front matter and content

export const getAllPosts = async (): Promise<MDXFrontMatter[]> => {
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
  return metadata;
};
