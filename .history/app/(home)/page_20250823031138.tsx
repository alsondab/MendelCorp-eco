import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import { Card, CardContent } from '@/components/ui/card'
import { getAllCategories, getProductsForCard } from '@/lib/db'
import { toSlug } from '@/lib/utils'
import data from '@/lib/data'

export default async function Page() {
  const categories = ['Video Surveillance', 'Fire', 'Telephony', 'Computer Equipment']
  const newArrivals = data.products.filter(p => p.tags.includes('new-arrival')).slice(0, 4)
  const featureds = data.products.filter(p => p.tags.includes('featured')).slice(0, 4)
  const bestSellers = data.products.filter(p => p.tags.includes('best-seller')).slice(0, 4)
  const carousels = data.carousels
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`,
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers,
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Featured Products',
      items: featureds,
      link: {
        text: 'Shop Now',
        href: '/search?tag=new-arrival',
      },
    },
  ]

  return (
    <>
      <HomeCarousel items={carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />
      </div>
    </>
  )
}
