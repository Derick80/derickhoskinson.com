import React from "react";
import { Button } from "../ui/button";
import { Tag as PrismaTag, Entry as PrismaEntry } from "@prisma/client";
import { Badge } from "../ui/badge";
export type Tag = PrismaTag & { relatedEntries: Entry[] };

export interface Entry extends PrismaEntry {
  tags: Tag[];
}

interface CategoryFilterProps {
  tags: Tag[];
  entries: Entry[];
  showCounts?: boolean;
  onFilterChange: (filteredPosts: Entry[]) => void;
}

const CategoryFilter = ({
  tags,
  entries,
  showCounts = true,
  onFilterChange,
}: CategoryFilterProps) => {
  const [selectedTags, setSelectedTags] = React.useState<string[]>([]);

  const handleTagClick = (tag: string) => {
    const newSelectedTags = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];

    setSelectedTags(newSelectedTags);

    if (newSelectedTags.length === 0) {
      onFilterChange(entries);
    } else {
      const filteredPosts = entries.filter((post) =>
        newSelectedTags.some((tag) => post.tags.some((t) => t.title === tag)),
      );
      onFilterChange(filteredPosts);
    }
  };

  const filteredEntries =
    selectedTags.length === 0
      ? entries
      : entries.filter((post) =>
        selectedTags.some((tag) => post.tags.some((t) => t.title === tag)),
      );

  const tagCounts = filteredEntries.reduce(
    (acc, post) => {
      post.tags.forEach((tag) => {
        acc[tag.title] = acc[tag.title] ? acc[tag.title] + 1 : 1;
      });
      return acc;
    },
    {} as Record<string, number>,
  );
  console.log(tagCounts);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        { tags.map((tag) => (
          <Badge
            key={ tag.title }
            variant={ selectedTags.includes(tag.title) ? "default" : "secondary" }
            className="relative cursor-pointer px-3 py-1"
            onClick={ () => handleTagClick(tag.title) }
          >
            { tag.title }
            { showCounts && (
              <span
                className={ `} absolute bottom-0 right-0 -mb-1 -mr-1 flex h-4 w-4 items-center justify-center rounded-full` }
              >
                { tag.relatedEntries.length }
              </span>
            ) }
          </Badge>
        )) }
      </div>
    </div>
  );
};

export default CategoryFilter;
