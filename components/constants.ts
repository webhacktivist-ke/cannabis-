import { Product, ProductCategory, PlantType, StoreLocation, BlogPost } from './types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Blue Dream',
    category: ProductCategory.Flower,
    type: PlantType.Hybrid,
    price: 45.00,
    salePrice: 35.00,
    thc: 18.5,
    cbd: 0.1,
    description: 'A legendary sativa-dominant hybrid originating in California. Balancing full-body relaxation with gentle cerebral invigoration.',
    effects: ['Creative', 'Energetic', 'Euphoric'],
    flavors: ['Berry', 'Sweet', 'Vanilla'],
    image: 'https://picsum.photos/id/10/500/500', // Placeholder
    rating: 4.8,
    reviews: 120,
    inStock: true
  },
  {
    id: '2',
    name: 'OG Kush',
    category: ProductCategory.Flower,
    type: PlantType.Hybrid,
    price: 50.00,
    thc: 24.0,
    cbd: 0.2,
    description: 'Cherished for its ability to crush stress under the weight of its heavy euphoria. It carries an earthy pine and sour lemon scent.',
    effects: ['Relaxed', 'Happy', 'Sleepy'],
    flavors: ['Earthy', 'Woody', 'Pine'],
    image: 'https://picsum.photos/id/11/500/500',
    rating: 4.9,
    reviews: 350,
    inStock: true
  },
  {
    id: '3',
    name: 'Sour Diesel',
    category: ProductCategory.Vapes,
    type: PlantType.Sativa,
    price: 35.00,
    thc: 85.0,
    cbd: 0.5,
    description: 'Invigorating, fast-acting sativa-dominant strain named for its pungent, diesel-like aroma.',
    effects: ['Energetic', 'Happy', 'Uplifted'],
    flavors: ['Diesel', 'Pungent', 'Earthy'],
    image: 'https://picsum.photos/id/12/500/500',
    rating: 4.5,
    reviews: 89,
    inStock: true
  },
  {
    id: '4',
    name: 'Midnight Berry Gummies',
    category: ProductCategory.Edibles,
    type: PlantType.Indica,
    price: 25.00,
    thc: 10.0, // mg per serving
    cbd: 5.0, // mg
    description: 'Perfect for winding down after a long day. Infused with CBN for extra sleep support.',
    effects: ['Sleepy', 'Relaxed', 'Hungry'],
    flavors: ['Berry', 'Sweet'],
    image: 'https://picsum.photos/id/13/500/500',
    rating: 4.7,
    reviews: 210,
    inStock: true
  },
  {
    id: '5',
    name: 'Pain Relief Balm',
    category: ProductCategory.Topicals,
    type: PlantType.CBD,
    price: 40.00,
    thc: 1.0,
    cbd: 200.0,
    description: 'Non-psychoactive topical cream designed to melt away muscle soreness and joint pain.',
    effects: ['Relaxed', 'Pain Relief'],
    flavors: ['Mint', 'Eucalyptus'],
    image: 'https://picsum.photos/id/14/500/500',
    rating: 4.6,
    reviews: 55,
    inStock: true
  },
  {
    id: '6',
    name: 'Granddaddy Purple',
    category: ProductCategory.Flower,
    type: PlantType.Indica,
    price: 55.00,
    salePrice: 45.00,
    thc: 21.0,
    cbd: 0.1,
    description: 'Famous indica cross of Purple Urkle and Big Bud. Delivers a fusion of cerebral euphoria and physical relaxation.',
    effects: ['Sleepy', 'Relaxed', 'Hungry'],
    flavors: ['Grape', 'Berry', 'Sweet'],
    image: 'https://picsum.photos/id/15/500/500',
    rating: 4.9,
    reviews: 420,
    inStock: true
  }
];

export const STORE_LOCATIONS: StoreLocation[] = [
  {
    id: '1',
    name: 'Downtown LA Flagship',
    address: '1234 S Main St, Los Angeles, CA 90015',
    phone: '(213) 555-0199',
    hours: '9:00 AM - 10:00 PM',
    coordinates: { lat: 34.04, lng: -118.25 }
  },
  {
    id: '2',
    name: 'San Francisco Mission',
    address: '567 Valencia St, San Francisco, CA 94110',
    phone: '(415) 555-0123',
    hours: '10:00 AM - 9:00 PM',
    coordinates: { lat: 37.76, lng: -122.42 }
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    title: 'Terpenes 101: Understanding Aromatherapy',
    excerpt: 'Discover why your cannabis smells the way it does and how it affects your high.',
    content: 'Full article content would go here...',
    date: 'Oct 15, 2023',
    image: 'https://picsum.photos/id/20/800/400',
    category: 'Education'
  },
  {
    id: '2',
    title: 'Edibles Dosing Guide',
    excerpt: 'Start low and go slow. Here is how to have a safe and enjoyable experience.',
    content: 'Full article content would go here...',
    date: 'Oct 01, 2023',
    image: 'https://picsum.photos/id/21/800/400',
    category: 'Guide'
  }
];