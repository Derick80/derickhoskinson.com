import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ShareIcon, MessageCircleIcon } from "lucide-react";
import { MDXFrontMatter } from "@/lib/types";
import { Badge } from "../ui/badge";
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
    <article
      className='border-2'

    >
      <div
        className="flex flex-col gap-5 md:flex-row overflow-hidden"
      >
        <div
          id='blog-card-image'
          className="flex relative h-auto w-full md:h-80 md:w-72 pb-3 pl-0 pr-3 pt-0 transition-all ease-in-out hover:pb-2 hover:pl-1 hover:pr-2 hover:pt-1"
        >
          {
            imageUrl && (
              <Image
                src={ imageUrl }
                alt={ title }
                width={ 500 }
                height={ 300 }
                className="aspect-video h-full w-full rounded-xl object-cover object-cenkkter shadow-2xl"
                priority
              />
            )
          }
        </div>
        <div
          className="flex flex-col justify-between spac4">
          <div
            className="text-2xl font-bold">
            { title }
          </div>
        </div>
      </div>
    </article>
  );
};
