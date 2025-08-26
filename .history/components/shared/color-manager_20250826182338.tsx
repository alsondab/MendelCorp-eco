'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export function ColorManager() {
  const { theme } = useTheme()
  const { color, updateCssVariables } = useColorStore(theme)

  React.useEffect(() => {
    updateCssVariables()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme, color])

  return null
}
