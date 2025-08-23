import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { Cart, OrderItem,ShippingAddress } from '@/types'
import { calcDeliveryDateAndPrice } from '@/lib/actions/order.actions'

const initialState: Cart = {
  items: [],
  itemsPrice: 0,
  taxPrice: undefined,
  shippingPrice: undefined,
  totalPrice: 0,
  paymentMethod: undefined,
  shippingAddress: undefined,
  deliveryDateIndex: undefined,
}

interface CartState {
  cart: Cart
  addItem: (item: OrderItem, quantity: number) => Promise<string>
  updateItem: (item: OrderItem, quantity: number) => Promise<void>
  removeItem: (item: OrderItem) => void
  
  setShippingAddress: (shippingAddress: ShippingAddress) => Promise<void>
setPaymentMethod: (paymentMethod: string) => void
setDeliveryDateIndex: (index: number) => Promise<void>
}

const useCartStore = create(
  cart: initialState,

  addItem: async (item: OrderItem, quantity: number) => {
-        const { items } = get().cart
    const { items, shippingAddress } = get().cart
    const existItem = items.find(
      (x) =>
        x.product === item.product &&
        items: updatedCartItems,
        ...(await calcDeliveryDateAndPrice({
          items: updatedCartItems,
          shippingAddress,
        })),
      },
    })
    )?.clientId!
  },
  updateItem: async (item: OrderItem, quantity: number) => {
-        const { items } = get().cart
    const { items, shippingAddress } = get().cart
    const exist = items.find(
      (x) =>
        x.product === item.product &&
        items: updatedCartItems,
        ...(await calcDeliveryDateAndPrice({
          items: updatedCartItems,
          shippingAddress,
        })),
      },
    })
  },
  removeItem: async (item: OrderItem) => {
-        const { items } = get().cart
    const { items, shippingAddress } = get().cart
    const updatedCartItems = items.filter(
      (x) =>
        x.product !== item.product ||
        items: updatedCartItems,
        ...(await calcDeliveryDateAndPrice({
          items: updatedCartItems,
          shippingAddress,
        })),
      },
    })
  },
  init: () => set({ cart: initialState }),
  setShippingAddress: async (shippingAddress: ShippingAddress) => {
    const { items } = get().cart
    set({
      cart: {
        ...get().cart,
        shippingAddress,
        ...(await calcDeliveryDateAndPrice({
          items,
          shippingAddress,
        })),
      },
    })
  },
  setPaymentMethod: (paymentMethod: string) => {
    set({
      cart: {
        ...get().cart,
        paymentMethod,
      },
    })
  },
  setDeliveryDateIndex: async (index: number) => {
    const { items, shippingAddress } = get().cart

    set({
      cart: {
        ...get().cart,
        ...(await calcDeliveryDateAndPrice({
          items,
          shippingAddress,
          deliveryDateIndex: index,
        })),
      },
    })
  },
  clearCart: () => {
    set({
      cart: {
        ...get().cart,
        items: [],
      },
    })
  },
}),
{
  name: 'cart-store',
    }
  )
)
export default useCartStore
