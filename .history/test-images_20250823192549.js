// Script de test pour vérifier l'accessibilité des images
const testImages = [
  'https://mendelcorp-eco.vercel.app/images/banner1.jpg',
  'https://mendelcorp-eco.vercel.app/images/jeans.jpg',
  'https://mendelcorp-eco.vercel.app/images/shoes.jpg',
]

async function testImageAccessibility() {
  console.log("🔍 Test d'accessibilité des images...")

  for (const imageUrl of testImages) {
    try {
      const response = await fetch(imageUrl, { method: 'HEAD' })
      if (response.ok) {
        console.log(`✅ ${imageUrl} - Accessible`)
      } else {
        console.log(`❌ ${imageUrl} - Erreur ${response.status}`)
      }
    } catch (error) {
      console.log(`❌ ${imageUrl} - Erreur: ${error.message}`)
    }
  }
}

testImageAccessibility()
