
import { redirect } from 'next/navigation'

export async function updateCategories (formData: FormData) {
    const selectedCategories = formData.getAll('category')
    const searchParams = new URLSearchParams()

    if (selectedCategories.length > 0) {
        searchParams.set('categories', selectedCategories.join(','))
    }

    redirect(`/?${searchParams.toString()}`)
}
