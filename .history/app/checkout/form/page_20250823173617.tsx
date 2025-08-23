import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import CheckoutForm from './checkout-form'

export default async function CheckoutFormPage() {
  const session = await auth()
  if (!session?.user) {
    redirect('/sign-in?callbackUrl=/checkout/form')
  }

  return <CheckoutForm />
}
