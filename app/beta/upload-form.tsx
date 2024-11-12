import { create } from "../actions/cloudinary";
import ImageDropZone from "./image-dropzone";

export const UploadForm = ({ userId }: { userId: string }) => {


  return (
    <form action={ create }>
      <ImageDropZone
        userId={ userId }
      />
      <input
        type="text"
        name="userId"
        value={ userId }
        readOnly
      />
    </form>
  );
};
