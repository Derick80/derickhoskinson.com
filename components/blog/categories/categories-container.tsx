'use client'
import React from 'react';
import { CategoryFilterType, MDXFrontMatter } from '@/lib/types';
import Category from './category';


const CategoryContainer = ({ categories, posts, onCategorySelect, selectedCategories }: {
    categories: CategoryFilterType[];
    posts: MDXFrontMatter[];
    onCategorySelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedCategories: string[];
}) => {



    return (
        <div
            className="flex flex-col border mb-2 border-red-500">
            <h1
                className="text-4xl font-bold">
                Blog
            </h1>
            <p
                className="text-lg">
                Welcome to the blog page. Browse by category, search for a specific post or just scroll through the posts.
            </p>
            <div
                className='flex flex-wrap gap-4 '>
                { categories.map((category) => (
                    <Category
                        key={ category.category }
                        categories={ category }
                        onCategorySelect={ onCategorySelect }
                        selectedCategories={ selectedCategories }
                    />
                )) }
            </div>

        </div>

    );
}

export default CategoryContainer;