// Ce fichier force l'enregistrement de tous les modèles Mongoose
// Important pour éviter l'erreur "Schema hasn't been registered" en production

import './user.model'
import './order.model'
import './product.model'

// Export des modèles pour utilisation dans d'autres fichiers
export { default as User } from './user.model'
export { default as Order } from './order.model'
export { default as Product } from './product.model'

console.log('✅ Tous les modèles Mongoose ont été enregistrés')
