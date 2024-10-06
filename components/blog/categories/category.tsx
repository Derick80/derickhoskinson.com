import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CategoryFilterType, MDXFrontMatter } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";

const Category = ({
  categories,
  onCategorySelect,
  selectedCategories,
}: {
  categories: CategoryFilterType;
  onCategorySelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  selectedCategories: string[];
}) => {
  const { category, related, categoryCount } = categories;

  const isSelected = (category: string) => {
    return selectedCategories.includes(category);
  };

  return (
    <div className="relative m-1 inline-block">
      {" "}
      {onCategorySelect && (
        <Input
          type="checkbox"
          name="category"
          onChange={onCategorySelect}
          className="sr-only"
          id={category}
          value={category}
          checked={isSelected(category)}
        />
      )}
      <Label
        className={cn(
          "inline-flex cursor-pointer items-center rounded-full px-3 py-1 transition-colors",
          "border border-primary hover:bg-primary/70 hover:text-primary-foreground",
          isSelected(category)
            ? "bg-primary text-primary-foreground"
            : "bg-background text-foreground",
        )}
        htmlFor={category}
      >
        {category}
        <CategoryCount {...categories} />
      </Label>
    </div>
  );
};

export default Category;

const CategoryCount = (props: CategoryFilterType) => {
  const { related, categoryCount } = props;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Badge variant="secondary" className="ml-2 cursor-pointer">
          {categoryCount}
        </Badge>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem className="flex flex-col gap-2 p-2">
          {related.map((rel) => (
            <Link key={rel} href={`/blog/${rel}`} className="w-full">
              {rel}
            </Link>
          ))}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
