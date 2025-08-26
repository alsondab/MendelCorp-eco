'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'

interface SidebarContentProps {
  userName?: string
  isAuthenticated: boolean
}

export default function SidebarContent({
  userName,
  isAuthenticated,
}: SidebarContentProps) {
  useEffect(() => {
    if (isAuthenticated && userName) {
      toast(`Welcome back, ${userName}!`)
    }
  }, [isAuthenticated, userName])

  return null
}
