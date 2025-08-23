import { NextRequest, NextResponse } from 'next/server'
import { connectToDatabase } from '@/lib/db'
import Order from '@/lib/db/models/order.model'
import User from '@/lib/db/models/user.model'
import { sendPurchaseReceipt } from '@/emails'
import { revalidatePath } from 'next/cache'

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase()
    const { id } = await params

    console.log('Confirmation de commande pour ID:', id)

    // Trouver la commande
    const order = await Order.findById(id).populate('user', 'email')
    if (!order) {
      console.log('Commande non trouvée')
      return NextResponse.json(
        { error: 'Commande non trouvée' },
        { status: 404 }
      )
    }

    console.log('Commande trouvée:', {
      id: order._id,
      paymentMethod: order.paymentMethod,
      isPaid: order.isPaid,
    })

    // Vérifier que c'est bien une commande Cash On Delivery
    if (order.paymentMethod !== 'Cash On Delivery') {
      console.log('Méthode de paiement incorrecte:', order.paymentMethod)
      return NextResponse.json(
        { error: "Cette commande n'est pas en Cash On Delivery" },
        { status: 400 }
      )
    }

    // Vérifier que la commande n'est pas déjà payée
    if (order.isPaid) {
      console.log('Commande déjà payée')
      return NextResponse.json(
        { error: 'Cette commande est déjà confirmée' },
        { status: 400 }
      )
    }

    // Marquer la commande comme confirmée (pour Cash On Delivery)
    // La commande ne sera marquée comme payée qu'après la livraison et le paiement effectif
    order.paymentResult = {
      id: 'CASH_ON_DELIVERY',
      status: 'CONFIRMED',
      email_address: (order.user as { email: string }).email,
      pricePaid: '0', // Pas encore payé
    }

    // Ajouter un statut de confirmation pour Cash On Delivery
    order.isConfirmed = true
    order.confirmedAt = new Date()

    console.log('Mise à jour de la commande...')

    // Sauvegarder la commande
    await order.save()

    console.log("Envoi de l'email...")

    // Envoyer l'email de confirmation
    await sendPurchaseReceipt({ order })

    console.log('Email envoyé avec succès')

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
      {
        error: `Erreur interne du serveur: ${error instanceof Error ? error.message : 'Unknown error'}`,
      },
      { status: 500 }
    )
  }
}
