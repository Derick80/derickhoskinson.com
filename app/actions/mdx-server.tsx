"use server";
import path from "path";
import fs from "fs";
import { CategoryFilterType, MDXFrontMatter } from "@/lib/types";
import readingTime from "reading-time";
import { createHighlighter } from "shiki";
import { DetailedHTMLProps, HTMLAttributes } from "react";

/* Parsing front matter */

const parseTheFrontmatter = (fileContent: string) => {
    // extract the front matter from the content
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    // look for matches in the content
    const match = frontmatterRegex.exec(fileContent);
    // trim content
    const content = fileContent.replace(frontmatterRegex, "").trim();
    // if ther eis a match return the front matter
    const frontMatterblock = match![1];
    // split the front matter into an array of lines
    const frontMatterLines = frontMatterblock.trim().split("\n");
    // create an object to store the front matter
    const metadata: Partial<MDXFrontMatter> = {};
    // Wrangle the categories line in the front matter and remove []
    const categories = frontMatterLines
        .find((line) => line.includes("categories"))
        ?.split(": ")[1]
        .replace("[", "")
        .replace("]", "")
        .split(", ");

    frontMatterLines.pop();
    // loop through the front matter lines
    frontMatterLines.forEach((line) => {
        // split each line into key and value
        const [key, ...valueArr] = line.split(": ");
        let value = valueArr.join(": ").trim();

        // remove quotes from the value
        value = value.replace(/^['"](.*)['"]$/, "$1");
        // store the key and value in the front matter object
        // what if metadata is undefined?
        const keyName = key as keyof MDXFrontMatter;
        metadata[keyName] = value as any;
    });

    const slug = metadata.title?.replace(/\s+/gu, "-").toLowerCase();

    // create the readingTime and wordCount properties
    metadata.slug = slug;
    metadata.readingTime = readingTime(content).text;
    metadata.wordCount = content.split(/\s+/gu).length;
    // wrangle the categories line in the front matter.  Make sure it's a single array
    metadata.categories = categories || [];
    return {
        metadata: metadata as MDXFrontMatter,
        content,
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
    highlighter.then((h) => h.dispose());
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

const POSTS_FOLTER = path.join(process.cwd(), "app/blog/content");

// Write a function to get all front matter and content

const getAllBlogPosts = async () => {
    const files = fs
        .readdirSync(POSTS_FOLTER)
        .filter((file) => path.extname(file) === ".mdx");
    return files.map((file) => {
        const { metadata, content } = parseTheFrontmatter(
            fs.readFileSync(path.join(POSTS_FOLTER, file), "utf-8"),
        );
        return {
            ...metadata,
            content,
        };
    });
};


const getSlugsAndCategories = async () => {
    const posts = await getAllBlogPosts();
    const myData = transformArray({ posts });
    return myData;

};



const transformArray = ({ posts }: {
    posts: MDXFrontMatter[];
}) => {
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
}




// return {
//     Coding: { related: ['slug1', 'slug2'], categoryCount: 2 },
//     ' Documentation': { related: ['slug1', 'slug2'], categoryCount: 2 },
//     ' Testing': { related: ['slug1'], categoryCount: 1 }
// }

// [
//     {
//         category: 'Coding',
//         related: ['first-post', 'second-post'],
//         categoryCount: 2
//     },
//     {
//         category: ' Documentation',
//         related: ['first-post', 'second-post'],
//         categoryCount: 2
//     },
//     {
//         category: ' Testing',
//         related: ['second-post'],
//         categoryCount: 1
//     }
// ] data from categories container



const getFilteredPosts = async ({
    searchParams
}: {
    searchParams?: { category: string }
}) => {
    console.log(searchParams, 'searchParams');

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
    }
    );
};



export {
    getAllBlogPosts,
    CodeBlock,
    MDXPre,
    TableComponent,
    getSlugsAndCategories,
    getFilteredPosts
};