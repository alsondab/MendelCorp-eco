import { SignOut } from '@/lib/actions/user.actions'
import { NextResponse } from 'next/server'

export async function POST() {
  try {
    await SignOut()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Sign out error:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to sign out' },
      { status: 500 }
    )
  }
}
