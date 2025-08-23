'use client'

import { useEffect } from 'react'
import { browsingHistoryStore } from '@/hooks/use-browsing-history'
import { IProduct } from '@/lib/db/models/product.model'

export default function AddToBrowsingHistory({
  product,
}: {
  product: IProduct
}) {
  useEffect(() => {
    // Ajouter le produit à l'historique quand la page se charge
    const currentProducts = [...browsingHistoryStore.getState().products]
    const index = currentProducts.findIndex((p) => p.id === product._id)

    if (index !== -1) {
      currentProducts.splice(index, 1) // Remove duplicate if it exists
    }

    currentProducts.unshift({
      id: product._id,
      category: product.category,
    }) // Add id to the start

    if (currentProducts.length > 10) {
      currentProducts.pop() // Remove excess items if length exceeds 10
    }

    browsingHistoryStore.setState({
      products: currentProducts,
    })
  }, [product._id, product.category])

  // Ce composant ne rend rien visuellement, il ajoute juste à l'historique
  return null
}
