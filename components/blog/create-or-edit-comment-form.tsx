import { useFormStatus } from 'react-dom'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Input } from '../ui/input'

type CreateOrEditCommentFormProps = {
    postId: string
    targetId: string
    userId: string
    message: string
    setComment: (
        formData: FormData,
        prev: {
            postId: string
            targetId: string
            userId: string
            message: string
            shield: string
        }
    ) => void
    onCommentChange: (
        e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => void
}

const CreateOrEditCommentForm = ({
    postId,
    targetId,
    userId,
    setComment,
    message,
    onCommentChange
}: CreateOrEditCommentFormProps) => {
    const { pending, data } = useFormStatus()

    return (
        <>
            <input type='hidden' name='shield' value='' />
            <input
                type='hidden'
                name='postId'
                value={ postId }
                onChange={ onCommentChange }
            />
            <input
                type='hidden'
                name='targetId'
                value={ targetId }
                onChange={ onCommentChange }
            />
            <input
                type='hidden'
                name='userId'
                value={ userId }
                onChange={ onCommentChange }
            />

            <Label htmlFor='commentMessage'>
                Comment:
                <Textarea
                    name='commentMessage'
                    placeholder='Leave a comment'
                    required
                    value={
                        data?.message === 'Commented' ? '' : message

                    }
                    onChange={ onCommentChange }
                />
            </Label>
        </>
    )
}

export default CreateOrEditCommentForm
