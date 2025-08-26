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
  const { theme, setTheme } = useTheme()
  const { availableColors, color, setColor } = useColorStore(theme)
  const changeTheme = (value: string) => {
    setTheme(value)
  }
  const isMounted = useIsMounted()

  if (!isMounted) {
    return (
      <div className='header-button h-[41px] flex items-center gap-1 px-2'>
        <div className='h-4 w-4 bg-muted rounded animate-pulse' />
        <span className='text-sm text-muted-foreground'>Loading...</span>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='header-button h-[41px] flex items-center gap-1 px-2'>
        {theme === 'dark' ? (
          <>
            <Moon className='h-4 w-4' />
            <span className='hidden sm:inline'>Dark</span>
          </>
        ) : (
          <>
            <Sun className='h-4 w-4' />
            <span className='hidden sm:inline'>Light</span>
          </>
        )}
        <ChevronDownIcon className='h-3 w-3' />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56'>
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={theme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value='dark'>
            <Moon className='h-4 w-4 mr-2' />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='light'>
            <Sun className='h-4 w-4 mr-2' />
            Light
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>

        <DropdownMenuSeparator />
        <DropdownMenuLabel>Color Scheme</DropdownMenuLabel>

        <DropdownMenuRadioGroup
          value={color.name}
          onValueChange={(value) => setColor(value, true)}
        >
          {availableColors.map((c) => (
            <DropdownMenuRadioItem key={c.name} value={c.name}>
              <div
                className='h-4 w-4 mr-2 rounded-full border border-border'
                style={{
                  backgroundColor: `hsl(${c.root['--primary']})`,
                  boxShadow: `inset 0 0 0 1px ${c.name === color.name ? 'hsl(var(--ring))' : 'transparent'}`,
                }}
              />
              {c.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
