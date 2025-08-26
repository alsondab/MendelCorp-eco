# Implémentation des Thèmes et Couleurs

## Vue d'ensemble

Cette implémentation permet aux utilisateurs de changer entre les thèmes clair/sombre et de sélectionner différentes palettes de couleurs pour personnaliser l'apparence de l'application.

## Architecture

### 1. **Hook `use-color-store.ts`**
- Gestion d'état avec Zustand pour les couleurs
- Persistance des préférences utilisateur
- 3 thèmes de couleurs prédéfinis : Gold, Green, Red
- Chaque thème a des variantes claires et sombres

### 2. **Composants de Provider**
- **`ThemeProvider`** : Wrapper pour next-themes
- **`ColorProvider`** : Applique les variables CSS des couleurs

### 3. **Interface Utilisateur**
- **`ThemeSwitcher`** : Dropdown pour changer de thème et de couleur
- **`Menu`** : Intégration du sélecteur de thème dans le header
- **`Sheet`** : Menu mobile avec support des thèmes

## Fonctionnalités

### Thèmes
- **Light** : Thème clair
- **Dark** : Thème sombre  
- **System** : Suit les préférences système

### Couleurs
- **Gold** : Palette dorée (par défaut)
- **Green** : Palette verte
- **Red** : Palette rouge

## Utilisation

### Dans un composant
```tsx
import { useTheme } from 'next-themes'
import useColorStore from '@/hooks/use-color-store'

export default function MyComponent() {
  const { theme } = useTheme()
  const { color, setColor } = useColorStore(theme || 'light')
  
  return (
    <div>
      <p>Thème actuel : {theme}</p>
      <p>Couleur actuelle : {color.name}</p>
      <button onClick={() => setColor('Green', true)}>
        Changer pour Green
      </button>
    </div>
  )
}
```

### Variables CSS disponibles
```css
/* Toutes ces variables sont automatiquement mises à jour */
--background
--foreground
--primary
--primary-foreground
--secondary
--secondary-foreground
--muted
--muted-foreground
--accent
--accent-foreground
--destructive
--destructive-foreground
--border
--input
--ring
--radius
--chart-1 à --chart-5
```

## Structure des fichiers

```
components/shared/
├── theme-provider.tsx      # Provider principal
├── color-provider.tsx      # Application des couleurs
├── header/
│   ├── theme-switcher.tsx # Interface de sélection
│   └── menu.tsx           # Intégration dans le header
└── theme-demo.tsx         # Composant de démonstration

hooks/
└── use-color-store.ts     # Gestion d'état des couleurs

app/
└── layout.tsx             # Intégration des providers
```

## Installation des dépendances

```bash
npm install next-themes zustand
npx shadcn@latest add sheet
```

## Configuration

### 1. Mettre à jour `app/layout.tsx`
```tsx
<html lang='en' suppressHydrationWarning>
```

### 2. Intégrer dans `ClientProviders`
```tsx
import { ThemeProvider } from './theme-provider'

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider attribute='class' defaultTheme='system'>
      {children}
    </ThemeProvider>
  )
}
```

## Personnalisation

### Ajouter un nouveau thème de couleur
1. Copier un thème existant dans `use-color-store.ts`
2. Modifier les valeurs HSL des variables CSS
3. Ajouter le nom dans `availableColors`

### Modifier les couleurs existantes
1. Aller sur [ui.shadcn.com/themes](https://ui.shadcn.com/themes)
2. Copier le CSS du thème souhaité
3. Convertir en objet JavaScript avec ChatGPT
4. Remplacer dans `use-color-store.ts`

## Dépannage

### Problème : Les couleurs ne changent pas
- Vérifier que `ColorProvider` est bien dans l'arbre des composants
- Vérifier que `updateCssVariables()` est appelé

### Problème : Hydration error
- Ajouter `suppressHydrationWarning` sur la balise `<html>`
- Utiliser `useIsMounted()` pour éviter les erreurs côté serveur

### Problème : Les préférences ne sont pas sauvegardées
- Vérifier que Zustand est bien configuré avec `persist`
- Vérifier que le nom du store est unique

## Avantages

1. **Performance** : Changement instantané des thèmes
2. **Accessibilité** : Support des préférences système
3. **Personnalisation** : Multiples palettes de couleurs
4. **Persistance** : Sauvegarde des préférences utilisateur
5. **Responsive** : Interface mobile avec Sheet
6. **TypeScript** : Types stricts pour la sécurité

## Exemples d'utilisation avancée

### Animation de transition
```css
* {
  transition: background-color 0.3s ease, color 0.3s ease;
}
```

### Thème conditionnel
```tsx
const isSpecialDay = () => new Date().getDate() === 25
const specialTheme = isSpecialDay() ? 'Red' : 'Gold'
```

### Synchronisation avec d'autres composants
```tsx
useEffect(() => {
  // Mettre à jour d'autres composants quand le thème change
  updateOtherComponents(theme, color.name)
}, [theme, color.name])
```
