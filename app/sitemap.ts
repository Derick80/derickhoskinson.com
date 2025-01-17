'use server'
import { MetadataRoute } from 'next'
import { getPostsMetaData } from './actions/blog'

function getSiteUrl(path = '') {
    return new URL(
        path,
        process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : 'https://derickhoskinson.com'
    )
}
const revalidate = 60

export default async function sitemap() {
    const staticMap = [
        {
            url: getSiteUrl('/').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/blog').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/blog/category').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/cv').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/about').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/genetics').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/projects').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/community').href,
            lastModified: new Date().toISOString().split('T')[0]
        },
        {
            url: getSiteUrl('/about').href,
            lastModified: new Date().toISOString().split('T')[0]
        }
    ] satisfies MetadataRoute.Sitemap

    const posts = await getPostsMetaData()
    const dynamicMap = posts.map((post) => ({
        url: getSiteUrl(`/blog/${post.slug}`).href,
        lastModified: new Date().toISOString().split('T')[0]
    })) satisfies MetadataRoute.Sitemap

    return [...staticMap, ...dynamicMap]
}
