'use client'
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearchParams } from 'next/navigation';
import React from 'react';

type initialCategories = {
    category: string,
    related: string[],
    categoryCount: number
    selected?: boolean
}[]

const CategorySelect = ({
    categories
}: {
    categories: {
        category: string,
        related: string[],
        categoryCount: number
        selected?: boolean
    }[]
}) => {
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])


    const handleCategorySelect = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category))
        } else {
            setSelectedCategories([...selectedCategories, category])
        }
    }


    return (

        <>
            {

                categories.map((cat, index) => (
                    <

                        >
                        <Button
                            type="button"
                            className={ `${selectedCategories.includes(cat.category) ? 'underline bg-purple-500' : ''}  m-1` }
                            key={ cat.category }
                            name="category"
                            id="category"
                            value={ cat.category }
                            onClick={ () => {
                                handleCategorySelect(cat.category)
                            }
                            }




                        >
                            { cat.category }
                            {
                                cat.categoryCount && (
                                    <span
                                        className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-foreground bg-primary rounded-full">
                                        { cat.categoryCount }
                                    </span>
                                )
                            }
                        </Button>

                    </>
                ))
            }
        </>

    )
}

export default CategorySelect;