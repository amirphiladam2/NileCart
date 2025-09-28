import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import Navigation from '@/components/Navigation';
import ProductCard from '@/components/ProductCard';
import ShoppingCart from '@/components/ShoppingCart';
import { useCart } from '@/context/CartContext';
import { 
  getProductsByCategory, 
  getProductsBySubcategory, 
  getSubcategoriesByCategory,
  categories
} from '@/data/sampleProducts';

const CategoryPage = () => {
  const { category } = useParams<{ category: string }>();
  const { addItem } = useCart();
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');
  const [showCart, setShowCart] = useState(false);

  if (!category) {
    return <div>Category not found</div>;
  }

  const categoryName = category.charAt(0).toUpperCase() + category.slice(1);
  const categoryData = categories.find(c => c.name.toLowerCase() === category.toLowerCase());
  const subcategories = getSubcategoriesByCategory(categoryName);
  
  const products = selectedSubcategory 
    ? getProductsBySubcategory(categoryName, selectedSubcategory)
    : getProductsByCategory(categoryName);

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">{categoryName}</h1>
              <p className="text-muted-foreground">
                Explore our collection of {categoryName.toLowerCase()} products
              </p>
            </div>

            {/* Subcategory Filter */}
            {subcategories.length > 0 && (
              <Card className="mb-6">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4" />
                    <span className="font-medium">Filter by subcategory:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant={selectedSubcategory === '' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setSelectedSubcategory('')}
                    >
                      All {categoryName}
                    </Button>
                    {subcategories.map((subcategory) => (
                      <Button
                        key={subcategory}
                        variant={selectedSubcategory === subcategory ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setSelectedSubcategory(subcategory)}
                      >
                        {subcategory}
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  Showing {products.length} products
                </span>
                {selectedSubcategory && (
                  <Badge variant="secondary">
                    {selectedSubcategory}
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="lg:hidden"
                  onClick={() => setShowCart(!showCart)}
                >
                  Cart
                </Button>
              </div>
            </div>

            {/* Products Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <h3 className="text-lg font-semibold mb-2">No products found</h3>
                    <p>
                      {selectedSubcategory
                        ? `No products available in ${selectedSubcategory}`
                        : `No products available in ${categoryName}`
                      }
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Shopping Cart Sidebar */}
          <div className={`lg:block ${showCart ? 'block' : 'hidden'} lg:w-80`}>
            <div className="sticky top-24">
              <ShoppingCart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;