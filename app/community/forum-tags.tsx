const UniqueTagList = ({
  tags,
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
}) => {
  return (
    console.log(tags, "tags"),
    <div className="flex flex-wrap space-x-2">
      { tags.map((tag) => (
        <span
          key={ tag.id }
          className="rounded-full bg-gray-200 px-2 py-1 text-sm"
        >
          { tag.title }
        </span>
      )) }
    </div>
  );
};

export default UniqueTagList;
