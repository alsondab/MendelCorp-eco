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
import UserButton from './user-button'
import CartButton from './cart-button'
import ColorTest from '../color-test'

const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {
  return (
    <div className='flex justify-end'>
      {/* Desktop Navigation */}
      <nav className='md:flex gap-3 hidden w-full'>
        <ColorTest />
        <ThemeSwitcher />
        <UserButton />
        {forAdmin ? null : <CartButton />}
      </nav>

      {/* Mobile Navigation */}
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle header-button'>
            <EllipsisVertical className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent className='bg-black text-white flex flex-col items-start'>
            <SheetHeader className='w-full'>
              <div className='flex items-center justify-between'>
                <SheetTitle>Site Menu</SheetTitle>
                <SheetDescription></SheetDescription>
              </div>
            </SheetHeader>
            <ThemeSwitcher />
            <UserButton />
            {forAdmin ? null : <CartButton />}
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
