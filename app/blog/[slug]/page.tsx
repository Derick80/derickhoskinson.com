import { CodeBlock, getAllPosts } from "@/app/actions/mdx-server";
import { MDXRemote } from "next-mdx-remote/rsc";
import { z } from "zod";
import remarkGfm from "remark-gfm";
import Image, { ImageProps } from "next/image";
import { cn } from "@/lib/utils";
import { DetailedHTMLProps, HTMLAttributes, Suspense } from "react";
import { Callout, MDXPre } from "@/components/mdx/sync-functions";
import { blogPostSchema } from "@/lib/types";

import CldImage from '@/components/shared/client-cloudinary';

export async function generateStaticParams () {
  const posts = await getAllPosts();
  return posts.map((post) => ({ params: { slug: post.slug } }));
}
export default async function BlogPost (props: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const params = await props.params;
  const { slug } = blogPostSchema.parse(params);
  if (!slug) {
    throw new Error("No slug provided");
  }

  const post = await getAllPosts().then((posts) => {
    return posts.find((post) => post.slug === slug);
  });

  if (!post) {
    throw new Error("No post found");
  }

  return (
    <Suspense fallback={ <>Loading...</> }>
      <div className="prose prose-neutral min-w-full p-4 dark:prose-invert prose-a:no-underline">
        <MDXRemote
          source={ post.content }
          components={ {
            pre: (props) => (
              <MDXPre className="bg-content1 max-h-[400px]">
                { props.children }
              </MDXPre>
            ),
            Callout,
            code: (props) => <CodeBlock code={ String(props.children) } />,
            // img: ({
            //   className,
            //   alt,
            //   ...props
            // }: React.ImgHTMLAttributes<HTMLImageElement>) => (
            //   // eslint-disable-next-line @next/next/no-img-element
            //   <img
            //     className={cn("rounded-md border", className)}
            //     alt={alt}
            //     {...props}
            //   />
            // ),
            // Image: (props: ImageProps) => <Image {...props} alt="blog image" />,
            Image: ({ src, ...props }: ImageProps) => (
              <CldImage src={ String(src) } { ...props } alt="blog image" />
            ),
          } }
          options={ {
            mdxOptions: {
              remarkPlugins: [remarkGfm],
            },
          } }
        />
      </div>
    </Suspense>
  );
}
