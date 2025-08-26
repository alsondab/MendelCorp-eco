'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { theme } = useTheme()
  const { color, updateCssVariables } = useColorStore(theme)
  
  React.useEffect(() => {
    try {
      updateCssVariables()
    } catch (error) {
      console.warn('Failed to update CSS variables:', error)
    }
  }, [theme, color, updateCssVariables])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
