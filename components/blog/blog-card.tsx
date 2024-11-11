import Image from "next/image";
import { MDXFrontMatter } from "@/lib/types";
import {
  Bookmark,
  CalendarIcon,
  ClockIcon,
  Heart,
  MessageCircle,
  UserIcon,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { SharePostButton } from './share-button';
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
    content,
    slug,
    imageUrl,
  } = props;

  return (
    <div className="mx-auto max-w-2xl w-full">
      <Card className="flex flex-col">
        <CardContent className="flex-grow p-4">
          <div className="mb-4 flex flex-wrap gap-2">
            { categories.map((category) => (
              <Badge key={ category } variant="secondary">
                { category }
              </Badge>
            )) }
          </div>
          <div className="flex gap-2 items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar
                className="h-8 w-8"
              >
                <AvatarImage

                  src="https://res.cloudinary.com/dch-photo/image/upload/v1729226218/blog_testing_24/derick.jpg"
                  alt={
                    author
                  }
                />
                <AvatarFallback>
                  NL
                </AvatarFallback>
              </Avatar>
              <div
                className="flex flex-col space-y-1"
              >
                <p className="text-sm font-medium">{ author }</p>
                <p className="text-xs text-muted-foreground">{ date }</p>
              </div>
            </div>
            <div className="text-right text-xs text-muted-foreground">
              { wordCount } words · { readingTime }
            </div>
          </div>
          <h2 className="mb-2 mt-2 text-2xl font-bold border-none  pb-0">{ title }</h2>
          <p className="mb-4 text-muted-foreground">{ description }</p>
          <Button
            variant="outline"
            size="sm"
            asChild
            className="mt-auto">
            <a href={ `/blog/${slug}` }>Read More</a>
          </Button>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-2">
          <Button
            variant="ghost"
            size="sm"

            className="flex items-center space-x-1"
          >
            <Heart
              className={ `h-5 w-5 ${1 > 0 ? "fill-red-500 text-red-500" : ""}` }
            />
            <span>{ 4 }</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <MessageCircle className="h-5 w-5" />
            <span>{ 6 }</span>
          </Button>
          <Button variant="ghost" size="sm"
          >
            <Bookmark className={ `h-5 w-5 ${1 ? "fill-current" : ""}` } />
          </Button>
          <SharePostButton id={ slug } />
        </CardFooter>
      </Card>
    </div>
  );
};

{
  /* <div className="mb-2 flex flex-wrap gap-2">
  { categories.map((category) => (
    <Badge key={ category } variant="secondary">
      { category }
    </Badge>
  )) }
</div> */
}
