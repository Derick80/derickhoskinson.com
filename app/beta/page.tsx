import { CustomUserImageType } from "@/lib/types";
import { getUser } from "../actions/auth";
import { getUserImages } from "../actions/user-avatar";
import ProfileImageDisplay, {
  ProfileImageDisplayProps,
} from "./profile-image-display";
import { UploadForm } from "./upload-form";
import { UserImageDisplay } from "./user-image-display";
import ImageDropZone from "./image-dropzone";

export default async function Page() {
  const user = await getUser();
  const userId = user?.id;
  if (!userId) {
    return null;
  }

  console.log(userId, "userId");
  const isAuthed = userId ? true : false;
  const userImages = await getUserImages(userId);

  console.log(userImages.length, "userImages");
  // const userData = {  userId, isAuthed };
  return (
    <div className="flex flex-col items-center gap-10">
      <h1>Update Your Profile</h1>

      <ImageDropZone userImages={userImages} userId={userId} />
    </div>
  );
}
