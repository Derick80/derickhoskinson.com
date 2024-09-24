import { MDXFrontMatter } from "@/lib/types";

// list all of the blogs as a list / card
type BlogListProps = {
  posts: MDXFrontMatter[];
};

const BlogList = ({ posts }: BlogListProps) => {
  if (!posts) {
    throw new Error("No posts found");
  }

  return (
    <div>
      {posts.map((post) => (
        <div key={post.slug}>
          <h1>{post.title}</h1>
          <p>{post.author}</p>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
