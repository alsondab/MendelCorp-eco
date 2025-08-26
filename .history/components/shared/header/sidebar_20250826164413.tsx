'use client'
import * as React from 'react'
import Link from 'next/link'
import { X, ChevronRight, UserCircle, MenuIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function Sidebar({ categories }: { categories: string[] }) {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      await SignOut()
      toast('Signed out successfully')
      router.refresh()
    } catch (error) {
      toast('Error signing out')
    }
  }

  return (
    <Drawer direction='left'>
      <DrawerTrigger className='header-button flex items-center !p-2  '>
        <MenuIcon className='h-5 w-5 mr-1' />
        All
      </DrawerTrigger>
      <DrawerContent className='w-[350px] mt-0 top-0'>
        <div className='flex flex-col h-full'>
          {/* User Sign In Section */}
          <div className='dark bg-gray-800 text-foreground flex items-center justify-between  '>
            <DrawerHeader>
              <DrawerTitle className='flex items-center'>
                <UserCircle className='h-6 w-6 mr-2' />
                {session ? (
                  <DrawerClose asChild>
                    <Link href='/account'>
                      <span className='text-lg font-semibold'>
                        Hello, {session.user.name}
                      </span>
                    </Link>
                  </DrawerClose>
                ) : (
                  <DrawerClose asChild>
                    <Link href='/sign-in'>
                      <span className='text-lg font-semibold'>
                        Hello, sign in
                      </span>
                    </Link>
                  </DrawerClose>
                )}
              </DrawerTitle>
              <DrawerDescription>
                {session ? 'Welcome back!' : 'Sign in to access your account'}
              </DrawerDescription>
            </DrawerHeader>
            <DrawerClose asChild>
              <Button variant='ghost' size='icon' className='mr-2'>
                <X className='h-5 w-5' />
                <span className='sr-only'>Close</span>
              </Button>
            </DrawerClose>
          </div>

          {/* Shop By Category */}
          <div className='flex-1 overflow-y-auto'>
            <div className='p-4 border-b'>
              <h2 className='text-lg font-semibold'>Shop By Department</h2>
            </div>
            <nav className='flex flex-col'>
              {categories.map((category) => (
                <DrawerClose asChild key={category}>
                  <Link
                    href={`/search?category=${category}`}
                    className={`flex items-center justify-between item-button`}
                  >
                    <span>{category}</span>
                    <ChevronRight className='h-4 w-4' />
                  </Link>
                </DrawerClose>
              ))}
            </nav>
          </div>

          {/* Setting and Help */}
          <div className='border-t flex flex-col '>
            <div className='p-4'>
              <h2 className='text-lg font-semibold'>Help & Settings</h2>
            </div>
            <DrawerClose asChild>
              <Link href='/account' className='item-button'>
                Your account
              </Link>
            </DrawerClose>{' '}
            <DrawerClose asChild>
              <Link href='/page/customer-service' className='item-button'>
                Customer Service
              </Link>
            </DrawerClose>
            {session ? (
              <Button
                onClick={handleSignOut}
                className='w-full justify-start item-button text-base'
                variant='ghost'
              >
                Sign out
              </Button>
            ) : (
              <Link href='/sign-in' className='item-button'>
                Sign in
              </Link>
            )}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
