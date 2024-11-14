'use client'
import { logout } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function LogoutPage() {
    return (
        <form action={logout}>
            <Button name='logout' type='submit' variant={'destructive'}>
                <LogOut className='mr-2 h-4 w-4' />
                <span>Log out</span>
            </Button>
        </form>
    )
}
