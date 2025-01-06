import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { commentOnPost } from '@/app/actions/comments'

const SubmitButton = ({
    onSubmit
}: {
    onSubmit: (event: React.FormEvent<HTMLFormElement>) => void
}) => {
    const { pending, data, action } = useFormStatus()
    return (
        <Button
            type='submit'
            variant='default'
            disabled={pending}
            onClick={data ? action : onSubmit}
        >
            Submit
        </Button>
    )
}

export default SubmitButton
