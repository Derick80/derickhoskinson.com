import { getUser, logout } from '@/app/actions/auth';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuItem,
    DropdownMenuContent,



} from '../ui/dropdown-menu';
import Link from 'next/link';
import Image from 'next/image';
import { useFormState } from 'react-dom';
import { LogOutButton } from '../auth/logout-button';


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
                    <Image
                        src={ user.image }
                        alt={ user.name }
                        className="w-8 h-8 rounded-full"
                        width={ 400 }
                        height={ 400 }
                    />
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