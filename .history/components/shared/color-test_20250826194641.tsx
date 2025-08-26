'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import useColorStore from '@/hooks/use-color-store'
import { useTheme } from 'next-themes'

export default function ColorTest() {
  const { theme } = useTheme()
  const currentTheme = theme || 'light'
  const { color, cssColors } = useColorStore(currentTheme)

  return (
    <Card className='w-full max-w-2xl'>
      <CardHeader>
        <CardTitle>Color System Debug</CardTitle>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div>
          <p>
            <strong>Current Theme:</strong> {currentTheme}
          </p>
          <p>
            <strong>Selected Color Scheme:</strong> {color.name}
          </p>
        </div>

        <div>
          <h4 className='font-semibold mb-2'>Applied CSS Variables:</h4>
          <div className='grid grid-cols-2 gap-2 text-sm'>
            {Object.entries(cssColors)
              .slice(0, 10)
              .map(([key, value]) => (
                <div key={key} className='flex justify-between'>
                  <span className='font-mono'>{key}:</span>
                  <span className='font-mono'>{value}</span>
                </div>
              ))}
          </div>
        </div>

        <div>
          <h4 className='font-semibold mb-2'>Color Preview:</h4>
          <div className='flex gap-2'>
            <div
              className='w-8 h-8 rounded border'
              style={{ backgroundColor: `var(--primary)` }}
              title='Primary'
            />
            <div
              className='w-8 h-8 rounded border'
              style={{ backgroundColor: `var(--secondary)` }}
              title='Secondary'
            />
            <div
              className='w-8 h-8 rounded border'
              style={{ backgroundColor: `var(--accent)` }}
              title='Accent'
            />
            <div
              className='w-8 h-8 rounded border'
              style={{ backgroundColor: `var(--destructive)` }}
              title='Destructive'
            />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
