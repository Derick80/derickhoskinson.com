// Placeholder data
// san serif headers
// serif body text

import { getForumPosts, getUniqueTags } from '../actions/forums';
import ForumSummary from './forum-summary';
import UniqueTagList from './forum-tags';

export default async function CommunityPage (

) {
    /**
     * Fetches the forum posts.
     *
     * @returns {Promise<Post[]>} A promise that resolves to an array of forum posts.
     */
    const posts = await getForumPosts();
    if (!posts) return null;
    const tags = await getUniqueTags();
    if (!tags) return null;
    return (
        <div className="container mx-auto p-4 flex flex-col space-y-3 border-2">
            <h1 className="mb-4 text-center md:text-left text-3xl font-semibold">
                Community Forums
            </h1>
            <UniqueTagList tags={ tags } />
            <ForumSummary />

        </div>
    );
}
