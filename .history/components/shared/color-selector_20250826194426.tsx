'use client'

import { Button } from '@/components/ui/button'
import useColorStore from '@/hooks/use-color-store'
import { useTheme } from 'next-themes'

export default function ColorSelector() {
  const { theme } = useTheme()
  const currentTheme = theme || 'light'
  const { availableColors, color, setColor } = useColorStore(currentTheme)

  return (
    <div className="flex flex-wrap gap-2 p-4">
      <h3 className="w-full text-sm font-medium mb-2">Color Scheme</h3>
      {availableColors.map((colorScheme) => (
        <Button
          key={colorScheme.name}
          variant={color.name === colorScheme.name ? "default" : "outline"}
          size="sm"
          onClick={() => setColor(colorScheme.name)}
          className="capitalize"
        >
          {colorScheme.name}
        </Button>
      ))}
    </div>
  )
}
