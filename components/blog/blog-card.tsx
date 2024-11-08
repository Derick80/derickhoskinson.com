import Image from "next/image";
import { MDXFrontMatter } from "@/lib/types";
import { CalendarIcon, ClockIcon, UserIcon } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import Link from 'next/link';
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
      <div className="grid md:grid-cols-[2fr_3fr] h-full">
        <div className="relative w-full h-48 md:h-full">
          <Image
            src={ imageUrl }
            alt={ title }
            fill
            sizes="(max-width: 768px) 100vw, 40vw"
            priority
            className="object-cover object-center"
          />
        </div>
        <CardContent className="p-4 md:p-6 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap gap-2 mb-2">
              { categories.map((category) => (
                <Badge key={ category } variant="secondary">
                  { category }
                </Badge>
              )) }
            </div>
            <h2 className="text-2xl font-bold mb-2">
              <Link href={ `/blog/${slug}` } className="hover:underline">
                { title }
              </Link>
            </h2>
            <p className="text-muted-foreground mb-4">{ description }</p>
          </div>
          <div className="flex flex-wrap items-center text-sm text-muted-foreground gap-4">
            <div className="flex items-center">
              <UserIcon className="w-4 h-4 mr-1" />
              { author }
            </div>
            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              { date }
            </div>
            <div className="flex items-center">
              <ClockIcon className="w-4 h-4 mr-1" />
              { readingTime }
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
