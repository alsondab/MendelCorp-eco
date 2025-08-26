'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const { resolvedTheme } = useTheme()
  const { updateCssVariables, color } = useColorStore(resolvedTheme || 'light')
  
  React.useEffect(() => {
    // Only update colors when theme is resolved and component is mounted
    if (resolvedTheme) {
      updateCssVariables()
    }
  }, [resolvedTheme, updateCssVariables])

  // Also update colors when the color changes
  React.useEffect(() => {
    if (resolvedTheme) {
      updateCssVariables()
    }
  }, [color.name, resolvedTheme, updateCssVariables])

  return <>{children}</>
}
