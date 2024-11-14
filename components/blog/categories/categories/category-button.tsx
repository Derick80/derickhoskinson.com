'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const CategoryButton = ({
    category,
    count,
    onCategorySelect
}: {
    category: string
    count: number
    onCategorySelect: (category: string) => void
}) => {
    return (
        <div className='flex flex-wrap p-2'>
            <Checkbox
                type='button'
                className='transition-transform duration-200 hover:translate-x-2 hover:transform hover:bg-primary-foreground/90'
                name='category'
                id='category'
                value={category}
                onClick={() => {
                    onCategorySelect(category)
                }}
            />
            <Label>{category}</Label>

            <span className='m-2 text-xs'>{count}</span>
        </div>
    )
}

export default CategoryButton
