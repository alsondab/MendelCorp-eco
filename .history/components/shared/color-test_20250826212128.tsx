'use client'

import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'

export default function ColorTest() {
  const { theme, resolvedTheme } = useTheme()
  const { color, availableColors, setColor, colorState } = useColorStore(
    resolvedTheme || 'light'
  )
  const isMounted = useIsMounted()

  if (!isMounted) {
    return <div className='p-4'>Loading...</div>
  }

  return (
    <div className='p-4 space-y-4'>
      <div className='text-lg font-bold'>
        Current Theme: {resolvedTheme || theme}
      </div>

      <div className='text-lg font-bold'>Current Color: {color.name}</div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>Store State:</h3>
        <div className='text-sm space-y-1'>
          <div>User Color: {colorState.userColor || 'None'}</div>
          <div>Default Color: {colorState.defaultColor}</div>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>Available Colors:</h3>
        <div className='flex gap-2'>
          {availableColors.map((c) => (
            <button
              key={c.name}
              onClick={() => setColor(c.name, true)}
              className={`px-3 py-2 rounded border ${
                color.name === c.name ? 'border-primary' : 'border-gray-300'
              }`}
              style={{
                backgroundColor:
                  c.name === 'Gold'
                    ? '#FFD700'
                    : c.name === 'Green'
                      ? '#22C55E'
                      : '#EF4444',
              }}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>Color Preview:</h3>
        <div className='grid grid-cols-2 gap-4'>
          <div
            className='p-4 rounded border'
            style={{
              backgroundColor: 'var(--background)',
              color: 'var(--foreground)',
            }}
          >
            Background/Foreground
          </div>
          <div
            className='p-4 rounded border'
            style={{
              backgroundColor: 'var(--primary)',
              color: 'var(--primary-foreground)',
            }}
          >
            Primary
          </div>
          <div
            className='p-4 rounded border'
            style={{
              backgroundColor: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
            }}
          >
            Secondary
          </div>
          <div
            className='p-4 rounded border'
            style={{
              backgroundColor: 'var(--accent)',
              color: 'var(--accent-foreground)',
            }}
          >
            Accent
          </div>
        </div>
      </div>

      <div className='space-y-2'>
        <h3 className='font-semibold'>Debug Info:</h3>
        <div className='text-sm space-y-1'>
          <div>Theme: {theme}</div>
          <div>Resolved Theme: {resolvedTheme}</div>
          <div>Is Mounted: {isMounted ? 'Yes' : 'No'}</div>
          <div>Color Name: {color.name}</div>
        </div>
      </div>
    </div>
  )
}
