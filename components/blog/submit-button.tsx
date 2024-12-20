import { useFormStatus } from 'react-dom'
import { Button } from '../ui/button'

const SubmitButton = () => {
    const { pending, data } = useFormStatus()
    return (
        <Button
            type='submit'
            variant='default'
            form='submit-form'
            disabled={pending}
        >
            Submit
        </Button>
    )
}

export default SubmitButton
