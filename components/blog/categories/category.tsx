import { Badge } from '@/components/ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CategoryFilterType, MDXFrontMatter } from '@/lib/types';
import { cn } from '@/lib/utils';
import Link from 'next/link';


const Category = ({ categories, onCategorySelect, selectedCategories }: {
    categories: CategoryFilterType
    onCategorySelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
    selectedCategories: string[];
}) => {

    const { category, related, categoryCount } = categories;

    const isSelected = (category: string) => {
        return selectedCategories.includes(category);
    }

    return (
        <>
            { onCategorySelect && (
                <Input
                    type="checkbox"
                    name='category'
                    onChange={
                        onCategorySelect }
                    className="absolute -left-[99999px] opacity-0"
                    id={ category }
                    value={ category }
                />
            ) }
            <Label
                className={ `relative inline-block border text-base font-semibold rounded-sm hover:bg-primary-foreground/80 cursor-pointer ${isSelected(category) ? 'bg-blue-500/80' : 'bg-primary-background/80'}` }
                htmlFor={ category }
            >
                { category }
                <CategoryCount
                    { ...categories }
                />
            </Label>
        </>
    );
}


export default Category;




const CategoryCount = (
    props: CategoryFilterType
) => {
    const { category, related, categoryCount } = props;
    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                { categoryCount }
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuItem>
                    { related.map((rel) => (
                        <Link
                            key={ rel }
                            href={ `/blog/${rel}` }
                            className="flex items-center justify-between gap-1"
                        >
                            { rel }
                        </Link>
                    )) }

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
