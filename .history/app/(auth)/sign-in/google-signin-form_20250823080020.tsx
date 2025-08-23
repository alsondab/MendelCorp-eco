'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function GoogleSignInForm() {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true)
      toast.success('Redirecting to Google...')

      const response = await fetch('/api/auth/google-signin', {
        method: 'POST',
      })

      const data = await response.json()

      if (data.success && data.redirectUrl) {
        toast.success('Google authentication successful!')
        window.location.href = data.redirectUrl
      } else if (data.success) {
        toast.success('Google sign in initiated!')
        // Rediriger vers la page d'accueil ou callback
        router.push('/')
      } else {
        toast.error(data.error || 'Failed to sign in with Google')
      }
    } catch (error) {
      toast.error('An error occurred during Google sign in')
      console.error('Google sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleGoogleSignIn}
      disabled={isLoading}
      className='w-full'
      variant='outline'
    >
      {isLoading ? 'Redirecting to Google...' : 'Sign In with Google'}
    </Button>
  )
}
