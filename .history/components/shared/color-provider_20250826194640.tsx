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
  const { updateCssVariables, color } = useColorStore(currentTheme)

  React.useEffect(() => {
    console.log('ColorUpdater mounted, theme:', currentTheme)
    console.log('Selected color scheme:', color.name)
    // Mettre à jour les couleurs au montage
    updateCssVariables()
  }, []) // Seulement au montage

  React.useEffect(() => {
    console.log('Theme changed to:', currentTheme)
    console.log('Selected color scheme:', color.name)
    // Mettre à jour les couleurs quand le thème change
    if (currentTheme) {
      updateCssVariables()
    }
  }, [currentTheme, updateCssVariables, color.name])

  return <>{children}</>
}
