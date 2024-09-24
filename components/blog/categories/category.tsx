'use client'
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
import { ExternalLinkIcon, KeyRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React from "react";
import { useFormState } from 'react-dom';

const Category = ({
  data,
  activeCategories,
  setActiveCategories
}: {
  data: CategoryFilterType[]
  activeCategories: string[];
  setActiveCategories: (categories: string[]) => void;

}) => {



  return (
    <>
      {
        data.map((category, index) => (
          <div
            key={ index }
          >

            <Input
              key={ category.category }
              type="checkbox"
              className="absolute -left-[99999px] opacity-0"
              id={ category.category }
              name="category"
              value={ category.category }
              defaultChecked={ activeCategories.includes(category.category) }

              onChange={
                (e) => {
                  const { value } = e.target;
                  const newCategories = selectedCategories.includes(value)
                    ? selectedCategories.filter((category) => category !== value)
                    : [...selectedCategories, value];
                  const newSearchParams = {
                    ...searchParams,
                    categories: newCategories.join(','),
                  };
                  window.location.search = new URLSearchParams(newSearchParams as any).toString();

                  setActiveCategories(newCategories);
                }

              }

            />
            <Label htmlFor={ category.category }
              className={ `relative inline-block cursor-pointer border text-base font-semibold p-1 rounded-sm hover:bg-primary-foreground/80 ${selectedCategories.includes(category.category) ? "" : ""}` }

            >{ category.category }
              <CategoryDropdown count={ category.categoryCount } related={ category.related } />
            </Label>
          </div>
        ))
      }

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
      <DropdownMenuTrigger>
        { count ? <span className="ml-1 text-sm">{ count }</span> : null }

      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Related Posts</DropdownMenuLabel>
        <DropdownMenuItem className="flex flex-col items-start gap-1">
          { related.map((rel) => (
            <Link
              key={ rel }
              href={ `/blog/${rel}` }
              className="flex items-center justify-between gap-1"
            >
              { rel }
              <ExternalLinkIcon />
            </Link>
          )) }
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
