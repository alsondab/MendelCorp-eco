'use client'

import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export default function SignOutButton() {
  const router = useRouter()

  const handleSignOut = async () => {
    try {
      toast.success('Signing out...')

      // Utiliser l'API route de déconnexion au lieu d'importer MongoDB côté client
      const response = await fetch('/api/auth/signout', {
        method: 'POST',
      })

      if (response.ok) {
        const data = await response.json()
        toast.success('Successfully signed out!')

        // Utiliser l'URL de redirection retournée par l'API
        const redirectUrl = data.redirectUrl || '/'
        router.push(redirectUrl)
        router.refresh() // Rafraîchir pour mettre à jour l'état de la session
      } else {
        throw new Error('Sign out failed')
      }
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
