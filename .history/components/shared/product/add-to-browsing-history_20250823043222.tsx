'use client'

import { useEffect } from 'react'
import useBrowsingHistory from '@/hooks/use-browsing-history'
import { IProduct } from '@/lib/db/models/product.model'

export default function AddToBrowsingHistory({ product }: { product: IProduct }) {
  const { addItem } = useBrowsingHistory()

  useEffect(() => {
    // Ajouter le produit à l'historique quand la page se charge
    addItem({
      id: product._id,
      category: product.category,
    })
  }, [product._id, product.category, addItem])

  // Ce composant ne rend rien visuellement, il ajoute juste à l'historique
  return null
}