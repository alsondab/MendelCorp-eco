'use client'

import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from '@paypal/react-paypal-js'
import { Card, CardContent } from '@/components/ui/card'
import { toast } from 'sonner'
import {
  approvePayPalOrder,
  createPayPalOrder,
} from '@/lib/actions/order.actions'
import { IOrder } from '@/lib/db/models/order.model'
import { formatDateTime } from '@/lib/utils'

import CheckoutFooter from '../checkout-footer'
import { redirect, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import ProductPrice from '@/components/shared/product/product-price'

export default function OrderPaymentForm({
  order,
  paypalClientId,
}: {
  order: IOrder
  paypalClientId: string
  isAdmin: boolean
}) {
  const router = useRouter()
  const {
    shippingAddress,
    items,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentMethod,
    expectedDeliveryDate,
    isPaid,
  } = order

  if (isPaid) {
    redirect(`/account/orders/${order._id}`)
  }

  function PrintLoadingState() {
    const [{ isPending, isRejected }] = usePayPalScriptReducer()
    let status = ''
    if (isPending) {
      status = 'Loading PayPal...'
    } else if (isRejected) {
      status = 'Error in loading PayPal.'
    }
    return status
  }

  const handleCreatePayPalOrder = async () => {
    const res = await createPayPalOrder(order._id)
    if (!res.success) return toast.error(res.message)
    return res.data
  }

  const handleApprovePayPalOrder = async (data: { orderID: string }) => {
    const res = await approvePayPalOrder(order._id, data)
    if (res.success) {
      toast.success(res.message)
      router.push(`/account/orders/${order._id}`)
    } else {
      toast.error(res.message)
    }
  }

  // Gestion des paiements mobiles
  const handleMobilePayment = async (provider: string) => {
    // Ici vous devrez implémenter la logique pour chaque fournisseur de paiement mobile
    toast.info(`Redirection vers ${provider} en cours...`)
    // Pour l'instant, on simule un paiement réussi
    setTimeout(() => {
      toast.success(`Paiement via ${provider} réussi !`)
      router.push(`/account/orders/${order._id}`)
    }, 2000)
  }



  // Gestion du paiement à la livraison
  const handleCashOnDelivery = async () => {
    try {
      // Marquer la commande comme payée (pour Cash On Delivery)
      const response = await fetch(`/api/orders/${order._id}/confirm-cod`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        toast.success(
          'Commande confirmée ! Un email de confirmation a été envoyé à votre boîte mail.'
        )
        router.push(`/account/orders/${order._id}`)
      } else {
        const errorData = await response.json()
        console.error('Erreur API:', errorData)
        toast.error(
          `Erreur: ${errorData.error || 'Erreur lors de la confirmation de la commande'}`
        )
      }
    } catch (error) {
      console.error('Erreur fetch:', error)
      toast.error('Erreur lors de la confirmation de la commande')
    }
  }

  const CheckoutSummary = () => (
    <Card>
      <CardContent className='p-4'>
        <div>
          <div className='text-lg font-bold'>Order Summary</div>
          <div className='space-y-2'>
            <div className='flex justify-between'>
              <span>Items:</span>
              <span>
                {' '}
                <ProductPrice price={itemsPrice} plain />
              </span>
            </div>
            <div className='flex justify-between'>
              <span>Shipping & Handling:</span>
              <span>
                {shippingPrice === undefined ? (
                  '--'
                ) : shippingPrice === 0 ? (
                  'FREE'
                ) : (
                  <ProductPrice price={shippingPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between'>
              <span> Tax:</span>
              <span>
                {taxPrice === undefined ? (
                  '--'
                ) : (
                  <ProductPrice price={taxPrice} plain />
                )}
              </span>
            </div>
            <div className='flex justify-between  pt-1 font-bold text-lg'>
              <span> Order Total:</span>
              <span>
                {' '}
                <ProductPrice price={totalPrice} plain />
              </span>
            </div>

            {/* Boutons de paiement selon la méthode choisie */}
            {!isPaid && !order.isConfirmed && (
              <div className='pt-4 space-y-3'>
                {paymentMethod === 'PayPal' && (
                  <div>
                    <PayPalScriptProvider
                      options={{ clientId: paypalClientId }}
                    >
                      <PrintLoadingState />
                      <PayPalButtons
                        createOrder={handleCreatePayPalOrder}
                        onApprove={handleApprovePayPalOrder}
                      />
                    </PayPalScriptProvider>
                  </div>
                )}

                {/* Stripe temporairement désactivé
                {paymentMethod === 'Stripe' && (
                  <Button
                    onClick={handleStripePayment}
                    className='w-full rounded-full bg-blue-600 hover:bg-blue-700'
                  >
                    Payer avec Stripe
                  </Button>
                )}
                */}

                {['Orange Money', 'MTN Money', 'Moov Money', 'Wave'].includes(
                  paymentMethod
                ) && (
                  <Button
                    onClick={() => handleMobilePayment(paymentMethod)}
                    className='w-full rounded-full bg-orange-600 hover:bg-orange-700'
                  >
                    Payer avec {paymentMethod}
                  </Button>
                )}

                {paymentMethod === 'Cash On Delivery' && (
                  <Button
                    onClick={handleCashOnDelivery}
                    className='w-full rounded-full bg-green-600 hover:bg-green-700'
                  >
                    Confirmer la commande (Paiement à la livraison)
                  </Button>
                )}
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <main className='max-w-6xl mx-auto'>
      <div className='grid md:grid-cols-4 gap-6'>
        <div className='md:col-span-3'>
          {/* Shipping Address */}
          <div>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Shipping Address</span>
              </div>
              <div className='col-span-2'>
                <p>
                  {shippingAddress.fullName} <br />
                  {shippingAddress.street} <br />
                  {`${shippingAddress.city}, ${shippingAddress.province}, ${shippingAddress.postalCode}, ${shippingAddress.country}`}
                </p>
              </div>
            </div>
          </div>

          {/* payment method */}
          <div className='border-y'>
            <div className='grid md:grid-cols-3 my-3 pb-3'>
              <div className='text-lg font-bold'>
                <span>Payment Method</span>
              </div>
              <div className='col-span-2'>
                <p className='font-semibold text-lg'>{paymentMethod}</p>
                <p className='text-sm text-gray-600 mt-1'>
                  {paymentMethod === 'PayPal' && 'Paiement sécurisé via PayPal'}
                  {paymentMethod === 'Stripe' &&
                    'Paiement par carte bancaire via Stripe'}
                  {['Orange Money', 'MTN Money', 'Moov Money', 'Wave'].includes(
                    paymentMethod
                  ) && 'Paiement mobile sécurisé'}
                  {paymentMethod === 'Cash On Delivery' &&
                    'Paiement à la livraison'}
                </p>

                {/* Statut pour Cash On Delivery */}
                {paymentMethod === 'Cash On Delivery' &&
                  order.isConfirmed &&
                  !order.isPaid && (
                    <div className='mt-2'>
                      <span className='inline-block bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full'>
                        Commande confirmée - Paiement à la livraison
                      </span>
                    </div>
                  )}

                {/* Statut pour les autres méthodes de paiement */}
                {order.isPaid && (
                  <div className='mt-2'>
                    <span className='inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full'>
                      Payé le {order.paidAt?.toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className='grid md:grid-cols-3 my-3 pb-3'>
            <div className='flex text-lg font-bold'>
              <span>Items and shipping</span>
            </div>
            <div className='col-span-2'>
              <p>
                Delivery date:
                {formatDateTime(expectedDeliveryDate).dateOnly}
              </p>
              <ul className='mt-2 space-y-1'>
                {items.map((item) => (
                  <li key={item.slug} className='flex justify-between'>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>
                      <ProductPrice price={item.price} plain />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className='block md:hidden'>
            <CheckoutSummary />
          </div>

          <CheckoutFooter />
        </div>
        <div className='hidden md:block'>
          <CheckoutSummary />
        </div>
      </div>
    </main>
  )
}
