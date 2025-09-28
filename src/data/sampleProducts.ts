import { Product } from '@/components/ProductCard';

export const sampleProducts: Product[] = [
  // Electronics
  {
    id: 'electronics-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'electronics-2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracking with heart rate monitor and GPS',
    price: 299.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'electronics-3',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging for all Qi-enabled devices',
    price: 49.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'electronics-4',
    name: 'Portable Bluetooth Speaker',
    description: 'Waterproof speaker with rich bass and 24-hour battery',
    price: 89.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Groceries
  {
    id: 'groceries-1',
    name: 'Organic Honey',
    description: 'Pure wildflower honey from local beekeepers',
    price: 12.99,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'groceries-2',
    name: 'Premium Coffee Beans',
    description: 'Single-origin arabica beans, medium roast',
    price: 24.99,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'groceries-3',
    name: 'Organic Olive Oil',
    description: 'Extra virgin olive oil from Mediterranean olives',
    price: 18.99,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    inStock: false,
  },
  {
    id: 'groceries-4',
    name: 'Artisan Pasta Collection',
    description: 'Handmade pasta varieties from traditional recipes',
    price: 15.99,
    category: 'Groceries',
    image: 'https://images.unsplash.com/photo-1551892374-ecf8754cf8b0?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Fashion
  {
    id: 'fashion-1',
    name: 'Classic Leather Handbag',
    description: 'Timeless design with premium Italian leather',
    price: 149.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fashion-2',
    name: 'Designer Sunglasses',
    description: 'UV protection with polarized lenses and metal frame',
    price: 129.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fashion-3',
    name: 'Cashmere Scarf',
    description: 'Luxurious 100% cashmere in elegant neutral tones',
    price: 89.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fashion-4',
    name: 'Premium Leather Wallet',
    description: 'Handcrafted wallet with RFID protection',
    price: 79.99,
    category: 'Fashion',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400&h=400&fit=crop',
    inStock: true,
  },
];

export const getProductsByCategory = (category: string): Product[] => {
  return sampleProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductById = (id: string): Product | undefined => {
  return sampleProducts.find(product => product.id === id);
};