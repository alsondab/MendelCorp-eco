import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/models/order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
import { formatId } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  try {
    console.log('Tentative d\'envoi d\'email pour la commande:', order._id)
    console.log('Destinataire:', (order.user as { email: string }).email)
    console.log('Clé API Resend:', process.env.RESEND_API_KEY ? 'Présente' : 'Manquante')
    
    const result = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: (order.user as { email: string }).email,
      subject: `Order ${formatId(order._id.toString())} Confirmation`,
      react: <PurchaseReceiptEmail order={order} />,
    })
    
    console.log('Email envoyé avec succès via Resend:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error)
    console.error('Détails de la commande:', {
      orderId: order._id,
      userEmail: (order.user as { email: string }).email,
      paymentMethod: order.paymentMethod,
      isPaid: order.isPaid
    })
    
    // Re-lancer l'erreur pour la gestion en amont
    throw error
  }
}
