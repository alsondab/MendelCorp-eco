import { redirect } from 'next/navigation'
import { auth } from '@/auth'

export default async function CheckoutPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/sign-in?callbackUrl=/checkout')
  }

  // Rediriger vers le formulaire de checkout
  redirect('/checkout/form')
}
