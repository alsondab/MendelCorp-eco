import { auth } from '@/auth'

import { buttonVariants } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ChevronDown, User } from 'lucide-react'
import Link from 'next/link'
import SignOutButton from './sign-out-button'

export default async function UserButton() {
  const session = await auth()
  return (
    <div className='flex gap-1 sm:gap-2 items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger className='header-button' asChild>
          <div className='flex items-center gap-1 sm:gap-2'>
            {/* Icône utilisateur pour les très petits écrans */}
            <div className='xs:hidden'>
              <User className='w-4 h-4' />
            </div>

            {/* Texte complet pour les écrans plus grands */}
            <div className='hidden xs:flex flex-col text-xs text-left'>
              <span>Hello, {session ? session.user.name : 'sign in'}</span>
              <span className='font-bold'>Account & Orders</span>
            </div>

            {/* Version courte pour les petits écrans */}
            <div className='xs:hidden flex flex-col text-xs text-left'>
              <span className='font-bold'>Account</span>
            </div>

            <ChevronDown className='w-3 h-3 sm:w-4 sm:h-4' />
          </div>
        </DropdownMenuTrigger>
        {session ? (
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuLabel className='font-normal'>
              <div className='flex flex-col space-y-1'>
                <p className='text-sm font-medium leading-none'>
                  {session.user.name}
                </p>
                <p className='text-xs leading-none text-muted-foreground'>
                  {session.user.email}
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuGroup>
              <Link className='w-full' href='/account'>
                <DropdownMenuItem>Your account</DropdownMenuItem>
              </Link>
              <Link className='w-full' href='/account/orders'>
                <DropdownMenuItem>Your orders</DropdownMenuItem>
              </Link>

              {session.user.role === 'Admin' && (
                <Link className='w-full' href='/admin/overview'>
                  <DropdownMenuItem>Admin</DropdownMenuItem>
                </Link>
              )}
            </DropdownMenuGroup>
            <DropdownMenuItem className='p-0 mb-1'>
              <SignOutButton />
            </DropdownMenuItem>
          </DropdownMenuContent>
        ) : (
          <DropdownMenuContent className='w-56' align='end' forceMount>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link
                  className={cn(buttonVariants(), 'w-full')}
                  href='/sign-in'
                >
                  Sign in
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuLabel>
              <div className='font-normal'>
                New Customer? <Link href='/sign-up'>Sign up</Link>
              </div>
            </DropdownMenuLabel>
          </DropdownMenuContent>
        )}
      </DropdownMenu>
    </div>
  )
}
