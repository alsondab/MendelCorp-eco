'use client'

import * as React from 'react'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import useColorStore, { useThemeChange } from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'

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

// Composant de debug pour voir les couleurs appliquées
function ColorDebug() {
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme || theme || 'light'
  const { color } = useColorStore(currentTheme)
  const isMounted = useIsMounted()
  
  // Ne pas rendre avant que le composant soit monté côté client
  if (!isMounted) {
    return null
  }
  
  return (
    <div style={{ 
      position: 'fixed', 
      top: '10px', 
      right: '10px', 
      background: 'var(--background)', 
      color: 'var(--foreground)',
      padding: '10px',
      border: '1px solid var(--border)',
      borderRadius: '8px',
      fontSize: '12px',
      zIndex: 9999
    }}>
      <div>Theme: {currentTheme}</div>
      <div>Color: {color.name}</div>
      <div style={{ 
        width: '20px', 
        height: '20px', 
        background: 'var(--primary)',
        borderRadius: '4px'
      }}></div>
    </div>
  )
}

// Composant séparé pour gérer la mise à jour des couleurs
function ColorUpdater({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme || theme || 'light'
  const { updateCssVariables, color } = useColorStore(currentTheme)
  const forceUpdate = useThemeChange()
  const isMounted = useIsMounted()

  React.useEffect(() => {
    if (!isMounted) return
    
    console.log('ColorUpdater mounted, theme:', currentTheme)
    console.log('Selected color scheme:', color.name)
    // Mettre à jour les couleurs au montage avec un délai pour s'assurer que le DOM est prêt
    const timer = setTimeout(() => {
      updateCssVariables()
      forceUpdate() // Forcer le re-render
    }, 100)
    return () => clearTimeout(timer)
  }, [isMounted]) // Seulement au montage

  React.useEffect(() => {
    if (!isMounted) return
    
    console.log('Theme changed to:', currentTheme)
    console.log('Selected color scheme:', color.name)
    // Mettre à jour les couleurs quand le thème change
    if (currentTheme) {
      const timer = setTimeout(() => {
        updateCssVariables()
        forceUpdate() // Forcer le re-render
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [currentTheme, color.name, isMounted])

  return (
    <>
      {children}
      {isMounted && <ColorDebug />}
    </>
  )
}