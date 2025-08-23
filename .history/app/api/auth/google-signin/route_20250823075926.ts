import { SignInWithGoogle } from '@/lib/actions/user.actions'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    const result = await SignInWithGoogle()
    
    if (result?.error) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 400 }
      )
    }
    
    if (result?.url) {
      return NextResponse.json({ 
        success: true, 
        redirectUrl: result.url 
      })
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Google sign in initiated' 
    })
  } catch (error) {
    console.error('Google sign in error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sign in with Google' },
      { status: 500 }
    )
  }
}
