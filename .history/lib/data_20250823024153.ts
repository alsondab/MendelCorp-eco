import { Data, IProductInput } from '@/types'
import { toSlug } from './utils'

const data = {
    headerMenus: [
      {
        name: "Today's Deal",
        href: '/search?tag=todays-deal',
      },
      {
        name: 'New Arrivals',
        href: '/search?tag=new-arrival',
      },
      {
        name: 'Featured Products',
        href: '/search?tag=featured',
      },
      {
        name: 'Best Sellers',
        href: '/search?tag=best-seller',
      },
      {
        name: 'Browsing History',
        href: '/#browsing-history',
      },
      {
        name: 'Customer Service',
        href: '/page/customer-service',
      },
      {
        name: 'About Us',
        href: '/page/about-us',
      },
      {
        name: 'Help',
        href: '/page/help',
      },
    ],
    carousels: [
        {
          title: 'Most Popular Computer Equipment For Sale',
          buttonCaption: 'Shop Now',
          image: '/images/banner3.jpg',
          url: '/search?category=Computer Equipment',
          isPublished: true,
        },
        {
          title: 'Best Sellers in Telephony',
          buttonCaption: 'Shop Now',
          image: '/images/banner1.jpg',
          url: '/search?category=Telephony',
          isPublished: true,
        },
        {
          title: 'Best Deals on Video Surveillance',
          buttonCaption: 'See More',
          image: '/images/banner2.jpg',
          url: '/search?category=Video Surveillance',
          isPublished: true,
        },
      ],

    
  }

  export default data