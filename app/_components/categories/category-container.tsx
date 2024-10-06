import { getAllBlogPosts } from '@/app/actions/mdx-server';
import CategorySelect from './custom-checkbox';


type CategoryContainerProps = {
    params: {
        category: string;
    };
}

const CategoryContainer = async (props: CategoryContainerProps) => {
    const allPosts = await getAllBlogPosts();
    if (!allPosts) return null;
    const postcategories = allPosts.flatMap((post) => post.categories);
    const uniqueCategories = [...new Set(postcategories)];

    const filteredPosts = allPosts.filter((post) => {
        return props.params.category
            ? post.categories.includes(props.params.category)
            : true;
    });

    return (
        <div
            className="mt-10 flex min-h-screen flex-col items-center py-2">
            <CategorySelect
                categories={ uniqueCategories }
            />
        </div>
    )
}

export default CategoryContainer;