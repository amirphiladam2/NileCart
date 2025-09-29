import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import ProductCard, { Product } from "./ProductCard";

interface CategorySectionProps {
  title: string;
  href: string;
  products: Product[];
  onAddToCart?: (product: Product) => void;
}

const CategorySection = ({ title, href, products, onAddToCart }: CategorySectionProps) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          <Button variant="ghost" asChild className="group text-foreground hover:text-primary">
            <Link to={href} className="flex items-center space-x-2">
              <span>View All</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;