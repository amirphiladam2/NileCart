import { Product } from '@/components/ProductCard';

export interface ProductWithSubcategory extends Product {
  subcategory: string;
}

export const sampleProducts: ProductWithSubcategory[] = [
  // Electronics - Phones
  {
    id: 'electronics-phones-1',
    name: 'iPhone 15 Pro',
    description: 'Latest iPhone with titanium design and A17 Pro chip',
    price: 1199.99,
    category: 'Electronics',
    subcategory: 'Phones',
    image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'electronics-phones-2',
    name: 'Samsung Galaxy S24',
    description: 'Flagship Android phone with advanced AI features',
    price: 999.99,
    category: 'Electronics',
    subcategory: 'Phones',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Electronics - Laptops
  {
    id: 'electronics-laptops-1',
    name: 'MacBook Air M3',
    description: 'Ultra-thin laptop with M3 chip and all-day battery',
    price: 1299.99,
    category: 'Electronics',
    subcategory: 'Laptops',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'electronics-laptops-2',
    name: 'Dell XPS 13',
    description: 'Premium Windows ultrabook with InfinityEdge display',
    price: 1099.99,
    category: 'Electronics',
    subcategory: 'Laptops',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Electronics - Accessories
  {
    id: 'electronics-accessories-1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-cancelling headphones with 30-hour battery life',
    price: 199.99,
    category: 'Electronics',
    subcategory: 'Accessories',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'electronics-accessories-2',
    name: 'Wireless Charging Pad',
    description: 'Fast wireless charging for all Qi-enabled devices',
    price: 49.99,
    category: 'Electronics',
    subcategory: 'Accessories',
    image: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Groceries - Fresh Produce
  {
    id: 'groceries-produce-1',
    name: 'Organic Bananas',
    description: 'Fresh organic bananas from local farms',
    price: 3.99,
    category: 'Groceries',
    subcategory: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'groceries-produce-2',
    name: 'Fresh Avocados',
    description: 'Ripe avocados perfect for your meals',
    price: 8.99,
    category: 'Groceries',
    subcategory: 'Fresh Produce',
    image: 'https://images.unsplash.com/photo-1523049673857-eb18f1d7b578?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Groceries - Pantry
  {
    id: 'groceries-pantry-1',
    name: 'Organic Honey',
    description: 'Pure wildflower honey from local beekeepers',
    price: 12.99,
    category: 'Groceries',
    subcategory: 'Pantry',
    image: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'groceries-pantry-2',
    name: 'Premium Coffee Beans',
    description: 'Single-origin arabica beans, medium roast',
    price: 24.99,
    category: 'Groceries',
    subcategory: 'Pantry',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Fashion - Clothing
  {
    id: 'fashion-clothing-1',
    name: 'Cotton T-Shirt',
    description: 'Premium 100% cotton t-shirt in various colors',
    price: 29.99,
    category: 'Fashion',
    subcategory: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fashion-clothing-2',
    name: 'Denim Jeans',
    description: 'Classic fit denim jeans with comfortable stretch',
    price: 79.99,
    category: 'Fashion',
    subcategory: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Fashion - Accessories
  {
    id: 'fashion-accessories-1',
    name: 'Classic Leather Handbag',
    description: 'Timeless design with premium Italian leather',
    price: 149.99,
    category: 'Fashion',
    subcategory: 'Accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'fashion-accessories-2',
    name: 'Designer Sunglasses',
    description: 'UV protection with polarized lenses and metal frame',
    price: 129.99,
    category: 'Fashion',
    subcategory: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Home - Kitchen
  {
    id: 'home-kitchen-1',
    name: 'Stainless Steel Cookware Set',
    description: '10-piece professional cookware set with non-stick coating',
    price: 299.99,
    category: 'Home',
    subcategory: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'home-kitchen-2',
    name: 'Electric Kettle',
    description: 'Fast-boiling electric kettle with temperature control',
    price: 89.99,
    category: 'Home',
    subcategory: 'Kitchen',
    image: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Home - Furniture
  {
    id: 'home-furniture-1',
    name: 'Comfortable Sofa',
    description: '3-seater sofa with premium fabric upholstery',
    price: 899.99,
    category: 'Home',
    subcategory: 'Furniture',
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'home-furniture-2',
    name: 'Wooden Coffee Table',
    description: 'Elegant solid wood coffee table with storage',
    price: 349.99,
    category: 'Home',
    subcategory: 'Furniture',
    image: 'https://images.unsplash.com/photo-1549497538-303791108f95?w=400&h=400&fit=crop',
    inStock: true,
  },

  // Home - Decor
  {
    id: 'home-decor-1',
    name: 'Modern Wall Art',
    description: 'Contemporary abstract art print in premium frame',
    price: 129.99,
    category: 'Home',
    subcategory: 'Decor',
    image: 'https://images.unsplash.com/photo-1513519245088-7bb52840ae4e?w=400&h=400&fit=crop',
    inStock: true,
  },
  {
    id: 'home-decor-2',
    name: 'Ceramic Vase Set',
    description: 'Set of 3 handcrafted ceramic vases in neutral tones',
    price: 79.99,
    category: 'Home',
    subcategory: 'Decor',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop',
    inStock: true,
  }
];

export const getProductsByCategory = (category: string): ProductWithSubcategory[] => {
  return sampleProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase()
  );
};

export const getProductsBySubcategory = (category: string, subcategory: string): ProductWithSubcategory[] => {
  return sampleProducts.filter(product => 
    product.category.toLowerCase() === category.toLowerCase() &&
    product.subcategory.toLowerCase() === subcategory.toLowerCase()
  );
};

export const getSubcategoriesByCategory = (category: string): string[] => {
  const products = getProductsByCategory(category);
  const subcategories = [...new Set(products.map(product => product.subcategory))];
  return subcategories;
};

export const getProductById = (id: string): ProductWithSubcategory | undefined => {
  return sampleProducts.find(product => product.id === id);
};

export const categories = [
  { 
    name: 'Electronics',
    subcategories: ['Phones', 'Laptops', 'Accessories']
  },
  { 
    name: 'Groceries',
    subcategories: ['Fresh Produce', 'Pantry']
  },
  { 
    name: 'Fashion',
    subcategories: ['Clothing', 'Accessories']
  },
  { 
    name: 'Home',
    subcategories: ['Kitchen', 'Furniture', 'Decor']
  }
];