'use client'

import { ShoppingCartIcon } from 'lucide-react'
import Link from 'next/link'
import useIsMounted from '@/hooks/use-is-mounted'
import { cn } from '@/lib/utils'
import useCartStore from '@/hooks/use-cart-store'
import useCartSidebar from '@/hooks/use-cart-sidebar'

export default function CartButton() {
  const isMounted = useIsMounted()
  const isCartSidebarOpen = useCartSidebar()
  const {
    cart: { items },
  } = useCartStore()
  const cartItemsCount = items.reduce((a, c) => a + c.quantity, 0)

  return (
    <Link href='/cart' className='px-1 header-button'>
      <div className='flex items-end text-xs relative'>
        <ShoppingCartIcon className='h-6 w-6 sm:h-8 sm:w-8' />

        {isMounted && (
          <span
            className={cn(
              `bg-black px-1 rounded-full text-primary text-sm sm:text-base font-bold absolute right-[24px] sm:right-[30px] top-[-4px] z-10`,
              cartItemsCount >= 10 && 'text-xs sm:text-sm px-0 p-[1px]'
            )}
          >
            {cartItemsCount}
          </span>
        )}

        {/* Texte "Cart" caché sur très petits écrans */}
        <span className='font-bold hidden xs:inline'>Cart</span>

        {isMounted && isCartSidebarOpen && (
          <div
            className={`absolute top-[16px] sm:top-[20px] right-[-12px] sm:right-[-16px] rotate-[-90deg] z-10 w-0 h-0 border-l-[7px] border-r-[7px] border-b-[8px] border-transparent border-b-background`}
          ></div>
        )}
      </div>
    </Link>
  )
}
