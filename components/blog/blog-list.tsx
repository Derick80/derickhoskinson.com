'use client'
import { MDXFrontMatter } from '@/lib/types';
import { BlogCard } from './blog-card';
import CategoryContainer from './categories/categories-container';
import React from 'react';


export default function BlogList ({ posts }: {
    posts: MDXFrontMatter[];
}) {

    // get unique categories
    const categories = posts.map((post) => post.categories).flat();

    const uniqueCategories = [...new Set(categories)];
    console.log(uniqueCategories, 'uniqueCategories');

    // transform into an object with category, related posts and count
    const categoryData = uniqueCategories.map((category) => {
        const related = posts
            .filter((post) => post.categories.includes(category))
            .map((post) => post.slug);
        return {
            category,
            related,
            categoryCount: related.length,
        };
    });

    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([]);
    console.log(selectedCategories, 'selectedCategories');

    const [searchQuery, setSearchQuery] = React.useState("")
    const filteredPosts = posts.filter(post => {
        return (
            (post.title.toLowerCase().includes(searchQuery) ||
                post.description.toLowerCase().includes(searchQuery)) &&
            (selectedCategories.length === 0 ||
                post.categories.some(tag => selectedCategories.includes(tag)))
        )
    })

    function handleSearchChange ({ target }) {
        setSearchQuery(target.value.toLowerCase())
    }

    function handleCategorySelect ({ target }) {
        console.log(target.value, 'target.value');

        setSelectedCategories(prevCategories => {
            if (prevCategories.includes(target.value)) {
                return prevCategories.filter(cat => target.value !== cat)
            } else {
                return [...prevCategories, target.value]
            }
        })
    }
    return (
        <div className="flex flex-col gap-5 min-h-screen py-2">
            <CategoryContainer
                categories={ categoryData }
                posts={ posts }
                onCategorySelect={ handleCategorySelect }
                selectedCategories={ selectedCategories }
            />


            { filteredPosts.map((post) => (
                <BlogCard
                    key={ post.slug }
                    { ...post }

                />
            )) }
        </div>
    )
}
