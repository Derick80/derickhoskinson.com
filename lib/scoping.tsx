// to scope new components

import { format } from "date-fns";
import { Heart, Bookmark, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export default function BlogPreviewNoImage() {
  const fakePreview = {
    title: "10 Essential Tips for Mastering React Hooks",
    createdAt: "2023-06-15T09:00:00Z",
    author: {
      name: "Jane Developer",
      image: "/placeholder.svg?height=40&width=40",
    },
    description:
      "Unlock the full potential of React Hooks with these game-changing tips. Learn how to write cleaner, more efficient code and take your React skills to the next level.",
    wordCount: 1500,
    readingTime: 8,
    categories: ["React", "JavaScript", "Web Development"],
    slug: "10-essential-tips-for-mastering-react-hooks",
    likes: 42,
    saved: false,
    commentCount: 15,
  };

  const handleLike = () => {
    console.log("Liked post:", fakePreview.slug);
  };

  const handleSave = () => {
    console.log("Saved post:", fakePreview.slug);
  };

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="flex flex-col">
        <CardContent className="flex-grow p-6">
          <div className="mb-4 flex flex-wrap gap-2">
            {fakePreview.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {category}
              </Badge>
            ))}
          </div>
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Avatar>
                <AvatarImage
                  src={fakePreview.author.image}
                  alt={fakePreview.author.name}
                />
                <AvatarFallback>
                  {fakePreview.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium">{fakePreview.author.name}</p>
                <p className="text-xs text-gray-500">
                  {format(new Date(fakePreview.createdAt), "MMMM d, yyyy")}
                </p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {fakePreview.wordCount} words · {fakePreview.readingTime} min read
            </div>
          </div>
          <h2 className="mb-2 text-2xl font-bold">{fakePreview.title}</h2>
          <p className="mb-4 text-gray-600">{fakePreview.description}</p>
          <Button variant="outline" asChild className="mt-auto">
            <a href={`/blog/${fakePreview.slug}`}>Read More</a>
          </Button>
        </CardContent>
        <CardFooter className="flex items-center justify-between border-t p-6">
          <div className="flex space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              className="flex items-center space-x-1"
            >
              <Heart
                className={`h-5 w-5 ${fakePreview.likes > 0 ? "fill-red-500 text-red-500" : ""}`}
              />
              <span>{fakePreview.likes}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-1"
            >
              <MessageCircle className="h-5 w-5" />
              <span>{fakePreview.commentCount}</span>
            </Button>
          </div>
          <Button variant="ghost" size="sm" onClick={handleSave}>
            <Bookmark
              className={`h-5 w-5 ${fakePreview.saved ? "fill-current" : ""}`}
            />
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
