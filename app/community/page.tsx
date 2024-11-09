// Placeholder data
// san serif headers
// serif body text

import { Suspense } from "react";
import { getForumPosts, getUniqueTags, getForumData } from "../actions/forums";
import ForumSummary from "./forum-summary";
import UniqueTagList from "./forum-tags";
import ForumContent from "./form-content";

export default async function CommunityPage () {
  const { forumposts, tags } = await getForumData();
  console.log(tags, 'tags')
  return (
    <div className="container mx-auto flex flex-col space-y-3 border-2 p-4">
      <h1 className="mb-4 text-center text-3xl font-semibold md:text-left">
        Community Forums
      </h1>
      <Suspense fallback={ <div>Loading forum content...</div> }>
        <ForumContent initialPosts={ forumposts } initialTags={ tags } />
        <ForumSummary />
      </Suspense>
    </div>
  );
}
