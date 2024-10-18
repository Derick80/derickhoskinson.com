import { create } from '../actions/cloudinary'


export const UploadForm = () => {
    return (
        <form
            action={ create }

        >
            <input type="file" name="imageField" multiple />
            <input type="hidden" name="userId" value="cm2cq24b00000vky1h5x3y46i" />
            <button type="submit"  >
                Upload
            </button>
        </form>

    )
}
