import { NextRequest, NextResponse } from 'next/server'
import { testEmailConfiguration } from '@/emails'

export async function POST(request: NextRequest) {
  try {
    console.log('Test de configuration email demandé...')
    
    const result = await testEmailConfiguration()
    
    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Test email réussi',
        data: result.data
      })
    } else {
      return NextResponse.json({
        success: false,
        message: 'Test email échoué',
        error: result.error
      }, { status: 500 })
    }
  } catch (error) {
    console.error('Erreur lors du test email:', error)
    return NextResponse.json({
      success: false,
      message: 'Erreur lors du test email',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
