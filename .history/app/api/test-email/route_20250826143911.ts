import { NextRequest, NextResponse } from 'next/server'
import { sendTestEmail, sendWelcomeEmail, sendCustomEmail } from '@/emails'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      to, 
      type = 'test', 
      subject, 
      message, 
      userName,
      htmlContent,
      textContent 
    } = body

    // Validation des paramètres
    if (!to || typeof to !== 'string') {
      return NextResponse.json(
        { error: 'Adresse email requise et doit être une chaîne de caractères' },
        { status: 400 }
      )
    }

    let result

    // Envoyer l'email selon le type demandé
    switch (type) {
      case 'test':
        result = await sendTestEmail({ 
          to, 
          subject: subject || 'Test Email from MendelCorp', 
          message: message || 'Ceci est un email de test pour vérifier que le système d\'emails fonctionne correctement.' 
        })
        break

      case 'welcome':
        if (!userName) {
          return NextResponse.json(
            { error: 'Nom d\'utilisateur requis pour l\'email de bienvenue' },
            { status: 400 }
          )
        }
        result = await sendWelcomeEmail({ to, userName })
        break

      case 'custom':
        if (!subject || !htmlContent) {
          return NextResponse.json(
            { error: 'Sujet et contenu HTML requis pour l\'email personnalisé' },
            { status: 400 }
          )
        }
        result = await sendCustomEmail({ 
          to, 
          subject, 
          htmlContent, 
          textContent 
        })
        break

      default:
        return NextResponse.json(
          { error: 'Type d\'email non reconnu. Types disponibles: test, welcome, custom' },
          { status: 400 }
        )
    }

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Email envoyé avec succès',
        data: result.data
      })
    } else {
      return NextResponse.json({
        success: false,
        error: result.error
      }, { status: 500 })
    }

  } catch (error) {
    console.error('Erreur lors du test d\'email:', error)
    return NextResponse.json(
      {
        success: false,
        error: `Erreur interne du serveur: ${error instanceof Error ? error.message : 'Unknown error'}`
      },
      { status: 500 }
    )
  }
}

// Route GET pour afficher les informations sur l'API de test
export async function GET() {
  return NextResponse.json({
    message: 'API de test d\'emails MendelCorp',
    endpoints: {
      POST: {
        description: 'Envoyer un email de test',
        body: {
          to: 'string (requis) - Adresse email de destination',
          type: 'string (optionnel) - Type d\'email: test, welcome, custom (défaut: test)',
          subject: 'string (optionnel) - Sujet de l\'email (pour type: test, custom)',
          message: 'string (optionnel) - Message de l\'email (pour type: test)',
          userName: 'string (requis pour type: welcome) - Nom de l\'utilisateur',
          htmlContent: 'string (requis pour type: custom) - Contenu HTML de l\'email',
          textContent: 'string (optionnel pour type: custom) - Version texte de l\'email'
        },
        examples: {
          test: {
            to: 'test@example.com',
            type: 'test',
            subject: 'Mon email de test',
            message: 'Message personnalisé de test'
          },
          welcome: {
            to: 'nouveau@example.com',
            type: 'welcome',
            userName: 'Jean Dupont'
          },
          custom: {
            to: 'client@example.com',
            type: 'custom',
            subject: 'Email personnalisé',
            htmlContent: '<h1>Mon email HTML</h1><p>Contenu personnalisé</p>'
          }
        }
      }
    }
  })
}
