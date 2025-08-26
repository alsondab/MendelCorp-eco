'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { theme, resolvedTheme } = useTheme()
  const { color, updateCssVariables } = useColorStore(resolvedTheme || theme)
  const [isMounted, setIsMounted] = React.useState(false)
  
  React.useEffect(() => {
    setIsMounted(true)
  }, [])
  
  React.useEffect(() => {
    if (!isMounted) return
    
    try {
      updateCssVariables()
    } catch (error) {
      console.warn('Failed to update CSS variables:', error)
    }
  }, [resolvedTheme, color, updateCssVariables, isMounted])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
