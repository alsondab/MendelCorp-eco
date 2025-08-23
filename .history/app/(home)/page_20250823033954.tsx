import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import data from '@/lib/data'
import ProductSlider from '@/components/shared/product/product-slider'
import { Card, CardContent } from '@/components/ui/card'
import { getProductsByTag } from '@/lib/actions/product.actions'

export default async function Page() {
  const todaysDeals = await getProductsByTag({ tag: 'todays-deal' })
  const bestSellingProducts = await getProductsByTag({ tag: 'best-seller' })
  const categories = [
    'Video Surveillance',
    'Fire',
    'Telephony',
    'Computer Equipment',
  ]
  const newArrivals = data.products
    .filter((p) => p.tags.includes('new-arrival'))
    .slice(0, 4)
  const featureds = data.products
    .filter((p) => p.tags.includes('featured'))
    .slice(0, 4)
  const bestSellers = data.products
    .filter((p) => p.tags.includes('best-seller'))
    .slice(0, 4)
  const carousels = data.carousels
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See More',
        href: '/search',
      },
      items: categories.map((category, index) => ({
        name: category,
        image: [
          '/images/jeans.jpg',
          '/images/t-shirts.jpg',
          '/images/shoes.jpg',
          '/images/wrist-watches.jpg',
        ][index],
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals.map((product) => ({
        name: product.name,
        image: product.images[0],
        href: `/product/${product.slug}`,
      })),
      link: {
        text: 'View All',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers.map((product) => ({
        name: product.name,
        image: product.images[0],
        href: `/product/${product.slug}`,
      })),
      link: {
        text: 'View All',
        href: '/search?tag=best-seller',
      },
    },
    {
      title: 'Featured Products',
      items: featureds.map((product) => ({
        name: product.name,
        image: product.images[0],
        href: `/product/${product.slug}`,
      })),
      link: {
        text: 'Shop Now',
        href: '/search?tag=featured',
      },
    },
  ]

  return (
    <>
      return (
      <>
        <HomeCarousel items={data.carousels} />
        <div className='md:p-4 md:space-y-4 bg-border'>
          <HomeCard cards={cards} />
          <Card className='w-full rounded-none'>
            <CardContent className='p-4 items-center gap-3'>
              <ProductSlider title={"Today's Deals"} products={todaysDeals} />
            </CardContent>
          </Card>
          <Card className='w-full rounded-none'>
            <CardContent className='p-4 items-center gap-3'>
              <ProductSlider
                title='Best Selling Products'
                products={bestSellingProducts}
                hideDetails
              />
            </CardContent>
          </Card>
        </div>
      </>
      )
    </>
  )
}
