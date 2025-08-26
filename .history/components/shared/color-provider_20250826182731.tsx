'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

type ColorScheme = 'red' | 'blue' | 'green' | 'purple' | 'orange' | 'pink'

interface ColorContextType {
  color: ColorScheme
  setColor: (color: ColorScheme) => void
}

const ColorContext = createContext<ColorContextType | undefined>(undefined)

export function ColorProvider({ children }: { children: React.ReactNode }) {
  const [color, setColor] = useState<ColorScheme>('blue')
  const { theme, setTheme } = useTheme()

  // Sauvegarder la couleur dans localStorage
  useEffect(() => {
    const savedColor = localStorage.getItem('color-scheme') as ColorScheme
    if (savedColor) {
      setColor(savedColor)
    }
  }, [])

  const handleColorChange = (newColor: ColorScheme) => {
    setColor(newColor)
    localStorage.setItem('color-scheme', newColor)
  }

  return (
    <ColorContext.Provider value={{ color, setColor: handleColorChange }}>
      {children}
    </ColorContext.Provider>
  )
}

export function useColor() {
  const context = useContext(ColorContext)
  if (context === undefined) {
    throw new Error('useColor must be used within a ColorProvider')
  }
  return context
}
