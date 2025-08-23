export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MendelCorp'
export const APP_SLOGAN =
  process.env.NEXT_PUBLIC_APP_SLOGAN || 'Spend less, enjoy more.'
export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_APP_DESCRIPTION ||
  'An Amazon clone built with Next.js and MongoDB'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
)

export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2025 ${APP_NAME}. All rights reserved.`

export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: 'Cash On Delivery',
    commission: 0,
    isDefault: true,
  },
]

export const PAYMENT_CATEGORIES = [
  {
    name: 'Méthodes de Paiement',
    methods: [
      {
        name: 'Cash On Delivery',
        commission: 0,
        isDefault: true,
        logo: '/icons/cash.svg',
        description: 'Payez à la livraison de votre commande',
        type: 'local',
      },
    ],
  },
]

// Tous les moyens de paiement disponibles (aplatis)
export const ALL_PAYMENT_METHODS = PAYMENT_CATEGORIES.flatMap(
  (category) => category.methods
)

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'Cash On Delivery'

export const AVAILABLE_DELIVERY_DATES = [
  {
    name: 'Today',
    daysToDeliver: 0,
    shippingPrice: 19.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Tomorrow',
    daysToDeliver: 1,
    shippingPrice: 12.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 3 Days',
    daysToDeliver: 3,
    shippingPrice: 6.9,
    freeShippingMinPrice: 0,
  },
  {
    name: 'Next 5 Days',
    daysToDeliver: 5,
    shippingPrice: 4.9,
    freeShippingMinPrice: 35,
  },
]
