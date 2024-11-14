import { cn } from "@/lib/utils";
import {
  CrossCircledIcon,
  StarFilledIcon,
  StarIcon,
} from "@radix-ui/react-icons";
import React from "react";
import { flushSync } from "react-dom";
import { ProfileImageDisplayProps } from "./profile-image-display";

export type FileImageProps = {
  userImage: ProfileImageDisplayProps;
  onDelete: () => void;
  children: React.ReactNode;
};
const FileImage = ({ userImage, onDelete, children }: FileImageProps) => {
  console.log(userImage, "userImage");
  const [isHidden, setIsHidden] = React.useState(false);

  if (isHidden) return null;

  const handleDelete = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this image?",
    );
    if (isConfirmed) {
      flushSync(() => {
        setIsHidden(true);
        onDelete();
      });
    }
  };

  return (
    <div className="group relative">
      <input type="hidden" name="fileUrl" />
      <input type="hidden" name="fileName" />

      <input type="hidden" name="cloudinaryId" />
      {children}
      {/* // if you delete an image it falls back to the placeholder image */}
      <button
        type="button"
        onClick={handleDelete}
        className="absolute -right-[0.625rem] -top-[0.125rem] block rounded-full bg-white text-black text-black/50"
      >
        <CrossCircledIcon />
      </button>
      {/*         className='absolute -right-[0.625rem] -bottom-[0.125rem] hidden rounded-full  hover:block  group-hover:block'
       */}
    </div>
  );
};

export default FileImage;
