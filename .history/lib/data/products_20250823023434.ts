import { IProductInput } from '@/types'

export const sampleProducts: Omit<IProductInput, 'isPublished'>[] = [
  // Video Surveillance
  {
    name: '4K Security Camera System',
    slug: '4k-security-camera-system',
    category: 'Video Surveillance',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'SecureTech',
    description: 'Professional 4K security camera system with night vision and motion detection',
    price: 299.99,
    listPrice: 399.99,
    countInStock: 50,
    tags: ['new arrival', 'featured', 'best seller'],
    colors: ['Black', 'White'],
    sizes: ['Standard'],
    avgRating: 4.5,
    numReviews: 128,
    ratingDistribution: [
      { rating: 5, count: 89 },
      { rating: 4, count: 25 },
      { rating: 3, count: 10 },
      { rating: 2, count: 3 },
      { rating: 1, count: 1 }
    ],
    numSales: 245
  },
  {
    name: 'Wireless IP Camera',
    slug: 'wireless-ip-camera',
    category: 'Video Surveillance',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'EyeSpy',
    description: '1080p wireless IP camera with two-way audio and cloud storage',
    price: 89.99,
    listPrice: 129.99,
    countInStock: 75,
    tags: ['featured'],
    colors: ['Black'],
    sizes: ['Standard'],
    avgRating: 4.2,
    numReviews: 67,
    ratingDistribution: [
      { rating: 5, count: 45 },
      { rating: 4, count: 15 },
      { rating: 3, count: 5 },
      { rating: 2, count: 1 },
      { rating: 1, count: 1 }
    ],
    numSales: 189
  },

  // Fire Safety
  {
    name: 'Smart Smoke Detector',
    slug: 'smart-smoke-detector',
    category: 'Fire',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'SafeGuard',
    description: 'WiFi-enabled smoke detector with mobile alerts and battery monitoring',
    price: 49.99,
    listPrice: 69.99,
    countInStock: 120,
    tags: ['best seller'],
    colors: ['White'],
    sizes: ['Standard'],
    avgRating: 4.7,
    numReviews: 203,
    ratingDistribution: [
      { rating: 5, count: 156 },
      { rating: 4, count: 35 },
      { rating: 3, count: 8 },
      { rating: 2, count: 3 },
      { rating: 1, count: 1 }
    ],
    numSales: 456
  },
  {
    name: 'Fire Extinguisher Kit',
    slug: 'fire-extinguisher-kit',
    category: 'Fire',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'FireStop',
    description: 'Complete fire safety kit with extinguisher, mounting bracket, and safety instructions',
    price: 79.99,
    listPrice: 99.99,
    countInStock: 85,
    tags: ['featured'],
    colors: ['Red'],
    sizes: ['Standard'],
    avgRating: 4.4,
    numReviews: 92,
    ratingDistribution: [
      { rating: 5, count: 65 },
      { rating: 4, count: 20 },
      { rating: 3, count: 5 },
      { rating: 2, count: 1 },
      { rating: 1, count: 1 }
    ],
    numSales: 234
  },

  // Telephony
  {
    name: 'Business VoIP Phone System',
    slug: 'business-voip-phone-system',
    category: 'Telephony',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'CallTech',
    description: 'Professional VoIP phone system for small to medium businesses',
    price: 199.99,
    listPrice: 299.99,
    countInStock: 30,
    tags: ['new arrival'],
    colors: ['Black', 'White'],
    sizes: ['Standard'],
    avgRating: 4.6,
    numReviews: 78,
    ratingDistribution: [
      { rating: 5, count: 52 },
      { rating: 4, count: 18 },
      { rating: 3, count: 6 },
      { rating: 2, count: 1 },
      { rating: 1, count: 1 }
    ],
    numSales: 156
  },
  {
    name: 'Conference Call Speaker',
    slug: 'conference-call-speaker',
    category: 'Telephony',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'AudioPro',
    description: 'High-quality conference call speaker with noise cancellation',
    price: 129.99,
    listPrice: 159.99,
    countInStock: 45,
    tags: ['featured'],
    colors: ['Black', 'Silver'],
    sizes: ['Standard'],
    avgRating: 4.3,
    numReviews: 134,
    ratingDistribution: [
      { rating: 5, count: 89 },
      { rating: 4, count: 32 },
      { rating: 3, count: 10 },
      { rating: 2, count: 2 },
      { rating: 1, count: 1 }
    ],
    numSales: 298
  },

  // Computer Equipment
  {
    name: 'Gaming Laptop Pro',
    slug: 'gaming-laptop-pro',
    category: 'Computer Equipment',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'TechGear',
    description: 'High-performance gaming laptop with RTX graphics and 16GB RAM',
    price: 1299.99,
    listPrice: 1499.99,
    countInStock: 25,
    tags: ['new arrival', 'featured'],
    colors: ['Black', 'Red'],
    sizes: ['15.6"', '17.3"'],
    avgRating: 4.8,
    numReviews: 89,
    ratingDistribution: [
      { rating: 5, count: 67 },
      { rating: 4, count: 18 },
      { rating: 3, count: 3 },
      { rating: 2, count: 1 },
      { rating: 1, count: 0 }
    ],
    numSales: 67
  },
  {
    name: 'Wireless Mechanical Keyboard',
    slug: 'wireless-mechanical-keyboard',
    category: 'Computer Equipment',
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500'
    ],
    brand: 'KeyMaster',
    description: 'Premium wireless mechanical keyboard with RGB backlighting',
    price: 149.99,
    listPrice: 199.99,
    countInStock: 60,
    tags: ['best seller'],
    colors: ['Black', 'White'],
    sizes: ['Standard'],
    avgRating: 4.5,
    numReviews: 156,
    ratingDistribution: [
      { rating: 5, count: 112 },
      { rating: 4, count: 32 },
      { rating: 3, count: 8 },
      { rating: 2, count: 3 },
      { rating: 1, count: 1 }
    ],
    numSales: 423
  }
]

export const categories = [
  'Video Surveillance',
  'Fire',
  'Telephony',
  'Computer Equipment'
] as const

export type ProductCategory = typeof categories[number]
