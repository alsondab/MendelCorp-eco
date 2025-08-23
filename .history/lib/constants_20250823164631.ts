export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'MendelCorp'
export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

export const SENDER_EMAIL = process.env.SENDER_EMAIL || 'onboarding@resend.dev'
export const SENDER_NAME = process.env.SENDER_NAME || APP_NAME
export const APP_SLOGAN = process.env.NEXT_PUBLIC_APP_SLOGAN || 'Spend less, enjoy more.'
export const APP_DESCRIPTION =process.env.NEXT_PUBLIC_APP_DESCRIPTION ||'An Amazon clone built with Next.js and MongoDB'

export const PAGE_SIZE = Number(process.env.PAGE_SIZE || 9)

export const FREE_SHIPPING_MIN_PRICE = Number(
  process.env.FREE_SHIPPING_MIN_PRICE || 35
)

export const APP_COPYRIGHT =
  process.env.NEXT_PUBLIC_APP_COPYRIGHT ||
  `Copyright © 2025 ${APP_NAME}. All rights reserved.`

export const AVAILABLE_PAYMENT_METHODS = [
  {
    name: 'Orange Money',
    commission: 0,
    isDefault: true,
  },
  {
    name: 'MTN Mobile Money',
    commission: 0,
    isDefault: false,
  },
  {
    name: 'Moov Money',
    commission: 0,
    isDefault: false,
  },
  {
    name: 'PayPal',
    commission: 0,
    isDefault: false,
  },
  {
    name: 'Stripe',
    commission: 0,
    isDefault: false,
  },
  {
    name: 'Cash On Delivery',
    commission: 0,
    isDefault: false,
  },
]

export const PAYMENT_CATEGORIES = [
  {
    name: 'Paiements Mobiles',
    methods: [
      {
        name: 'Orange Money',
        commission: 0,
        isDefault: true,
        logo: '/icons/orange-money.svg',
        type: 'mobile',
      },
      {
        name: 'Wave',
        commission: 0,
        isDefault: false,
        logo: '/icons/wave.svg',
        type: 'mobile',
      },
      {
        name: 'MTN Money',
        commission: 0,
        isDefault: false,
        logo: '/icons/mtn-money.svg',
        type: 'mobile',
      },
      {
        name: 'Moov Money',
        commission: 0,
        isDefault: false,
        logo: '/icons/moov-money.svg',
        type: 'mobile',
      },
    ],
  },
  {
    name: 'Paiements en Ligne',
    methods: [
      {
        name: 'PayPal',
        commission: 0,
        isDefault: false,
        logo: '/icons/paypal.svg',
        type: 'online',
      },
      {
        name: 'Stripe',
        commission: 0,
        isDefault: false,
        logo: '/icons/stripe.svg',
        type: 'online',
      },
    ],
  },
  {
    name: 'Autres Options',
    methods: [
      {
        name: 'Cash On Delivery',
        commission: 0,
        isDefault: false,
        logo: '/icons/cash.svg',
        type: 'other',
      },
    ],
  },
]

// Tous les moyens de paiement disponibles (aplatis)
export const ALL_PAYMENT_METHODS = PAYMENT_CATEGORIES.flatMap(
  (category) => category.methods
)

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || 'Orange Money'

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
