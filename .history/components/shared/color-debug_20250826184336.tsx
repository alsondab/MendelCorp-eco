'use client'

import { Button } from '@/components/ui/button'
import useColorStore from '@/hooks/use-color-store'
import { useTheme } from 'next-themes'

export default function ColorDebug() {
  const { theme, resolvedTheme } = useTheme()
  const { color, setColor, availableColors, updateCssVariables } =
    useColorStore(resolvedTheme || 'light')

  const handleColorChange = (colorName: string) => {
    console.log('🔴 DEBUG: Clicking color:', colorName)
    setColor(colorName, true)

    // Force update après un délai
    setTimeout(() => {
      console.log('🔴 DEBUG: Forcing update after delay')
      updateCssVariables()
    }, 100)
  }

  const forceUpdate = () => {
    console.log('🔴 DEBUG: Force update clicked')
    updateCssVariables()
  }

  return (
    <div className='fixed top-20 right-4 bg-white border p-4 rounded-lg shadow-lg z-50'>
      <h3 className='font-bold mb-2'>🔴 Color Debug</h3>
      <div className='text-xs mb-2'>
        <div>Theme: {theme}</div>
        <div>Resolved: {resolvedTheme}</div>
        <div>Current Color: {color?.name}</div>
      </div>

      <div className='space-y-2'>
        {availableColors.map((c) => (
          <Button
            key={c.name}
            size='sm'
            variant={color?.name === c.name ? 'default' : 'outline'}
            onClick={() => handleColorChange(c.name)}
            className='w-full'
          >
            {c.name}
          </Button>
        ))}
      </div>

      <Button onClick={forceUpdate} size='sm' className='w-full mt-2'>
        Force Update
      </Button>
    </div>
  )
}
