

const UniqueTagList = ({
    tags
}: {
    tags: {
        id: string;
        title: string;
        description: string | null;
        forumPosts: {
            id: string;
            title: string;
            content: string;
            updatedAt: Date;
            createdAt: Date;
            authorId: string;
            forumId: string;
        }[];

    }[];
}
) => {
    return (
        <div className="flex flex-wrap space-x-2">
            { tags.map((tag) => (
                <span
                    key={ tag.id }
                    className="px-2 py-1 bg-gray-200 rounded-full text-sm"
                >
                    { tag.title }
                </span>
            )) }
        </div>
    );
}

export default UniqueTagList;