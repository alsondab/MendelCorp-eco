'use client'

import * as React from 'react'
import { ColorProvider } from './color-provider'

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof ColorProvider>) {
  return (
    <ColorProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      {...props}
    >
      {children}
    </ColorProvider>
  )
}