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
  const { availableColors, color, setColor, isMounted: colorMounted } = useColorStore(resolvedTheme || theme)
  const changeTheme = (value: string) => {
    setTheme(value)
  }
  const isMounted = useIsMounted()

  // Use resolvedTheme for display to avoid hydration mismatch
  const displayTheme = resolvedTheme || theme

  if (!isMounted || !colorMounted) {
    return (
      <div className='header-button h-[41px] flex items-center gap-1 px-2'>
        <div className='h-4 w-4 bg-muted rounded animate-pulse' />
        <span className='text-sm text-muted-foreground'>Loading...</span>
      </div>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger 
        className='header-button h-[41px] flex items-center gap-1 px-2'
        aria-label="Toggle theme and color scheme"
      >
        {displayTheme === 'dark' ? (
          <>
            <Moon className='h-4 w-4' aria-hidden="true" />
            <span className='hidden sm:inline'>Dark</span>
          </>
        ) : (
          <>
            <Sun className='h-4 w-4' aria-hidden="true" />
            <span className='hidden sm:inline'>Light</span>
          </>
        )}
        <ChevronDownIcon className='h-3 w-3' aria-hidden="true" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className='w-56' align="end">
        <DropdownMenuLabel>Theme</DropdownMenuLabel>

        <DropdownMenuRadioGroup value={displayTheme} onValueChange={changeTheme}>
          <DropdownMenuRadioItem value='dark'>
            <Moon className='h-4 w-4 mr-2' aria-hidden="true" />
            Dark
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value='light'>
            <Sun className='h-4 w-4 mr-2' aria-hidden="true" />
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
                aria-hidden="true"
              />
              {c.name}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
