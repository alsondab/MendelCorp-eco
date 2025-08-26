import { APP_NAME } from '@/lib/constants'
import Image from 'next/image'
import Link from 'next/link'
import Menu from './menu'
import { Button } from '@/components/ui/button'
import { MenuIcon } from 'lucide-react'
import data from '@/lib/data'
import Search from './search'

export default function Header() {
  return (
    <header className='bg-black text-white'>
      <div className='px-2 sm:px-4'>
        <div className='flex items-center justify-between gap-2'>
          <div className='flex items-center flex-shrink-0'>
            <Link
              href='/'
              className='flex items-center header-button font-extrabold text-lg sm:text-xl md:text-2xl m-1'
            >
              <Image
                src='/icons/logo.png'
                width={32}
                height={32}
                alt={`${APP_NAME} logo`}
                priority
                className='sm:w-10 sm:h-10'
              />
              <span className='hidden xs:inline ml-1'>{APP_NAME}</span>
            </Link>
          </div>

          {/* Barre de recherche - cachée sur très petits écrans */}
          <div className='hidden sm:block flex-1 max-w-lg mx-2'>
            <Search />
          </div>

          {/* Menu utilisateur et panier */}
          <Menu />
        </div>

        {/* Barre de recherche mobile - affichée en dessous */}
        <div className='sm:hidden block py-2'>
          <Search />
        </div>
      </div>

      {/* Menu de navigation horizontal */}
      <div className='flex items-center px-2 sm:px-3 mb-[1px] bg-gray-800 overflow-x-auto'>
        <Button
          variant='ghost'
          className='dark header-button flex items-center gap-1 text-sm sm:text-base flex-shrink-0 [&_svg]:size-5 sm:[&_svg]:size-6'
        >
          <MenuIcon />
          <span className='hidden xs:inline'>All</span>
        </Button>

        <div className='flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide flex-1 min-w-0'>
          {data.headerMenus.map((menu) => (
            <Link
              href={menu.href}
              key={menu.href}
              className='header-button !p-1 sm:!p-2 text-sm sm:text-base whitespace-nowrap flex-shrink-0'
            >
              {menu.name}
            </Link>
          ))}
        </div>
      </div>
    </header>
  )
}
