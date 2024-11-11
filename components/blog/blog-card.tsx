import Image from "next/image";
import { MDXFrontMatter } from "@/lib/types";
import { CalendarIcon, ClockIcon, UserIcon } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
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
    <Card className="overflow-hidden">
      <div className="grid h-full md:grid-cols-[2fr_3fr]">
        <div className="relative h-48 w-full md:h-full">
          { imageUrl && (
            <Image
              src={ imageUrl }
              alt={ title }
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              priority
              className="object-cover object-center"
            />
          ) }
        </div>
        <CardContent className="flex flex-col justify-between p-4 md:p-6">
          <div>
            <div className="mb-2 flex flex-wrap gap-2">
              { categories.map((category) => (
                <Badge key={ category } variant="secondary">
                  { category }
                </Badge>
              )) }
            </div>
            <h2 className="mb-2 text-2xl font-bold">
              <Link href={ `/blog/${slug}` } className="hover:underline">
                { title }
              </Link>
            </h2>
            <p className="mb-4 text-muted-foreground">{ description }</p>
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <UserIcon className="mr-1 h-4 w-4" />
              { author }
            </div>
            <div className="flex items-center">
              <CalendarIcon className="mr-1 h-4 w-4" />
              { date }
            </div>
            <div className="flex items-center">
              <ClockIcon className="mr-1 h-4 w-4" />
              { readingTime }
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
