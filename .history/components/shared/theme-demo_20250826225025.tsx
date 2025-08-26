'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

export default function ThemeDemo() {
  return (
    <div className='p-6 space-y-6'>
      <div className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Theme & Color Demo</h1>
        <p className='text-muted-foreground'>
          Testez les différents thèmes et schémas de couleurs
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {/* Primary Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Primary Colors</CardTitle>
            <CardDescription>Couleurs principales du thème</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded bg-primary' />
                <span className='text-sm'>Primary</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded bg-primary-foreground' />
                <span className='text-sm'>Primary Foreground</span>
              </div>
            </div>
            <Button className='w-full'>Primary Button</Button>
          </CardContent>
        </Card>

        {/* Background Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Background Colors</CardTitle>
            <CardDescription>Arrière-plans et cartes</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded bg-background border' />
                <span className='text-sm'>Background</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded bg-card border' />
                <span className='text-sm'>Card</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded bg-muted' />
                <span className='text-sm'>Muted</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Text Colors */}
        <Card>
          <CardHeader>
            <CardTitle>Text Colors</CardTitle>
            <CardDescription>Couleurs du texte</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <p className='text-foreground'>Foreground Text</p>
              <p className='text-muted-foreground'>Muted Text</p>
              <p className='text-card-foreground'>Card Text</p>
            </div>
          </CardContent>
        </Card>

        {/* Interactive Elements */}
        <Card>
          <CardHeader>
            <CardTitle>Interactive Elements</CardTitle>
            <CardDescription>Boutons et éléments interactifs</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex gap-2'>
              <Button variant='default'>Default</Button>
              <Button variant='secondary'>Secondary</Button>
              <Button variant='outline'>Outline</Button>
            </div>
            <div className='flex gap-2'>
              <Button variant='destructive'>Destructive</Button>
              <Button variant='ghost'>Ghost</Button>
            </div>
          </CardContent>
        </Card>

        {/* Borders and Dividers */}
        <Card>
          <CardHeader>
            <CardTitle>Borders & Dividers</CardTitle>
            <CardDescription>Bordures et séparateurs</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='space-y-2'>
              <div className='h-8 border border-border rounded flex items-center justify-center'>
                Border Example
              </div>
              <Separator />
              <div className='h-8 border border-input rounded flex items-center justify-center'>
                Input Border
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges and Status */}
        <Card>
          <CardHeader>
            <CardTitle>Badges & Status</CardTitle>
            <CardDescription>Badges et indicateurs de statut</CardDescription>
          </CardHeader>
          <CardContent className='space-y-4'>
            <div className='flex flex-wrap gap-2'>
              <Badge variant='default'>Default</Badge>
              <Badge variant='secondary'>Secondary</Badge>
              <Badge variant='outline'>Outline</Badge>
              <Badge variant='destructive'>Destructive</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Color Palette */}
      <Card>
        <CardHeader>
          <CardTitle>Color Palette</CardTitle>
          <CardDescription>
            Palette complète des couleurs du thème
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
            {[
              'background',
              'foreground',
              'card',
              'card-foreground',
              'popover',
              'popover-foreground',
              'primary',
              'primary-foreground',
              'secondary',
              'secondary-foreground',
              'muted',
              'muted-foreground',
              'accent',
              'accent-foreground',
              'destructive',
              'destructive-foreground',
              'border',
              'input',
              'ring',
              'radius',
            ].map((color) => (
              <div key={color} className='text-center space-y-2'>
                <div
                  className='w-full h-16 rounded border'
                  style={{
                    backgroundColor: `hsl(var(--${color}))`,
                    borderColor:
                      color === 'background' || color === 'card'
                        ? 'hsl(var(--border))'
                        : 'transparent',
                  }}
                />
                <p className='text-xs text-muted-foreground'>{color}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
