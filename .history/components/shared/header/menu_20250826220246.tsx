import CartButton from './cart-button'
import UserButton from './user-button'

export default function Menu() {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-4 w-fit'>
        <UserButton />
        <CartButton />
      </nav>
    </div>
  )
}