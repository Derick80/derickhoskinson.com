import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFilterType } from "@/lib/types";
import { ExternalLinkIcon } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";

const Category = ({
  data,
  onCategorySelect,
  activeCategories,
}: {
  data: CategoryFilterType;
  activeCategories: string[];
  onCategorySelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  const searchParams = useSearchParams();

  const isActive = activeCategories.includes(data.category);

  data.category = data.category.replace(/-/g, " ");
  return (
    <>
      {onCategorySelect && (
        <Input
          type="checkbox"
          checked={activeCategories.includes(data.category)}
          onChange={onCategorySelect}
          className="absolute -left-[99999px] opacity-0"
          id={`cat-${data.category}`}
          value={data.category}
        />
      )}
      <Label
        className={`flex cursor-pointer items-center gap-1 ${isActive ? "text-4xl" : "text-content1"}`}
        htmlFor={data.category && `cat-${data.category}`}
      >
        <Badge
          variant="outline"
          className={`text-content1 ${isActive ? "bg-red-500" : "bg-content2"}`}
        >
          {data.category}
        </Badge>

        <CategoryDropdown count={data.categoryCount} related={data.related} />
      </Label>
    </>
  );
};

export default Category;

const CategoryDropdown = ({
  count,
  related,
}: {
  count: number;
  related: string[];
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="border text-sm">
        {count}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Related Posts</DropdownMenuLabel>
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          {related.map((rel) => (
            <Link
              key={rel}
              href={`/blog/${rel}`}
              className="flex items-center justify-between gap-1"
            >
              {rel}
              <ExternalLinkIcon />
            </Link>
          ))}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
