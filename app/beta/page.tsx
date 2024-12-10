import { Suspense } from 'react'
import { getUser } from '../actions/auth'
import { getUserImages } from '../actions/user-avatar'
import ImageDropZone from './image-dropzone'

export default async function Page() {
    const user = await getUser()
    const userId = user?.id
    if (!userId) {
        return null
    }

    const userImages = await getUserImages(userId)
    if (!userImages) {
        return null
    }

    // const userData = {  userId, isAuthed };

    return (
        <div className='flex flex-col items-center gap-10'>
            <h1>Update Your Profile</h1>
            <Suspense fallback={<p>waiting for message...</p>}>
                <ImageDropZone userImages={userImages} userId={userId} />
            </Suspense>
        </div>
    )
}
