export enum ProductCategory {
  Flower = 'Flower',
  Edibles = 'Edibles',
  Vapes = 'Vapes',
  Concentrates = 'Concentrates',
  Topicals = 'Topicals',
  PreRolls = 'Pre-Rolls'
}

export enum PlantType {
  Indica = 'Indica',
  Sativa = 'Sativa',
  Hybrid = 'Hybrid',
  CBD = 'CBD'
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  type: PlantType;
  price: number;
  salePrice?: number;
  thc: number; // Percentage
  cbd: number; // Percentage
  description: string;
  effects: string[];
  flavors: string[];
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
  points: number;
}

export interface StoreLocation {
  id: string;
  name: string;
  address: string;
  phone: string;
  hours: string;
  coordinates: { lat: number; lng: number };
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  image: string;
  category: string;
}