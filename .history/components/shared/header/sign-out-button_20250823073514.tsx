'use client'

import { Button } from '@/components/ui/button'
import { SignOut } from '@/lib/actions/user.actions'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      toast.success('Signing out...')
      
      // Appeler signOut directement depuis NextAuth au lieu de l'action serveur
      const { signOut } = await import('@/auth')
      await signOut({ redirect: false })
      
      toast.success('Successfully signed out!')
      router.push('/')
    } catch (error) {
      toast.error('Error signing out')
      console.error('Sign out error:', error)
    }
  }

  return (
    <Button
      className='w-full py-4 px-2 h-4 justify-start'
      variant='ghost'
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  )
}
