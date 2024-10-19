import { create } from "../actions/cloudinary";
import Dropzone from "./drop";

export const UploadForm = () => {
  return (
    <form action={create}>
      <Dropzone />
      <input type="hidden" name="userId" value="cm2f2spxq000011jt5jagnwio" />
    </form>
  );
};
