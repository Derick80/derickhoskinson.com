import { create } from "../actions/cloudinary";
import ImageDropZone from "./image-dropzone";

export const UploadForm = ({
  userId,
  changeHandler,
}: {
  userId: string;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <form action={create}>
      <input type="text" name="userId" value={userId} readOnly />
    </form>
  );
};
