'use server'
import bcrypt from 'bcryptjs'
import { signIn, signOut } from '@/auth'
import { IUserSignIn, IUserSignUp } from '@/types'
import { UserSignUpSchema } from '../validator'
import { connectToDatabase } from '../db'
import User from '../db/models/user.model'
import { formatError } from '../utils'
import { redirect } from 'next/navigation'

export async function signInWithCredentials(user: IUserSignIn) {
  return await signIn('credentials', { ...user, redirect: false })
}
export const SignOut = async () => {
  const redirectTo = await signOut({ redirect: false })
  redirect(redirectTo.redirect)
}