import { getUser } from "@/app/actions/auth";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { ModeToggle } from "../theme/theme-toggle";
import { Button } from "../ui/button";
import { User } from "lucide-react";

const UserLoginMenu = async ({ userId }: { userId: string }) => {
  const user = await getUser(userId);
  if (!user) {
    return null;
  }

  // extract the userAvatar:true from the user object. If there isn't one set it to false
  const { userImages } = user;
  const isAvatar = userImages.filter((image) => image.userAvatar === true);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={
                isAvatar.length > 0
                  ? isAvatar[0].imageUrl
                  : "/assets/images/placeholder-user.jpg"
              }
              alt={user.name || "User avatar"}
            />
            <AvatarFallback>
              {user.name ? user.name.charAt(0).toUpperCase() : <User />}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent avoidCollisions={true}>
        <DropdownMenuItem>
          <Link href="/profile">Profile</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <ModeToggle />
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/logout">Logout</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserLoginMenu;
