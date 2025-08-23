import { create } from 'zustand'
import { persist } from 'zustand/middleware'
type BrowsingHistory = {
  products: { id: string; category: string }[]
}
const initialState: BrowsingHistory = {
  products: [],
}

export const browsingHistoryStore = create<BrowsingHistory>()(
  persist(() => initialState, {
    name: 'browsingHistoryStore',
  })
)

export default function useBrowsingHistory() {
  const { products } = browsingHistoryStore()
  return {
    products,
    addItem: (product: { id: string; category: string }) => {
      const currentProducts = [...products] // Créer une copie du tableau
      const index = currentProducts.findIndex((p) => p.id === product.id)

      if (index !== -1) {
        currentProducts.splice(index, 1) // Remove duplicate if it exists
      }

      currentProducts.unshift(product) // Add id to the start

      if (currentProducts.length > 10) {
        currentProducts.pop() // Remove excess items if length exceeds 10
      }

      browsingHistoryStore.setState({
        products: currentProducts,
      })
    },

    clear: () => {
      browsingHistoryStore.setState({
        products: [],
      })
    },
  }
}
