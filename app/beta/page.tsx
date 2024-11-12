import { getUser } from "../actions/auth";
import { getUserImages } from "../actions/user-avatar";
import { UploadForm } from "./upload-form";
import { UserImageDisplay } from "./user-image-display";

export default async function Page() {
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return null;
  }

  console.log(userId, "userId");
  const isAuthed = userId ? true : false;
  const userImages = await getUserImages(userId);
  // const userData = { userId, isAuthed };
  return (
    <div className="flex flex-col items-center gap-10">
      <h1>Page</h1>
      <UserImageDisplay userImages={userImages} />
      {/* <Dropzone /> */}
      <UploadForm userId={userId} />
    </div>
  );
}
