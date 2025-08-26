'use client'

import { ChevronDownIcon, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import * as React from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'

import useColorStore from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const currentTheme = resolvedTheme || theme
  const { availableColors, color, setColor } = useColorStore(currentTheme)
  const isMounted = useIsMounted()

  const changeTheme = (value: string) => {
    setTheme(value)
  }

  // Ne pas rendre le composant avant le montage pour éviter l'hydration mismatch
  if (!isMounted) {
    return (
      <Button variant='ghost' size='sm' className='h-[41px] w-20'>
        <Sun className='h-4 w-4' />
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='sm' className='h-[41px]'>
          {currentTheme === 'dark' ? (
            <div className='flex items-center gap-1'>
              <Moon className='h-4 w-4' /> Dark{' '}
              <ChevronDownIcon className='h-3 w-3' />
            </div>
          ) : (
            <div className='flex items-center gap-1'>
              <Sun className='h-4 w-4' /> Light{' '}
              <ChevronDownIcon className='h-3 w-3' />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>
        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value='light'>
            <Sun className='h-4 w-4 mr-2' /> Light
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='dark'>
            <Moon className='h-4 w-4 mr-2' /> Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='system'>
            <Sun className='h-4 w-4 mr-2' /> System
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color</DropdownMenuLabel>
        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
        >
          {availableColors.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.name}>
              <div
                style={{
                  backgroundColor: c.name.toLowerCase(),
                  border: '1px solid hsl(var(--border))',
                }}
                className='h-4 w-4 mr-2 rounded-full'
              />
              {c.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
