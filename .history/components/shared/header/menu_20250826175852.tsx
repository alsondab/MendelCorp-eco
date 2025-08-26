import UserButton from './user-button'
import CartButton from './cart-button'
import { auth } from '@/auth'

export default async function Menu() {
  const session = await auth()
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <UserButton />

        <CartButton />
      </nav>
    </div>
  )
}
