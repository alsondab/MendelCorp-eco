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
  const { availableColors, color, setColor } = useColorStore(resolvedTheme || 'light')
  const isMounted = useIsMounted()
  
  const changeTheme = (value: string) => {
    setTheme(value)
  }

  // Get the current theme for display (use resolvedTheme for actual theme, fallback to theme for display)
  const currentTheme = isMounted ? (resolvedTheme || theme) : 'light'
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='header-button h-[41px]'>
        {currentTheme === 'dark' ? (
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

        <DropdownMenuRadioGroup value={currentTheme} onValueChange={changeTheme}>
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
                style={{ backgroundColor: c.name }}
                className='h-4 w-4 mr-1 rounded-full'
              ></div>

              {c.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
