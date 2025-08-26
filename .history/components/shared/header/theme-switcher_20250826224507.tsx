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

import useColorStore from '@/hooks/use-color-store'
import useIsMounted from '@/hooks/use-is-mounted'

export default function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const { availableColors, color, setColor } = useColorStore(
    resolvedTheme || 'light'
  )
  const isMounted = useIsMounted()

  const changeTheme = (value: string) => {
    setTheme(value)
  }

  // Fonction pour obtenir la couleur primaire d'un thème
  const getPrimaryColor = (colorName: string, isDark: boolean) => {
    const colorTheme = availableColors.find((c) => c.name === colorName)
    if (!colorTheme) return '#000000'

    const colors = isDark ? colorTheme.dark : colorTheme.root
    const primary = colors['--primary']

    if (primary) {
      // Convertir HSL en hex ou utiliser directement
      if (primary.includes('%')) {
        // Format HSL, convertir en couleur visible
        const [h, s, l] = primary.split(' ').map((v) => parseFloat(v))
        return `hsl(${h}, ${s}%, ${l}%)`
      }
      return primary
    }
    return '#000000'
  }

  // Ne pas rendre le composant avant qu'il soit monté côté client
  if (!isMounted) {
    return (
      <div className='header-button h-[41px] flex items-center gap-1'>
        <div className='h-4 w-4' />
        <span>Loading...</span>
        <ChevronDownIcon />
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='header-button h-[41px]'>
        {resolvedTheme === 'dark' ? (
          <div className='flex items-center gap-1'>
            <Moon className='h-4 w-4' /> Dark <ChevronDownIcon />
          </div>
        ) : (
          <div className='flex items-center gap-1'>
            <Sun className='h-4 w-4' /> Light <ChevronDownIcon />
          </div>
        )}
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={resolvedTheme}
          onValueChange={changeTheme}
        >
          <DropdownMenuRadioItem value='dark'>
            <Moon className='h-4 w-4 mr-1' /> Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='light'>
            <Sun className='h-4 w-4 mr-1' /> Light
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
                  backgroundColor: getPrimaryColor(
                    c.name,
                    resolvedTheme === 'dark'
                  ),
                  border: '1px solid hsl(var(--border))',
                }}
                className='h-4 w-4 mr-1 rounded-full'
              />
              {c.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
