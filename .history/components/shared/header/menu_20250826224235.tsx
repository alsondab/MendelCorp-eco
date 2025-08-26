import { EllipsisVertical } from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import CartButton from './cart-button'
import UserButton from './user-button'
import ThemeSwitcher from './theme-switcher'

const Menu = ({ forAdmin = false }: { forAdmin?: boolean }) => {
  return (
    <div className='flex justify-end'>
      <nav className='md:flex gap-4 hidden w-fit'>
        <ThemeSwitcher />
        {forAdmin ? null : <CartButton />}
        <UserButton />
      </nav>
      <nav className='md:hidden'>
        <Sheet>
          <SheetTrigger className='align-middle header-button'>
            <EllipsisVertical className='h-6 w-6' />
          </SheetTrigger>
          <SheetContent className='bg-background text-foreground flex flex-col items-start'>
            <SheetHeader className='w-full'>
              <div className='flex items-center justify-between'>
                <SheetTitle>Site Menu</SheetTitle>
                <SheetDescription></SheetDescription>
              </div>
            </SheetHeader>
            <div className='flex flex-col gap-4 w-full mt-4'>
              <ThemeSwitcher />
              <UserButton />
              {forAdmin ? null : <CartButton />}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  )
}

export default Menu
