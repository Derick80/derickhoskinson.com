import { create } from "../actions/cloudinary";
import ImageDropZone from "./image-dropzone";

export const UploadForm = (
  { userId }: { userId: string },
) => {


  console.log(userId, "userId from upload form");
  return (
    <form action={
      create
    }
    >
      <ImageDropZone />
      <input type="hidden" name="userId" value={
        userId
      } />

    </form>
  );
};
