import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { ShareIcon, MessageCircleIcon } from "lucide-react";
import { MDXFrontMatter } from "@/lib/types";
import { Badge } from "../ui/badge";

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
    <Card className="max-w-4xl overflow-hidden shadow-2xl">
      <div className="md:flex">
        <div className="md:flex-1">
          <CardHeader className="p-4 pb-0">
            <Link
              prefetch
              href={ `/blog/${slug}` }
              className="text-lg font-semibold hover:underline"
            >
              { title }
            </Link>
            <p className="mt-1 text-sm text-muted-foreground">
              { date } • { author }
            </p>
          </CardHeader>
          <CardContent className="p-4">
            <p className="italic text-muted-foreground">{ description }</p>
            <div className="mt-4 text-sm text-muted-foreground">
              <span>{ wordCount } words</span>
              <span className="mx-2">•</span>
              <span>{ readingTime } min read</span>
            </div>
          </CardContent>
        </div>
        <div className="md:flex md:w-1/3 md:items-center">
          { imageUrl ? (
            <Image
              src={ imageUrl }
              alt={ title }
              width={ 300 }
              height={ 200 }
              className="h-48 w-full object-cover md:h-full"
            />
          ) : (
            <Image
              src="/assets/images/placeholder-user.jpg"
              alt="Placeholder"
              width={ 300 }
              height={ 200 }
              className="h-48 w-full object-cover md:h-full"
            />
          ) }
        </div>
      </div>

      <CardFooter className="p-4">
        <div className="flex w-full flex-col justify-between gap-1 md:gap-2">
          <div className="flex flex-wrap gap-1 md:gap-2">
            { categories.map((category, index) => (
              <Badge
                variant="outline"
                key={ index }
                className="mr-2 hover:cursor-pointer hover:bg-accent"
              >
                <Link prefetch href={ `/blog/category/${category}` }>
                  { category }
                </Link>
              </Badge>
            )) }
          </div>

          <Separator className="my-2" />
          <div className="mt-2 flex items-center justify-between gap-4">
            <button className="flex items-center gap-1 text-sm">
              <ShareIcon className="h-4 w-4" />
              Share
            </button>
            <button className="flex items-center gap-1 text-sm">
              <MessageCircleIcon className="h-4 w-4" />
              Comment
            </button>
          </div>
          <Separator className="my-2" />
        </div>
      </CardFooter>
    </Card>
  );
};
