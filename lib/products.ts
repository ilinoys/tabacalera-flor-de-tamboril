export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  image: string;
  category: string;
  strength: string;
  origin: string;
  size: string;
  featured: boolean;
}

export const products: Product[] = [
  {
    id: "flor-de-tamboril-robusto",
    name: "Flor de Tamboril Robusto",
    description:
      "Un puro de cuerpo medio con notas de cedro, cuero y un toque de especias. Perfecto para el fumador que busca complejidad sin exceso de fuerza.",
    price: 12.99,
    stock: 250,
    image: "/images/products/robusto.jpg",
    category: "Premium",
    strength: "Medio",
    origin: "República Dominicana",
    size: '5" x 50',
    featured: true,
  },
  {
    id: "flor-de-tamboril-toro",
    name: "Flor de Tamboril Toro",
    description:
      "Cuerpo completo con sabores intensos de tierra, chocolate oscuro y pimienta. Para el conocedor que aprecia la potencia.",
    price: 14.99,
    stock: 180,
    image: "/images/products/toro.jpg",
    category: "Premium",
    strength: "Fuerte",
    origin: "República Dominicana",
    size: '6" x 52',
    featured: true,
  },
  {
    id: "flor-de-tamboril-churchill",
    name: "Flor de Tamboril Churchill",
    description:
      "Elegante y suave, con notas cremosas, vainilla y un final largo. Ideal para una tarde relajada.",
    price: 16.99,
    stock: 120,
    image: "/images/products/churchill.jpg",
    category: "Edición Especial",
    strength: "Suave",
    origin: "República Dominicana",
    size: '7" x 48',
    featured: true,
  },
  {
    id: "flor-de-tamboril-corona",
    name: "Flor de Tamboril Corona",
    description:
      "Clásico formato corona con un equilibrio perfecto entre dulzura natural y toques amaderados.",
    price: 10.99,
    stock: 300,
    image: "/images/products/corona.jpg",
    category: "Clásica",
    strength: "Medio",
    origin: "República Dominicana",
    size: '5.5" x 42',
    featured: false,
  },
  {
    id: "flor-de-tamboril-torpedo",
    name: "Flor de Tamboril Torpedo",
    description:
      "Formato torpedo que concentra los sabores en cada calada. Notas de nuez, café y un final especiado.",
    price: 15.99,
    stock: 90,
    image: "/images/products/torpedo.jpg",
    category: "Premium",
    strength: "Fuerte",
    origin: "República Dominicana",
    size: '6.5" x 54',
    featured: false,
  },
  {
    id: "flor-de-tamboril-petit-corona",
    name: "Flor de Tamboril Petit Corona",
    description:
      "Perfecto para una fumada rápida sin sacrificar calidad. Suave, aromático y satisfactorio.",
    price: 8.99,
    stock: 450,
    image: "/images/products/petit-corona.jpg",
    category: "Clásica",
    strength: "Suave",
    origin: "República Dominicana",
    size: '4.5" x 40',
    featured: false,
  },
];

// Funciones de utilidad

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}