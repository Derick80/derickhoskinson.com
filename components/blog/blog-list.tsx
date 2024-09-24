import { MDXFrontMatter } from "@/lib/types";
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter
} from '../ui/card';
import { Car } from 'lucide-react';

// list all of the blogs as a list / card
type BlogListProps = {
  posts: MDXFrontMatter[];
  searchParams?: {
    category: string;
  };

};

const BlogList = ({ posts, searchParams }: BlogListProps) => {
  if (!posts) {
    throw new Error("No posts found");
  }


  return (
    <article
      className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      data-testid="blog-list"
    >
      { posts.map((post) => (
        <Card
          key={ post.slug }
        >
          <CardHeader>
            <CardTitle>
              <Link
                href={ `/blog/${post.slug}` }
              >
                { post.title }
              </Link>

            </CardTitle>

          </CardHeader>
          <CardContent>
            <Link href={ `/blog/${post.slug}` }>
              Read more
            </Link>
          </CardContent>
          <CardFooter>
            <Car size={ 24 } />
            <span>{ post.date }</span>
          </CardFooter>
        </Card>
      )) }
    </article>
  );
};

export default BlogList;

