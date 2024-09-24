import EmailForm from '@/components/auth/email-form';

export default async function Login () {
  return (
    <div className="flex h-screen items-center justify-center">
      <EmailForm />
    </div>
  );
}
