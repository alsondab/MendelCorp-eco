import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

const categories = [
  'Video Surveillance',
  'Fire',
  'Telephony',
  'Computer Equipment',
]

export default async function Search() {
  return (
    <form
      action='/search'
      method='GET'
      className='flex items-stretch h-8 sm:h-9 rounded-md w-full'
    >
      <Select name='category'>
        <SelectTrigger className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r rounded-r-none rounded-l-md text-xs sm:text-sm'>
          <SelectValue placeholder='All' />
        </SelectTrigger>
        <SelectContent position='popper'>
          <SelectItem value='all'>All Categories</SelectItem>
          {categories.map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-xs sm:text-base h-full placeholder:text-xs sm:placeholder:text-base'
        placeholder='Search for security equipment, computers, cameras...'
        name='q'
        type='search'
      />
      <button
        type='submit'
        className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-2 sm:px-3 py-2 flex-shrink-0'
      >
        <SearchIcon className='w-4 h-4 sm:w-6 sm:h-6' />
      </button>
    </form>
  )
}
