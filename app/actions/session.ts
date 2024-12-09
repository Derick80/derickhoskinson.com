import 'server-only'
import { cookies } from 'next/headers'

export async function deleteSession() {
    const cookieStore = await cookies()
    const loggedOut = cookieStore.delete('session-token')
    if (loggedOut) {
        return true
    }
}
