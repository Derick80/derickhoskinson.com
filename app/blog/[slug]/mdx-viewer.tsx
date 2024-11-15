import { MDXRemote } from 'next-mdx-remote/rsc'
import { JSX } from 'react'

const options = {
    themes: {
        dark: 'nord',
        light: 'github-light'
    }
}
const MdxViewer = ({ mdxSource }: { mdxSource: string }) => {
    return (
        <div>
            <MDXRemote source={mdxSource} components={{}} />
        </div>
    )
}

export default MdxViewer
