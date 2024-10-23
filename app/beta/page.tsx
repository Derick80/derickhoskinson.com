import { verifySession } from "../actions/auth";
import { getUserImages } from "../actions/user-avatar";
import Dropzone from "./drop";
import { UploadForm } from "./up-form";
import { UserImageDisplay } from "./user-image-display";

export default async function Page() {
  const userId = "cm2f2spxq000011jt5jagnwio";
  const isAuthed = userId ? true : false;
  const userImages = await getUserImages(userId);
  // const userData = { userId, isAuthed };
  console.log(userImages);
  return (
    <div className="flex flex-col items-center gap-10">
      <h1>Page</h1>
      <UserImageDisplay userImages={userImages} />
      {/* <Dropzone /> */}
      <UploadForm />
    </div>
  );
}
