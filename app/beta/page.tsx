import { verifySession } from "../actions/auth";
import { getUserImages } from "../actions/user-avatar";
import { UploadForm } from "./up-form";

export default async function Page () {
    const session = await verifySession();
    if (!session) {
        return <div>Not authenticated</div>;
    }
    const userId = session.userId;
    const isAuthed = userId ? true : false;
    // const userImages = await getUserImages(userId);
    // const userData = { userId, isAuthed };

    return (
        <div>
            <h1>Page</h1>
            <UploadForm />
        </div>
    );
}