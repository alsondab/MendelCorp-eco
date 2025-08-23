'use client'
import { useFormStatus } from 'react-dom'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'
import { toast } from 'sonner'

export function GoogleSignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const handleGoogleSignIn = async () => {
    try {
      toast.success('Redirecting to Google...')
      const result = await SignInWithGoogle()

      if (result?.error) {
        toast.error(result.error)
        return
      }

      if (result?.url) {
        // Redirection vers Google OAuth
        window.location.href = result.url
      } else {
        // Connexion réussie, rediriger vers la page de callback
        toast.success('Successfully signed in with Google!')
        router.push(callbackUrl)
      }
    } catch (error) {
      toast.error('An error occurred during Google sign in')
    }
  }

  const SignInButton = () => {
    const { pending } = useFormStatus()
    return (
      <Button
        disabled={pending}
        className='w-full'
        variant='outline'
        onClick={handleGoogleSignIn}
        type='button'
      >
        {pending ? 'Redirecting to Google...' : 'Sign In with Google'}
      </Button>
    )
  }

  return (
    <div>
      <SignInButton />
    </div>
  )
}
