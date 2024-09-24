import { getUser } from '@/app/actions/auth';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent
} from '../ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { Avatar, AvatarImage, AvatarFallback } from '../ui/avatar';


const UserLoginMenu = async ({
    userId,
}: {
    userId: string;
}) => {
    const user = await getUser(userId)
    if (!user) {
        return null
    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                { user.image && user.name ? (
                    <Avatar>
                        <AvatarImage src={ user.image } alt={ user.name } />
                        <AvatarFallback>{ user.name.charAt(0) }
                        </AvatarFallback>
                    </Avatar>

                ) : (
                    <span>{ user.name }</span>

                ) }

            </DropdownMenuTrigger>
            <DropdownMenuContent>

                <DropdownMenuItem>
                    <Link href="/logout">
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default UserLoginMenu;