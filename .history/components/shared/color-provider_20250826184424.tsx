'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'
export function ColorProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const { theme, resolvedTheme } = useTheme()
  const { updateCssVariables } = useColorStore(resolvedTheme || 'light')
  
  React.useEffect(() => {
    if (resolvedTheme) {
      console.log('ColorProvider: Theme changed to', resolvedTheme)
      updateCssVariables()
    }
  }, [resolvedTheme, updateCssVariables])

  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
