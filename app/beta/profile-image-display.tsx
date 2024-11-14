import { CustomUserImageType } from "@/lib/types";
import Image from "next/image";

export type ProfileImageDisplayProps = {
  userImages: CustomUserImageType;
};

const ProfileImageDisplay = ({ userImages }: ProfileImageDisplayProps) => {
  return (
    <div>
      <h3 className="mt-4 underline">User Images</h3>
      <div className="text-xs italic text-neutral-500">
        Click on the star to set or unset an image as the primary avatar. Click
        on the trash can to delete an image.
      </div>
      <div className="mt-4 flex flex-wrap gap-4"></div>
    </div>
  );
};

export default ProfileImageDisplay;
