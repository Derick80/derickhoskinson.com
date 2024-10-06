"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const CategorySelect = ({ categories }: { categories: string[] }) => {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>(
        [],
    );
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const handleCategorySelect = (category: string) => {
        //    update the search params and the selected categories
        const params = new URLSearchParams(searchParams.toString());
        if (selectedCategories.includes(category)) {
            params.delete("category");
            setSelectedCategories(
                selectedCategories.filter((cat) => cat !== category),
            );
            router.push(pathname + "?" + params.toString());
        } else {
            params.append("category", category);
            setSelectedCategories([...selectedCategories, category]);
            return params.toString();
        }
    };

    return (
        <div className="flex flex-wrap p-2">
            { categories.map((cat, index) => (
                <div
                    key={ index }
                >
                    <Button
                        type="button"
                        variant="outline"
                        className={ `${selectedCategories.includes(cat) ? "bg-purple-500 underline" : ""} relative m-1` }

                        name="category"
                        id="category"
                        value={ cat }
                        onClick={ () => {
                            router.push(pathname + "?" + handleCategorySelect(cat));
                        } }
                    >
                        { cat }
                    </Button>
                </div>
            )) }
        </div>
    );
};

export default CategorySelect;
