/* eslint-disable @typescript-eslint/no-empty-object-type */
// first copy theme color from https://ui.shadcn.com/themes
// then in chatgpt:
// PROMPT: convert this css to js object. don't convert css variable to cameCase

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type ColorState = {
  availableColors: {
    name: string
    root: {}
    dark: {}
  }[]
  defaultColor: string
  userColor?: string
}
const availableColors = [
  {
    name: 'Gold',
    :root {
        --radius: 0.65rem;
        --background: oklch(1 0 0);
        --foreground: oklch(0.141 0.005 285.823);
        --card: oklch(1 0 0);
        --card-foreground: oklch(0.141 0.005 285.823);
        --popover: oklch(1 0 0);
        --popover-foreground: oklch(0.141 0.005 285.823);
        --primary: oklch(0.795 0.184 86.047);
        --primary-foreground: oklch(0.421 0.095 57.708);
        --secondary: oklch(0.967 0.001 286.375);
        --secondary-foreground: oklch(0.21 0.006 285.885);
        --muted: oklch(0.967 0.001 286.375);
        --muted-foreground: oklch(0.552 0.016 285.938);
        --accent: oklch(0.967 0.001 286.375);
        --accent-foreground: oklch(0.21 0.006 285.885);
        --destructive: oklch(0.577 0.245 27.325);
        --border: oklch(0.92 0.004 286.32);
        --input: oklch(0.92 0.004 286.32);
        --ring: oklch(0.795 0.184 86.047);
        --chart-1: oklch(0.646 0.222 41.116);
        --chart-2: oklch(0.6 0.118 184.704);
        --chart-3: oklch(0.398 0.07 227.392);
        --chart-4: oklch(0.828 0.189 84.429);
        --chart-5: oklch(0.769 0.188 70.08);
        --sidebar: oklch(0.985 0 0);
        --sidebar-foreground: oklch(0.141 0.005 285.823);
        --sidebar-primary: oklch(0.795 0.184 86.047);
        --sidebar-primary-foreground: oklch(0.421 0.095 57.708);
        --sidebar-accent: oklch(0.967 0.001 286.375);
        --sidebar-accent-foreground: oklch(0.21 0.006 285.885);
        --sidebar-border: oklch(0.92 0.004 286.32);
        --sidebar-ring: oklch(0.795 0.184 86.047);
      }
      
      .dark {
        --background: oklch(0.141 0.005 285.823);
        --foreground: oklch(0.985 0 0);
        --card: oklch(0.21 0.006 285.885);
        --card-foreground: oklch(0.985 0 0);
        --popover: oklch(0.21 0.006 285.885);
        --popover-foreground: oklch(0.985 0 0);
        --primary: oklch(0.795 0.184 86.047);
        --primary-foreground: oklch(0.421 0.095 57.708);
        --secondary: oklch(0.274 0.006 286.033);
        --secondary-foreground: oklch(0.985 0 0);
        --muted: oklch(0.274 0.006 286.033);
        --muted-foreground: oklch(0.705 0.015 286.067);
        --accent: oklch(0.274 0.006 286.033);
        --accent-foreground: oklch(0.985 0 0);
        --destructive: oklch(0.704 0.191 22.216);
        --border: oklch(1 0 0 / 10%);
        --input: oklch(1 0 0 / 15%);
        --ring: oklch(0.554 0.135 66.442);
        --chart-1: oklch(0.488 0.243 264.376);
        --chart-2: oklch(0.696 0.17 162.48);
        --chart-3: oklch(0.769 0.188 70.08);
        --chart-4: oklch(0.627 0.265 303.9);
        --chart-5: oklch(0.645 0.246 16.439);
        --sidebar: oklch(0.21 0.006 285.885);
        --sidebar-foreground: oklch(0.985 0 0);
        --sidebar-primary: oklch(0.795 0.184 86.047);
        --sidebar-primary-foreground: oklch(0.421 0.095 57.708);
        --sidebar-accent: oklch(0.274 0.006 286.033);
        --sidebar-accent-foreground: oklch(0.985 0 0);
        --sidebar-border: oklch(1 0 0 / 10%);
        --sidebar-ring: oklch(0.554 0.135 66.442);
      }
      ,
  },
  {
    name: 'Green',
    :root {
        --radius: 0.65rem;
        --background: oklch(1 0 0);
        --foreground: oklch(0.141 0.005 285.823);
        --card: oklch(1 0 0);
        --card-foreground: oklch(0.141 0.005 285.823);
        --popover: oklch(1 0 0);
        --popover-foreground: oklch(0.141 0.005 285.823);
        --primary: oklch(0.723 0.219 149.579);
        --primary-foreground: oklch(0.982 0.018 155.826);
        --secondary: oklch(0.967 0.001 286.375);
        --secondary-foreground: oklch(0.21 0.006 285.885);
        --muted: oklch(0.967 0.001 286.375);
        --muted-foreground: oklch(0.552 0.016 285.938);
        --accent: oklch(0.967 0.001 286.375);
        --accent-foreground: oklch(0.21 0.006 285.885);
        --destructive: oklch(0.577 0.245 27.325);
        --border: oklch(0.92 0.004 286.32);
        --input: oklch(0.92 0.004 286.32);
        --ring: oklch(0.723 0.219 149.579);
        --chart-1: oklch(0.646 0.222 41.116);
        --chart-2: oklch(0.6 0.118 184.704);
        --chart-3: oklch(0.398 0.07 227.392);
        --chart-4: oklch(0.828 0.189 84.429);
        --chart-5: oklch(0.769 0.188 70.08);
        --sidebar: oklch(0.985 0 0);
        --sidebar-foreground: oklch(0.141 0.005 285.823);
        --sidebar-primary: oklch(0.723 0.219 149.579);
        --sidebar-primary-foreground: oklch(0.982 0.018 155.826);
        --sidebar-accent: oklch(0.967 0.001 286.375);
        --sidebar-accent-foreground: oklch(0.21 0.006 285.885);
        --sidebar-border: oklch(0.92 0.004 286.32);
        --sidebar-ring: oklch(0.723 0.219 149.579);
      }
      
      .dark {
        --background: oklch(0.141 0.005 285.823);
        --foreground: oklch(0.985 0 0);
        --card: oklch(0.21 0.006 285.885);
        --card-foreground: oklch(0.985 0 0);
        --popover: oklch(0.21 0.006 285.885);
        --popover-foreground: oklch(0.985 0 0);
        --primary: oklch(0.696 0.17 162.48);
        --primary-foreground: oklch(0.393 0.095 152.535);
        --secondary: oklch(0.274 0.006 286.033);
        --secondary-foreground: oklch(0.985 0 0);
        --muted: oklch(0.274 0.006 286.033);
        --muted-foreground: oklch(0.705 0.015 286.067);
        --accent: oklch(0.274 0.006 286.033);
        --accent-foreground: oklch(0.985 0 0);
        --destructive: oklch(0.704 0.191 22.216);
        --border: oklch(1 0 0 / 10%);
        --input: oklch(1 0 0 / 15%);
        --ring: oklch(0.527 0.154 150.069);
        --chart-1: oklch(0.488 0.243 264.376);
        --chart-2: oklch(0.696 0.17 162.48);
        --chart-3: oklch(0.769 0.188 70.08);
        --chart-4: oklch(0.627 0.265 303.9);
        --chart-5: oklch(0.645 0.246 16.439);
        --sidebar: oklch(0.21 0.006 285.885);
        --sidebar-foreground: oklch(0.985 0 0);
        --sidebar-primary: oklch(0.696 0.17 162.48);
        --sidebar-primary-foreground: oklch(0.393 0.095 152.535);
        --sidebar-accent: oklch(0.274 0.006 286.033);
        --sidebar-accent-foreground: oklch(0.985 0 0);
        --sidebar-border: oklch(1 0 0 / 10%);
        --sidebar-ring: oklch(0.527 0.154 150.069);
      },
  },
  {
    name: 'Red',
    root: {
      '--background': '0 0% 100%',
      '--foreground': '0 0% 3.9%',
      '--card': '0 0% 100%',
      '--card-foreground': '0 0% 3.9%',
      '--popover': '0 0% 100%',
      '--popover-foreground': '0 0% 3.9%',
      '--primary': '0 72.2% 50.6%',
      '--primary-foreground': '0 85.7% 97.3%',
      '--secondary': '0 0% 96.1%',
      '--secondary-foreground': '0 0% 9%',
      '--muted': '0 0% 96.1%',
      '--muted-foreground': '0 0% 45.1%',
      '--accent': '0 0% 96.1%',
      '--accent-foreground': '0 0% 9%',
      '--destructive': '0 84.2% 60.2%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '0 0% 89.8%',
      '--input': '0 0% 89.8%',
      '--ring': '0 72.2% 50.6%',
      '--radius': '0.5rem',
      '--chart-1': '12 76% 61%',
      '--chart-2': '173 58% 39%',
      '--chart-3': '197 37% 24%',
      '--chart-4': '43 74% 66%',
      '--chart-5': '27 87% 67%',
    },
    dark: {
      '--background': '0 0% 3.9%',
      '--foreground': '0 0% 98%',
      '--card': '0 0% 3.9%',
      '--card-foreground': '0 0% 98%',
      '--popover': '0 0% 3.9%',
      '--popover-foreground': '0 0% 98%',
      '--primary': '0 72.2% 50.6%',
      '--primary-foreground': '0 85.7% 97.3%',
      '--secondary': '0 0% 14.9%',
      '--secondary-foreground': '0 0% 98%',
      '--muted': '0 0% 14.9%',
      '--muted-foreground': '0 0% 63.9%',
      '--accent': '0 0% 14.9%',
      '--accent-foreground': '0 0% 98%',
      '--destructive': '0 62.8% 30.6%',
      '--destructive-foreground': '0 0% 98%',
      '--border': '0 0% 14.9%',
      '--input': '0 0% 14.9%',
      '--ring': '0 72.2% 50.6%',
      '--chart-1': '220 70% 50%',
      '--chart-2': '160 60% 45%',
      '--chart-3': '30 80% 55%',
      '--chart-4': '280 65% 60%',
      '--chart-5': '340 75% 55%',
    },
  },
]
const initialState: ColorState = {
  availableColors,
  defaultColor: availableColors[0].name,
  userColor: undefined,
}
export const colorStore = create<ColorState>()(
  persist(() => initialState, {
    name: 'colorStore',
  })
)

export default function useColorStore(theme: string = 'light') {
  const colorState = colorStore()
  const getColor = () => {
    const userColor = colorState.availableColors.find(
      (t) => t.name === colorState.userColor
    )
    if (userColor) return userColor
    const defaultColor = colorState.availableColors.find(
      (t) => t.name === colorState.defaultColor
    )
    if (defaultColor) return defaultColor

    return colorState.availableColors[0]
  }

  const color = getColor()
  const cssColors: { [key: string]: string } =
    theme === 'light' ? color.root : color.dark
  return {
    availableColors,
    cssColors,
    color,
    getColor,
    setColor: (name: string, isUserColor?: boolean) => {
      colorStore.setState(
        isUserColor ? { userColor: name } : { defaultColor: name }
      )
    },
    updateCssVariables: () => {
      const color = getColor()
      const colors: { [key: string]: string } =
        theme === 'light' ? color.root : color.dark
      for (const key in colors) {
        document.documentElement.style.setProperty(key, colors[key])
      }
    },
  }
}
