'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { ShippingAddressSchema } from '@/lib/validator'
import { zodResolver } from '@hookform/resolvers/zod'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ShippingAddress } from '@/types'
import {
  Accordion,
  AccordionItem,
  useAccordion,
} from '@/components/ui/accordion'

interface ShippingAddressFormProps {
  defaultValues?: ShippingAddress
  onSubmit: (values: ShippingAddress) => void
}

export default function ShippingAddressForm({
  defaultValues,
  onSubmit,
}: ShippingAddressFormProps) {
  const { expandedItem, toggleItem, isExpanded } = useAccordion()

  const form = useForm<ShippingAddress>({
    resolver: zodResolver(ShippingAddressSchema),
    defaultValues: defaultValues || {
      fullName: '',
      street: '',
      city: '',
      province: '',
      phone: '',
      postalCode: '',
      country: '',
    },
  })

  const handleSubmit: SubmitHandler<ShippingAddress> = (values) => {
    onSubmit(values)
  }

  return (
    <Card className='md:ml-8 my-4'>
      <CardContent className='p-4'>
        <Accordion>
          <AccordionItem
            title='Your address'
            isExpanded={isExpanded('address-form')}
            onToggle={() => toggleItem('address-form')}
          >
            <Form {...form}>
              <form
                method='post'
                onSubmit={form.handleSubmit(handleSubmit)}
                className='space-y-4 mt-3'
              >
                <div className='flex flex-col gap-5 md:flex-row'>
                  <FormField
                    control={form.control}
                    name='fullName'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter full name' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name='street'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter address' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                  <FormField
                    control={form.control}
                    name='city'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>City</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter city' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='province'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Province</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter province' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='country'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Country</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter country' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className='flex flex-col gap-5 md:flex-row'>
                  <FormField
                    control={form.control}
                    name='postalCode'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Postal Code</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter postal code' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name='phone'
                    render={({ field }) => (
                      <FormItem className='w-full'>
                        <FormLabel>Phone number</FormLabel>
                        <FormControl>
                          <Input placeholder='Enter phone number' {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <CardFooter className='p-0 pt-4'>
                  <Button type='submit' className='rounded-full font-bold'>
                    Ship to this address
                  </Button>
                </CardFooter>
              </form>
            </Form>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  )
}
