import { getUsersList } from '../actions/users'

export default async function Page () {
    const userList = await getUsersList()
    if (!userList) return null
    console.log(userList)
    return (
        <div>
            <h1>Users</h1>
        </div>
    )
}
