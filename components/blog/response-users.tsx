import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger
} from '@/components/ui/hover-card'
import { labelLikes } from '@/lib/utils'
import Link from 'next/link'

type ResponseUsersProps = {
    users: {
        id: string
        name: string | null
        email: string
    }[]
    totalLikes: number | undefined | null
}
const ResponseUsers = ({ users, totalLikes }: ResponseUsersProps) => {
    return (
        <div>
            <HoverCard>
                <HoverCardTrigger>{labelLikes(totalLikes)}</HoverCardTrigger>
                <HoverCardContent>
                    <div className='flex flex-col space-y-2'>
                        {users.map((user) => (
                            <div key={user.id}>
                                <Link
                                    href={`/users/${user.id}`}
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
