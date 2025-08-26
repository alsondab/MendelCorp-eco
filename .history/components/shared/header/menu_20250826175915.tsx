import UserButton from './user-button'
import CartButton from './cart-button'
import { EllipsisVertical } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import ThemeSwitcher from './theme-switcher'
export default function Menu() {
  return (
    <div className='flex justify-end'>
      <nav className='flex gap-3 w-full'>
        <UserButton />

        <CartButton />
      </nav>
    </div>
  )
}
