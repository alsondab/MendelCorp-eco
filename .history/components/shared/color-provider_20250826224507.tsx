'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme()
  const { updateCssVariables } = useColorStore(resolvedTheme || 'light')
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (mounted && resolvedTheme) {
      updateCssVariables()
    }
  }, [mounted, resolvedTheme, updateCssVariables])

  // Ne pas appliquer les couleurs avant que le composant soit monté côté client
  if (!mounted) {
    return <>{children}</>
  }

  return <>{children}</>
}
