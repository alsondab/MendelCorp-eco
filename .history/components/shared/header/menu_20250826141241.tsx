import UserButton from './user-button'
import CartButton from './cart-button'

export default function Menu() {
  return (
    <div className='flex justify-end flex-shrink-0'>
      <nav className='flex gap-1 sm:gap-2 md:gap-3 w-full justify-end'>
        <UserButton />
        <CartButton />
      </nav>
    </div>
  )
}