import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatCurrency } from "@/lib/currency";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  inStock: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (productId: string) => void;
  isWishlisted?: boolean;
}

const ProductCard = ({ 
  product, 
  onAddToCart, 
  onToggleWishlist, 
  isWishlisted = false 
}: ProductCardProps) => {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCart && product.inStock) {
      onAddToCart(product);
    }
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onToggleWishlist) {
      onToggleWishlist(product.id);
    }
  };

  return (
    <Card className="group hover:shadow-card transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          <div className="aspect-square overflow-hidden bg-muted">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="sm"
            className={`absolute top-2 right-2 w-8 h-8 rounded-full p-0 ${
              isWishlisted 
                ? 'bg-secondary/80 text-secondary-foreground' 
                : 'bg-background/80 text-foreground hover:bg-secondary/80'
            }`}
            onClick={handleToggleWishlist}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
          </Button>

          {/* Stock Status */}
          {!product.inStock && (
            <Badge 
              variant="secondary" 
              className="absolute top-2 left-2 bg-destructive text-destructive-foreground"
            >
              Out of Stock
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-4">
        <Link to={`/product/${product.id}`}>
          <div className="space-y-2">
            <Badge variant="outline" className="text-xs">
              {product.category}
            </Badge>
            
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-2">
              {product.name}
            </h3>
            
            <p className="text-sm text-muted-foreground line-clamp-2">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between pt-2">
              <span className="text-lg font-bold text-primary">
                ${product.price.toFixed(2)}
              </span>
              
              <Button
                size="sm"
                className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                onClick={handleAddToCart}
                disabled={!product.inStock}
              >
                <ShoppingCart className="w-4 h-4 mr-1" />
                Add to Cart
              </Button>
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProductCard;