'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { theme } = useTheme()
  const { updateCssVariables } = useColorStore(theme || 'light')
  
  React.useEffect(() => {
    if (theme) {
      updateCssVariables()
    }
  }, [theme, updateCssVariables])

  return <>{children}</>
}
