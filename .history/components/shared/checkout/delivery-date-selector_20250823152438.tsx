'use client'

import { Card, CardContent } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Label } from '@/components/ui/label'
import { AVAILABLE_DELIVERY_DATES } from '@/lib/constants'
import { calculateFutureDate, formatDateTime } from '@/lib/utils'
import { Accordion, AccordionItem, useAccordion } from '@/components/ui/accordion'
import ProductPrice from '@/components/shared/product/product-price'

interface DeliveryDateSelectorProps {
  selectedDateIndex: number | undefined
  onDateSelect: (dateIndex: number) => void
  itemsPrice: number
}

export default function DeliveryDateSelector({
  selectedDateIndex,
  onDateSelect,
  itemsPrice,
}: DeliveryDateSelectorProps) {
  const { expandedItem, toggleItem, isExpanded } = useAccordion()

  return (
    <Card className='md:ml-8'>
      <CardContent className='p-4'>
        <div className='mb-2'>
          <p className='text-lg font-bold text-green-700'>
            Arriving{' '}
            {selectedDateIndex !== undefined
              ? formatDateTime(
                  calculateFutureDate(
                    AVAILABLE_DELIVERY_DATES[selectedDateIndex].daysToDeliver
                  )
                ).dateOnly
              : '--'}
          </p>
        </div>
        
        <Accordion>
          <AccordionItem
            title='Choose a shipping speed'
            isExpanded={isExpanded('shipping-speed')}
            onToggle={() => toggleItem('shipping-speed')}
          >
            <RadioGroup
              value={
                selectedDateIndex !== undefined
                  ? AVAILABLE_DELIVERY_DATES[selectedDateIndex].name
                  : ''
              }
              onValueChange={(value) =>
                onDateSelect(
                  AVAILABLE_DELIVERY_DATES.findIndex(
                    (dd) => dd.name === value
                  )!
                )
              }
              className='space-y-2 mt-3'
            >
              {AVAILABLE_DELIVERY_DATES.map((dd, index) => (
                <div key={dd.name} className='flex'>
                  <RadioGroupItem
                    value={dd.name}
                    id={`delivery-${dd.name}`}
                  />
                  <Label
                    className='pl-2 space-y-2 cursor-pointer'
                    htmlFor={`delivery-${dd.name}`}
                  >
                    <div className='text-green-700 font-semibold'>
                      {formatDateTime(
                        calculateFutureDate(dd.daysToDeliver)
                      ).dateOnly}
                    </div>
                    <div>
                      {(dd.freeShippingMinPrice > 0 &&
                      itemsPrice >= dd.freeShippingMinPrice
                        ? 0
                        : dd.shippingPrice) === 0 ? (
                        'FREE Shipping'
                      ) : (
                        <ProductPrice
                          price={dd.shippingPrice}
                          plain
                        />
                      )}
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
