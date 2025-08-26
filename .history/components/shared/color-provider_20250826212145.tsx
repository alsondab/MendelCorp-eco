'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const { theme, resolvedTheme } = useTheme()
  const { updateCssVariables } = useColorStore(resolvedTheme || 'light')

  React.useEffect(() => {
    updateCssVariables()
  }, [resolvedTheme, updateCssVariables])

  return <>{children}</>
}
