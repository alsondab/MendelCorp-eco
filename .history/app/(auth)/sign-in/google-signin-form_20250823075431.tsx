'use client'
import { useFormStatus } from 'react-dom'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { SignInWithGoogle } from '@/lib/actions/user.actions'

export function GoogleSignInForm() {
  const router = useRouter()

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
        toast.success('Successfully signed in with Google!')
        router.push('/')
        router.refresh()
      }
    } catch (error) {
      toast.error('Failed to sign in with Google')
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
    <form>
      <SignInButton />
    </form>
  )
}
