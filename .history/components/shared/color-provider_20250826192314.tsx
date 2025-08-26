'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <ColorUpdater>{children}</ColorUpdater>
    </NextThemesProvider>
  )
}

// Composant séparé pour gérer la mise à jour des couleurs
function ColorUpdater({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme || theme || 'light'
  const { updateCssVariables } = useColorStore(currentTheme)

  React.useEffect(() => {
    // Attendre que le thème soit résolu avant de mettre à jour
    if (currentTheme) {
      updateCssVariables()
    }
  }, [currentTheme, updateCssVariables])

  return <>{children}</>
}
