import { logout } from '@/app/actions/auth'
import { LogOut } from 'lucide-react'
import { Button } from '../ui/button'

export const LogOutButton = () => {
  return (
    <form action={ logout }>
      <Button name='logout' type='submit' variant={ 'destructive' }>
        <LogOut className='mr-2 h-4 w-4' />
        <span>Log out</span>
      </Button>
    </form>
  )
}
