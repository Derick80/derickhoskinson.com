import React from 'react'
// taken from below
/**
 * @tutorial https://www.jacobparis.com/content/file-image-thumbnails#avoiding-memory-leaks-with-useobjecturls
 */
export function useFileURLs() {
    const mapRef = React.useRef<Map<File, string> | null>(null)

    React.useEffect(() => {
        const map = new Map()
        mapRef.current = map

        return () => {
            for (const [, url] of map) {
                URL.revokeObjectURL(url)
            }
            mapRef.current = null
        }
    }, [])

    return function getFileUrl(file: File) {
        const map = mapRef.current
        if (!map) {
            throw Error('Cannot getFileUrl while unmounted')
        }
        if (!map.has(file)) {
            const url = URL.createObjectURL(file)
            map.set(file, url)
        }

        const url = map.get(file)
        if (!url) {
            throw Error('File URL not found')
        }

        return url
    }
}
