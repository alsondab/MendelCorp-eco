'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import useColorStore from '@/hooks/use-color-store'
import { useTheme } from 'next-themes'

export default function ThemeDemo() {
  const { theme } = useTheme()
  const { availableColors, color, setColor } = useColorStore(theme || 'light')

  return (
    <div className="p-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme & Color Demo</CardTitle>
          <CardDescription>
            Current theme: {theme} | Current color: {color.name}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg bg-background text-foreground">
              <h3 className="font-semibold mb-2">Background</h3>
              <p className="text-sm text-muted-foreground">
                This card uses the current theme's background and foreground colors
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-primary text-primary-foreground">
              <h3 className="font-semibold mb-2">Primary</h3>
              <p className="text-sm opacity-90">
                This card uses the current theme's primary colors
              </p>
            </div>
            
            <div className="p-4 border rounded-lg bg-secondary text-secondary-foreground">
              <h3 className="font-semibold mb-2">Secondary</h3>
              <p className="text-sm opacity-90">
                This card uses the current theme's secondary colors
              </p>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">Available Colors:</h4>
            <div className="flex flex-wrap gap-2">
              {availableColors.map((c) => (
                <Button
                  key={c.name}
                  variant={color.name === c.name ? "default" : "outline"}
                  size="sm"
                  onClick={() => setColor(c.name, true)}
                >
                  {c.name}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
