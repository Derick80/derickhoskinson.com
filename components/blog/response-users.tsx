import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card'
import { UserInterActionType } from '@/lib/types'
import { labelLikes } from '@/lib/utils'
import Link from 'next/link'

type ResponseUsersProps = {
    users: {
        id: string
        name: string
        email: string
        author: string
        userId: string
        postId: string
    }[]
    totalLikes: number | undefined | null
}

const ResponseUsers = ({ users, totalLikes }: ResponseUsersProps) => {
    console.log(users, 'users')
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger>{labelLikes(totalLikes)}</HoverCardTrigger>
                <HoverCardContent>
                    <div className='flex flex-col space-y-2'>
                        {users.map((user) => (
                            <div key={user.userId}>
                                <Link
                                    href={`/users/${user.userId}`}
                                    passHref
                                    prefetch
                                >
                                    {user.name || user.email}
                                </Link>
                            </div>
                        ))}
                    </div>
                </HoverCardContent>
            </HoverCard>
        </div>
    )
}

export default ResponseUsers
