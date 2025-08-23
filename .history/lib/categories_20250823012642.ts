export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
  subcategories: Subcategory[]
}

export interface Subcategory {
  id: string
  name: string
  slug: string
  description: string
}

export const categories: Category[] = [
  {
    id: 'ordinateurs',
    name: 'Ordinateurs',
    slug: 'ordinateurs',
    description: 'Ordinateurs portables et de bureau',
    icon: '💻',
    subcategories: [
      {
        id: 'laptops',
        name: 'Ordinateurs portables',
        slug: 'laptops',
        description: 'PC portables gaming et professionnels',
      },
      {
        id: 'desktops',
        name: 'Ordinateurs de bureau',
        slug: 'desktops',
        description: 'PC fixes et stations de travail',
      },
      {
        id: 'all-in-one',
        name: 'PC tout-en-un',
        slug: 'all-in-one',
        description: 'Ordinateurs compacts tout-en-un',
      },
      {
        id: 'mini-pc',
        name: 'Mini PC',
        slug: 'mini-pc',
        description: 'PC ultra-compacts et mini stations',
      },
    ],
  },
  {
    id: 'smartphones',
    name: 'Smartphones & Tablettes',
    slug: 'smartphones',
    description: 'Téléphones et tablettes intelligents',
    icon: '📱',
    subcategories: [
      {
        id: 'smartphones',
        name: 'Smartphones',
        slug: 'smartphones',
        description: 'Téléphones intelligents dernière génération',
      },
      {
        id: 'tablets',
        name: 'Tablettes',
        slug: 'tablets',
        description: 'Tablettes tactiles et hybrides',
      },
      {
        id: 'accessoires-mobile',
        name: 'Accessoires mobiles',
        slug: 'accessoires-mobile',
        description: 'Coques, chargeurs, écouteurs',
      },
    ],
  },
  {
    id: 'accessoires',
    name: 'Accessoires & Périphériques',
    slug: 'accessoires',
    description: 'Tous les accessoires informatiques',
    icon: '🖱️',
    subcategories: [
      {
        id: 'claviers',
        name: 'Claviers',
        slug: 'claviers',
        description: 'Claviers mécaniques et gaming',
      },
      {
        id: 'souris',
        name: 'Souris',
        slug: 'souris',
        description: 'Souris gaming et professionnelles',
      },
      {
        id: 'ecrans',
        name: 'Écrans',
        slug: 'ecrans',
        description: 'Moniteurs et écrans tactiles',
      },
      {
        id: 'stockage',
        name: 'Stockage',
        slug: 'stockage',
        description: 'SSD, HDD, clés USB',
      },
      {
        id: 'ram',
        name: 'Mémoire RAM',
        slug: 'ram',
        description: 'Modules de mémoire DDR4/DDR5',
      },
    ],
  },
  {
    id: 'gaming',
    name: 'Gaming & Performance',
    slug: 'gaming',
    description: 'Équipements gaming et haute performance',
    icon: '🎮',
    subcategories: [
      {
        id: 'cartes-graphiques',
        name: 'Cartes graphiques',
        slug: 'cartes-graphiques',
        description: 'GPU gaming et professionnels',
      },
      {
        id: 'processeurs',
        name: 'Processeurs',
        slug: 'processeurs',
        description: 'CPU Intel et AMD',
      },
      {
        id: 'carte-mere',
        name: 'Cartes mères',
        slug: 'carte-mere',
        description: 'Motherboards gaming et pro',
      },
      {
        id: 'alimentations',
        name: 'Alimentations',
        slug: 'alimentations',
        description: 'PSU modulaires et certifiées',
      },
      {
        id: 'refroidissement',
        name: 'Refroidissement',
        slug: 'refroidissement',
        description: 'Ventilateurs et refroidissement liquide',
      },
    ],
  },
  {
    id: 'reseaux',
    name: 'Réseaux & Serveurs',
    slug: 'reseaux',
    description: 'Équipements réseau et serveurs',
    icon: '🌐',
    subcategories: [
      {
        id: 'routeurs',
        name: 'Routeurs',
        slug: 'routeurs',
        description: 'Routeurs WiFi et câblés',
      },
      {
        id: 'switches',
        name: 'Switches',
        slug: 'switches',
        description: 'Commutateurs réseau',
      },
      {
        id: 'serveurs',
        name: 'Serveurs',
        slug: 'serveurs',
        description: 'Serveurs rack et tours',
      },
      {
        id: 'nas',
        name: 'NAS & Stockage',
        slug: 'nas',
        description: 'Stockage en réseau',
      },
      {
        id: 'cables',
        name: 'Câbles réseau',
        slug: 'cables',
        description: 'Câbles Ethernet et fibre',
      },
    ],
  },
  {
    id: 'logiciels',
    name: 'Logiciels & Licences',
    slug: 'logiciels',
    description: 'Logiciels et licences professionnelles',
    icon: '💾',
    subcategories: [
      {
        id: 'systeme',
        name: "Système d'exploitation",
        slug: 'systeme',
        description: 'Windows, Linux, macOS',
      },
      {
        id: 'bureautique',
        name: 'Bureautique',
        slug: 'bureautique',
        description: 'Office, alternatives gratuites',
      },
      {
        id: 'securite',
        name: 'Sécurité',
        slug: 'securite',
        description: 'Antivirus et pare-feu',
      },
      {
        id: 'graphisme',
        name: 'Graphisme & Design',
        slug: 'graphisme',
        description: 'Adobe, alternatives',
      },
      {
        id: 'developpement',
        name: 'Développement',
        slug: 'developpement',
        description: 'IDE et outils de dev',
      },
    ],
  },
]

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find((cat) => cat.slug === slug)
}

export const getSubcategoryBySlug = (
  categorySlug: string,
  subcategorySlug: string
): Subcategory | undefined => {
  const category = getCategoryBySlug(categorySlug)
  return category?.subcategories.find((sub) => sub.slug === subcategorySlug)
}
