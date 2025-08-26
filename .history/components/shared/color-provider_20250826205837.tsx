'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme, resolvedTheme } = useTheme()
  const { color, updateCssVariables } = useColorStore(resolvedTheme || theme || 'light')
  
  React.useEffect(() => {
    updateCssVariables()
  }, [resolvedTheme, color, updateCssVariables])

  return <>{children}</>
}