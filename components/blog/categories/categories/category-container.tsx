'use client'
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Label } from '@/components/ui/label'
import { MdxCompiled } from '@/lib/types'

type CategorySelectorProps = {
    posts: MdxCompiled[]
}
const CategorySelector = ({ posts }: CategorySelectorProps) => {
    const categories = posts.flatMap((post) => post.categories)
    const uniqueCategories = [...new Set(categories)]
    const categorySummary = uniqueCategories.map((category) => ({
        category: category,
        selected: false,
        count: posts.filter((post) => post.categories.includes(category))
            .length,
        selectedCount: posts.filter((post) =>
            post.categories.includes(category)
        ).length
    }))

    // Convert categories to objects with category name and selection status
    const [categoryData, setCategoryData] = React.useState(
        categorySummary.map((cat) => ({
            category: cat.category,
            selected: cat.selected,
            count: cat.count,
            selectedCount: cat.selectedCount
        }))
    )

    const router = useRouter()
    const searchParams = useSearchParams()

    // Toggle category selection
    const toggleCategory = (categoryId: string) => {
        const updatedCategories = categoryData.map((cat) =>
            cat.category === categoryId
                ? {
                      ...cat,
                      selected: !cat.selected,
                      selectedCount: posts.filter((post) =>
                          post.categories.includes(cat.category)
                      ).length
                  }
                : cat
        )
        setCategoryData(updatedCategories)
        updateURLParams(updatedCategories)
    }

    const updateURLParams = (
        categories: { category: string; selected: boolean }[]
    ) => {
        const selectedCategories = categories
            .filter((cat) => cat.selected)
            .map((cat) => cat.category)

        const params = new URLSearchParams(searchParams.toString())
        if (selectedCategories.length > 0) {
            params.set('categories', selectedCategories.join(','))
        } else {
            params.delete('categories')
        }
        router.push(`?${params.toString()}`, { scroll: false })
    }

    // Initialize selected categories from URL params on mount
    React.useEffect(() => {
        const urlCategories = searchParams.get('categories')?.split(',') || []
        const updatedCategories = categoryData.map((cat) => ({
            ...cat,
            selected: urlCategories.includes(cat.category),
            selectedCount: posts.filter((post) =>
                post.categories.includes(cat.category)
            ).length
        }))
        setCategoryData(updatedCategories)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchParams])

    return (
        <div id='category-filter' className='space-y-4'>
            <h2 className='text-lg font-semibold'>Select Categories</h2>
            <div className='relative flex flex-wrap gap-2'>
                {categoryData.map((cat) => (
                    <Label
                        key={cat.category}
                        htmlFor={cat.category}
                        className={`flex flex-row items-center justify-between rounded-lg border-2 px-1 py-1 transition-colors hover:bg-primary/10 ${cat.selected ? 'border-primary bg-primary/20 text-primary' : 'border-input'} `}
                    >
                        <input
                            type='checkbox'
                            key={cat.category}
                            id={cat.category}
                            checked={cat.selected}
                            onChange={() => toggleCategory(cat.category)}
                            className='sr-only'
                            disabled={cat.selectedCount === 0}
                        />

                        <span className='jusityf-between flex items-center'>
                            {cat.category}
                        </span>
                    </Label>
                ))}
            </div>
        </div>
    )
}

export default CategorySelector
