import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserImage } from "@prisma/client";
import { Plus, Trash2, User } from "lucide-react";
import ImageActionButton from "./image-action-button";
import StarImage from "./image-starred-button";

export const UserImageDisplay = ({
    userImages = [],
}: {
    userImages: UserImage[];
}) => {
    // Ensure we always have 4 slots, filling with null if needed
    const filledUsers: (UserImage | null)[] = [...userImages, ...Array(4).fill(null)].slice(0, 4);

    const userImageCount = userImages.length;
    return (
        <div className="mx-auto w-full max-w-sm">
            <h2 className="text-lg font-semibold">User Images</h2>
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:items-start">
                { filledUsers.map((user, index) => (
                    <div
                        key={ user?.id || `empty-${index}` }
                        className="flex flex-col items-center"
                    >
                        <div className="relative">
                            <Avatar className="h-20 w-20">
                                { user?.imageUrl ? (
                                    <AvatarImage
                                        src={ user.imageUrl }
                                        alt={ `one of my avatars` }
                                    />
                                ) : (
                                    <AvatarFallback>
                                        <User className="h-10 w-10 text-gray-400" />
                                    </AvatarFallback>
                                ) }
                            </Avatar>
                            <StarImage
                                isUserAvatar={ user?.userAvatar || false }
                                imageId={ user?.id || '' }
                            />
                            <ImageActionButton
                                variant={
                                    user?.imageUrl
                                }
                            />
                        </div>
                        <span className="mt-2 text-center text-sm">
                            { user?.fileName || `User ${index + 1}` }
                        </span>
                    </div>
                )) }
            </div>

        </div>
    );
};
