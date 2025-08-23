'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { PAYMENT_CATEGORIES } from '@/lib/constants'
import { Accordion, AccordionItem, useAccordion } from '@/components/ui/accordion'

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
  const { expandedItem, toggleItem, isExpanded } = useAccordion()

  return (
    <Card className='md:ml-8 my-4'>
      <CardContent className='p-4'>
        <Accordion>
          {PAYMENT_CATEGORIES.map((category) => (
            <AccordionItem
              key={category.name}
              title={category.name}
              isExpanded={isExpanded(category.name)}
              onToggle={() => toggleItem(category.name)}
            >
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
                      {method.supportedCountries && (
                        <div className='text-xs text-blue-600 mt-1'>
                          Pays supportés:{' '}
                          {method.supportedCountries.join(', ')}
                        </div>
                      )}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </AccordionItem>
          ))}
        </Accordion>
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
