'use client'
import { useActionState } from 'react'
import { sendContactEmail } from '@/app/actions/about'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const initialState = {
    name: '',
    from: '',
    message: ''
}

const ContactForm = () => {
    const [state, action, isPending] = useActionState(
        sendContactEmail,
        initialState
    )
    return (
        <form id='Contact' className='space-y-4' action={action}>
            <input type='hidden' name='shield' value='' />
            <div className='grid gap-4 sm:grid-cols-2'>
                <div className='space-y-2'>
                    <label
                        htmlFor='name'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                        Name
                    </label>
                    <Input
                        id='name'
                        name='name'
                        placeholder='Enter your name'
                    />
                </div>
                <div className='space-y-2'>
                    <label
                        htmlFor='email'
                        className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                    >
                        Email
                    </label>
                    <Input
                        id='from'
                        name='from'
                        placeholder='Enter your email'
                        type='email'
                    />
                </div>
            </div>
            <div className='space-y-2'>
                <label
                    htmlFor='message'
                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                >
                    Message
                </label>
                <Textarea
                    id='message'
                    name='message'
                    placeholder='Enter your message'
                />
            </div>
            <Button className='w-full' disabled={isPending} type='submit'>
                Send Message
            </Button>
        </form>
    )
}

export default ContactForm
