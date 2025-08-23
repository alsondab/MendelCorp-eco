'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { PAYMENT_CATEGORIES } from '@/lib/constants'

interface PaymentMethodSelectorProps {
  selectedMethod: string
  onMethodSelect: (method: string) => void
  onContinue: () => void
}

export default function PaymentMethodSelector({
  selectedMethod,
  onMethodSelect,
  onContinue,
}: PaymentMethodSelectorProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set()
  )

  const toggleCategory = (categoryName: string) => {
    const newExpanded = new Set(expandedCategories)
    if (newExpanded.has(categoryName)) {
      newExpanded.delete(categoryName)
    } else {
      newExpanded.add(categoryName)
    }
    setExpandedCategories(newExpanded)
  }

  return (
    <Card className='md:ml-8 my-4'>
      <CardContent className='p-4'>
        <div className='space-y-4'>
          {PAYMENT_CATEGORIES.map((category) => (
            <div key={category.name} className='border rounded-lg p-4'>
              <h3 className='font-semibold text-lg mb-4'>{category.name}</h3>
              <RadioGroup
                value={selectedMethod}
                onValueChange={onMethodSelect}
                className='space-y-3'
              >
                {category.methods.map((method) => (
                  <div
                    key={method.name}
                    className='flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors'
                  >
                    <RadioGroupItem
                      value={method.name}
                      id={`payment-${method.name}`}
                    />
                    <Label
                      htmlFor={`payment-${method.name}`}
                      className='flex-1 cursor-pointer'
                    >
                      <div className='flex items-center space-x-2'>
                        <span className='font-medium text-lg'>{method.name}</span>
                      </div>
                      <div className='text-sm text-gray-600 mt-1'>
                        {method.description}
                      </div>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className='p-4'>
        <Button
          onClick={onContinue}
          className='rounded-full font-bold w-full'
          disabled={!selectedMethod}
        >
          Utiliser cette méthode de paiement
        </Button>
      </CardFooter>
    </Card>
  )
}
