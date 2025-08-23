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
            <div key={category.name} className='border rounded-lg'>
              <button
                type='button'
                onClick={() => toggleCategory(category.name)}
                className='w-full p-3 flex items-center justify-between hover:bg-gray-50 transition-colors'
              >
                <span className='font-semibold text-left'>{category.name}</span>
                {expandedCategories.has(category.name) ? (
                  <ChevronDown className='h-4 w-4' />
                ) : (
                  <ChevronRight className='h-4 w-4' />
                )}
              </button>

              {expandedCategories.has(category.name) && (
                <div className='px-3 pb-3 border-t'>
                  <RadioGroup
                    value={selectedMethod}
                    onValueChange={onMethodSelect}
                    className='space-y-2 mt-3'
                  >
                    {category.methods.map((method) => (
                      <div
                        key={method.name}
                        className='flex items-center space-x-2'
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
                            <span className='font-medium'>{method.name}</span>
                            {method.commission > 0 && (
                              <span className='text-xs text-gray-500'>
                                (+{method.commission}% commission)
                              </span>
                            )}
                          </div>
                          <div className='text-xs text-gray-600 mt-1'>
                            {method.description}
                          </div>

                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              )}
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
          Use this payment method
        </Button>
      </CardFooter>
    </Card>
  )
}
