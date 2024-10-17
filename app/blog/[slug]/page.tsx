import {
  Callout,
  CodeBlock,
  getAllBlogPosts,
  getSlugsAndCategories,
  MDXPre,
} from "@/app/actions/mdx-server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { z } from "zod";
import remarkGfm from "remark-gfm";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
  const posts = await getAllBlogPosts();
  return posts.map((post) => ({ params: { slug: post.slug } }));
}
const blogPostSchema = z.object({
  slug: z.string(),
});
export type BlogPost = z.infer<typeof blogPostSchema>;

export default async function BlogPost(
  props0: {
    params: Promise<{
      slug: string;
    }>;
  }
) {
  const params = await props0.params;
  const { slug } = blogPostSchema.parse(params);
  if (!slug) {
    throw new Error("No slug provided");
  }

  const post = await getAllBlogPosts().then((posts) => {
    return posts.find((post) => post.slug === slug);
  });

  if (!post) {
    throw new Error("No post found");
  }

  const categories = await getSlugsAndCategories();
  if (!categories) {
    throw new Error("No data found");
  }

  return (
    (<div className="prose prose-neutral min-w-full p-4 dark:prose-invert prose-a:no-underline">
      <MDXRemote
        source={post.content}
        components={{
          pre: (props) => (
            <MDXPre className="bg-content1 max-h-[400px]">
              {props.children}
            </MDXPre>
          ),
          Callout,
          code: (props) => <CodeBlock code={String(props.children)} />,
          img: ({
            className,
            alt,
            ...props
          }: React.ImgHTMLAttributes<HTMLImageElement>) => (
            // eslint-disable-next-line @next/next/no-img-element
            (<img
              className={cn("rounded-md border", className)}
              alt={alt}
              {...props}
            />)
          ),
          Image: (props: ImageProps) => <Image {...props} alt="blog image" />,
        }}
        options={{
          mdxOptions: {
            remarkPlugins: [remarkGfm],
          },
        }}
      />
    </div>)
  );
}
