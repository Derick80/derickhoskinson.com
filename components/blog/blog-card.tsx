import Image from "next/image";
import { MDXFrontMatter } from "@/lib/types";
// inspo https://www.leohuynh.dev/
export const BlogCard = (props: MDXFrontMatter) => {
  const {
    title,
    date,
    author,
    description,
    wordCount,
    readingTime,
    categories,
    slug,
    imageUrl,
  } = props;

  return (
    <article className="border-2">
      <div className="flex flex-col gap-5 overflow-hidden md:flex-row">
        <div
          id="blog-card-image"
          className="relative flex h-auto w-full pb-3 pl-0 pr-3 pt-0 transition-all ease-in-out hover:pb-2 hover:pl-1 hover:pr-2 hover:pt-1 md:h-80 md:w-72"
        >
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={title}
              width={500}
              height={300}
              className="object-cenkkter aspect-video h-full w-full rounded-xl object-cover shadow-2xl"
              priority
            />
          )}
        </div>
        <div className="spac4 flex flex-col justify-between">
          <div className="text-2xl font-bold">{title}</div>
        </div>
      </div>
    </article>
  );
};
