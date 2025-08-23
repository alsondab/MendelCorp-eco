import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Order from '@/lib/db/models/order.model'
import { sendPurchaseReceipt } from '@/emails'
import { revalidatePath } from 'next/cache'

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDatabase()
    const { id } = params

    // Trouver la commande
    const order = await Order.findById(id).populate('user', 'email')
    if (!order) {
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    // Vérifier que c'est bien une commande Cash On Delivery
    if (order.paymentMethod !== 'Cash On Delivery') {
      return NextResponse.json(
        { error: 'Cette commande n\'est pas en Cash On Delivery' },
        { status: 400 }
      )
    }

    // Vérifier que la commande n'est pas déjà payée
    if (order.isPaid) {
      return NextResponse.json(
        { error: 'Cette commande est déjà confirmée' },
        { status: 400 }
      )
    }

    // Marquer la commande comme payée (pour Cash On Delivery)
    order.isPaid = true
    order.paidAt = new Date()
    order.paymentResult = {
      id: 'CASH_ON_DELIVERY',
      status: 'CONFIRMED',
      email_address: (order.user as any).email,
      pricePaid: order.totalPrice.toString(),
    }

    // Sauvegarder la commande
    await order.save()

    // Envoyer l'email de confirmation
    await sendPurchaseReceipt({ order })

    // Revalider le cache
    revalidatePath(`/account/orders/${id}`)

    return NextResponse.json({
      success: true,
      message: 'Commande confirmée avec succès',
      orderId: id,
    })
  } catch (error) {
    console.error('Erreur lors de la confirmation de la commande:', error)
    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    )
  }
}
