import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { APP_NAME } from '@/lib/constants'
import { categories } from '@/lib/categories'
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
      className='flex  items-stretch h-9 rounded-md '
    >
      <Select name='category'>
        <SelectTrigger className='w-auto h-full dark:border-gray-200 bg-gray-100 text-black border-r  rounded-r-none rounded-l-md'>
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
        className='flex-1 rounded-none dark:border-gray-200 bg-gray-100 text-black text-base h-full'
        placeholder='Search for security equipment, computers, cameras...'
        name='q'
        type='search'
      />
      <button
        type='submit'
        className='bg-primary text-primary-foreground text-black rounded-s-none rounded-e-md h-full px-3 py-2 '
      >
        <SearchIcon className='w-6 h-6' />
      </button>
    </form>
  )
}
