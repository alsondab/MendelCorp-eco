import { Resend } from 'resend'
import PurchaseReceiptEmail from './purchase-receipt'
import { IOrder } from '@/lib/db/models/order.model'
import { SENDER_EMAIL, SENDER_NAME } from '@/lib/constants'
import { formatId } from '@/lib/utils'

const resend = new Resend(process.env.RESEND_API_KEY as string)

export const sendPurchaseReceipt = async ({ order }: { order: IOrder }) => {
  await resend.emails.send({
    from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
    to: (order.user as { email: string }).email,
    subject: `Order ${formatId(order._id.toString())} Confirmation`,
    react: <PurchaseReceiptEmail order={order} />,
  })
}

// Fonction de test d'email - Envoie un email simple vers n'importe quelle adresse
export const sendTestEmail = async ({
  to,
  subject = 'Test Email from MendelCorp',
  message = 'This is a test email to verify that the email system is working correctly.',
}: {
  to: string
  subject?: string
  message?: string
}) => {
  try {
    const result = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: [to],
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            ${SENDER_NAME} - Test Email
          </h2>
          <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #666; font-size: 16px; line-height: 1.6;">
              ${message}
            </p>
          </div>
          <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="color: #999; font-size: 14px;">
              Cet email a été envoyé depuis votre système MendelCorp pour tester la fonctionnalité d'envoi d'emails.
            </p>
            <p style="color: #999; font-size: 12px; margin-top: 10px;">
              Timestamp: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `,
    })

    console.log('✅ Email de test envoyé avec succès:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email de test:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Fonction d'email générique - Envoie un email personnalisé avec HTML
export const sendCustomEmail = async ({
  to,
  subject,
  htmlContent,
  textContent,
}: {
  to: string | string[]
  subject: string
  htmlContent: string
  textContent?: string
}) => {
  try {
    const result = await resend.emails.send({
      from: `${SENDER_NAME} <${SENDER_EMAIL}>`,
      to: Array.isArray(to) ? to : [to],
      subject: subject,
      html: htmlContent,
      text: textContent,
    })

    console.log('✅ Email personnalisé envoyé avec succès:', result)
    return { success: true, data: result }
  } catch (error) {
    console.error("❌ Erreur lors de l'envoi de l'email personnalisé:", error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}

// Fonction de test avec email de réception de MendelCorp
export const sendWelcomeEmail = async ({
  to,
  userName,
}: {
  to: string
  userName: string
}) => {
  const htmlContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
      <div style="background-color: white; padding: 30px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #007bff; margin: 0; font-size: 28px;">Bienvenue chez ${SENDER_NAME} !</h1>
        </div>
        
        <div style="margin-bottom: 25px;">
          <p style="color: #333; font-size: 16px; line-height: 1.6; margin: 0;">
            Bonjour <strong>${userName}</strong>,
          </p>
          <p style="color: #666; font-size: 16px; line-height: 1.6; margin: 15px 0;">
            Nous sommes ravis de vous accueillir dans notre communauté ! Votre compte a été créé avec succès.
          </p>
        </div>
        
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; border-left: 4px solid #007bff; margin: 25px 0;">
          <h3 style="color: #1976d2; margin: 0 0 15px 0;">🎉 Ce que vous pouvez faire maintenant :</h3>
          <ul style="color: #424242; margin: 0; padding-left: 20px;">
            <li>Parcourir nos produits de surveillance vidéo</li>
            <li>Découvrir nos équipements informatiques</li>
            <li>Profiter de nos offres spéciales</li>
            <li>Suivre vos commandes en temps réel</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'}" 
             style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
            Commencer à magasiner
          </a>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 20px; margin-top: 30px;">
          <p style="color: #999; font-size: 14px; text-align: center; margin: 0;">
            Si vous avez des questions, n'hésitez pas à nous contacter.
          </p>
          <p style="color: #999; font-size: 12px; text-align: center; margin: 10px 0 0 0;">
            © 2025 ${SENDER_NAME}. Tous droits réservés.
          </p>
        </div>
      </div>
    </div>
  `

  return await sendCustomEmail({
    to,
    subject: `Bienvenue chez ${SENDER_NAME}, ${userName} !`,
    htmlContent,
    textContent: `Bienvenue chez ${SENDER_NAME}, ${userName} ! Nous sommes ravis de vous accueillir.`,
  })
}
