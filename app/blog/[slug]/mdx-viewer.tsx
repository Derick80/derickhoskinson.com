import { MDXRemote } from 'next-mdx-remote/rsc'

const MdxViewer = async ({ content }: { content: string }) => {
    return (
        <div>
            <MDXRemote content={content} />
        </div>
    )
}

export default MdxViewer
