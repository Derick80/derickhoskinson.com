import EmailForm from '../components/auth/email-form'

export default async function Login () {
    return (
        <div className='flex items-center justify-center h-screen'>
            <EmailForm />
        </div>
    )
}
