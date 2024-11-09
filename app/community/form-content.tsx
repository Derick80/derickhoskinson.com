"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

interface ForumPost {
  id: string;
  title: string;
  content: string;
  tags: { id: string; title: string }[];
}

interface Tag {
  id: string;
  title: string;
  description: string | null;
  _count: { forumPosts: number };
}

interface TagProps {
  title: string;
  count: number;
  isSelected: boolean;
  onClick: () => void;
}

function Tag({ title, count, isSelected, onClick }: TagProps) {
  return (
    <Badge
      variant={isSelected ? "default" : "secondary"}
      className="relative cursor-pointer px-3 py-1"
      onClick={onClick}
    >
      {title}
      <span
        className={`} absolute bottom-0 right-0 -mb-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full`}
      >
        {count}
      </span>
    </Badge>
  );
}

export default function ForumContent({
  initialPosts,
  initialTags,
}: {
  initialPosts: ForumPost[];
  initialTags: Tag[];
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const toggleTag = (tagName: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagName)
        ? prev.filter((t) => t !== tagName)
        : [...prev, tagName],
    );
  };

  const filteredPosts =
    selectedTags.length > 0
      ? initialPosts.filter((post) =>
          post.tags.some((tag) => selectedTags.includes(tag.title)),
        )
      : initialPosts;

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Tags</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {initialTags.map((tag) => (
              <Tag
                key={tag.id}
                title={tag.title}
                count={tag._count.forumPosts}
                isSelected={selectedTags.includes(tag.title)}
                onClick={() => toggleTag(tag.title)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
      <Card className="md:col-span-2">
        <CardHeader>
          <CardTitle>Posts {filteredPosts.length}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <div key={post.id} className="rounded-lg bg-muted p-4">
                <h3 className="mb-2 text-lg font-semibold">{post.title}</h3>
                <p className="mb-2">{post.content}</p>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag.id} variant="outline">
                      {tag.title}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
