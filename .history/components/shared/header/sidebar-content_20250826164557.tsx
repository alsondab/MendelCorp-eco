'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { toast } from 'sonner'

export default function SidebarContent() {
  const { data: session, status } = useSession()

  useEffect(() => {
    if (status === 'authenticated' && session) {
      toast(`Welcome back, ${session.user.name}!`)
    }
  }, [session, status])

  return null
}
