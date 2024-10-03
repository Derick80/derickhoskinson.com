import CategorySelect from './_components/categories/custom-checkbox'
import { getSlugsAndCategories } from './actions/mdx-server'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Dr. Hoskinson's Blog",
  description: 'A personal web app for Dr. Hoskinson',
  keywords: ['clinical genetics', 'genetics phd', 'acmg', 'variant classification', 'somatic', 'germline', 'tufts genetids phd']

}



export default async function Home (
  { searchParams }: {
    searchParams: { [key: string]: string | string[] | undefined }
  }
) {
  const categoriesMap = await getSlugsAndCategories()
  if (!categoriesMap) return null
  console.log(categoriesMap)

  const filteredCategories = categoriesMap.filter((cat) => {
    return cat.category === searchParams.category

  }
  )
  console.log(filteredCategories)
  return (
    <div
      className="flex flex-col items-center mt-10  min-h-screen py-2">


      <div
        className='flex flex-wrap'>
        <CategorySelect
          categories={ categoriesMap }
        />


      </div>
    </div>
  )
}

