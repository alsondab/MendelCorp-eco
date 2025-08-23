'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { ChevronRight } from 'lucide-react'

interface AccordionItemProps {
  title: string
  children: React.ReactNode
  isExpanded: boolean
  onToggle: () => void
  className?: string
}

interface AccordionProps {
  children: React.ReactNode
  className?: string
}

export function AccordionItem({ 
  title, 
  children, 
  isExpanded, 
  onToggle, 
  className 
}: AccordionItemProps) {
  return (
    <div className={cn('border rounded-lg overflow-hidden', className)}>
      <button
        type='button'
        onClick={onToggle}
        className='w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors duration-200'
      >
        <span className='font-semibold text-left'>{title}</span>
        <div className={cn(
          'transition-transform duration-300 ease-in-out',
          isExpanded ? 'rotate-90' : 'rotate-0'
        )}>
          <ChevronRight className='h-4 w-4' />
        </div>
      </button>

      <div
        className={cn(
          'overflow-hidden transition-all duration-300 ease-in-out',
          isExpanded 
            ? 'max-h-[500px] opacity-100' 
            : 'max-h-0 opacity-0'
        )}
      >
        <div className='px-3 pb-3 border-t'>
          {children}
        </div>
      </div>
    </div>
  )
}

export function Accordion({ children, className }: AccordionProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  )
}

// Hook personnalisé pour gérer l'état accordéon
export function useAccordion() {
  const [expandedItem, setExpandedItem] = React.useState<string | null>(null)

  const toggleItem = (itemId: string) => {
    if (expandedItem === itemId) {
      setExpandedItem(null)
    } else {
      setExpandedItem(itemId)
    }
  }

  const isExpanded = (itemId: string) => expandedItem === itemId

  return {
    expandedItem,
    toggleItem,
    isExpanded,
  }
}
