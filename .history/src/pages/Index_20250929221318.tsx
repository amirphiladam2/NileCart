import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Star, Shield, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import CategorySection from "@/components/CategorySection";
import { useCart } from "@/context/CartContext";
import { sampleProducts, getProductsByCategory } from "@/data/sampleProducts";
import heroImage from "@/assets/hero-image.png";

const Index = () => {
  const { addItem } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (product: any) => {
    addItem(product);
  };

  const handleShopNow = () => {
    // Scroll to the first category section
    const firstCategory = document.querySelector('[data-category="electronics"]');
    if (firstCategory) {
      firstCategory.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBrowseCategories = () => {
    // Navigate to a general categories page or scroll to categories
    const categoriesSection = document.querySelector('[data-category="electronics"]');
    if (categoriesSection) {
      categoriesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const features = [
    {
      icon: Shield,
      title: "Secure Shopping",
      description: "Your data is protected with industry-standard security"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Quick and reliable delivery to your doorstep"
    },
    {
      icon: Star,
      title: "Quality Products",
      description: "Carefully curated products from trusted brands"
    },
    {
      icon: ShoppingBag,
      title: "Easy Returns",
      description: "Hassle-free returns within 30 days"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/60" />
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Welcome to <span className="bg-gradient-secondary bg-clip-text text-transparent">NileCart</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
            Discover premium products across Electronics, Groceries, Fashion, and Home
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold px-8"
              onClick={handleShopNow}
            >
              Shop Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-primary bg-transparent"
              onClick={handleBrowseCategories}
            >
              Browse Categories
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-sm hover:shadow-card transition-shadow">
                <CardContent className="p-6 text-center">
                  <feature.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <div data-category="electronics">
        <CategorySection
          title="Electronics"
          href="/category/electronics"
          products={getProductsByCategory('Electronics')}
          onAddToCart={handleAddToCart}
        />
      </div>

      <div className="bg-muted/20">
        <CategorySection
          title="Groceries"
          href="/category/groceries"
          products={getProductsByCategory('Groceries')}
          onAddToCart={handleAddToCart}
        />
      </div>

      <CategorySection
        title="Home"
        href="/category/home"
        products={getProductsByCategory('Home')}
        onAddToCart={handleAddToCart}
      />

      <div className="bg-muted/20">
        <CategorySection
          title="Fashion"
          href="/category/fashion"
          products={getProductsByCategory('Fashion')}
          onAddToCart={handleAddToCart}
        />
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Start Shopping?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers and discover your next favorite product
          </p>
          <Button size="lg" className="bg-secondary hover:bg-secondary-hover text-secondary-foreground font-semibold px-12">
            Create Account
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <ShoppingBag className="w-5 h-5 mr-2" />
                NileCart
              </h3>
              <p className="text-background/80">
                Your trusted partner for premium online shopping experience.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Categories</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/category/electronics" className="hover:text-secondary transition-colors">Electronics</Link></li>
                <li><Link to="/category/groceries" className="hover:text-secondary transition-colors">Groceries</Link></li>
                <li><Link to="/category/fashion" className="hover:text-secondary transition-colors">Fashion</Link></li>
                <li><Link to="/category/home" className="hover:text-secondary transition-colors">Home</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-background/80">
                <li><Link to="/help" className="hover:text-secondary transition-colors">Help Center</Link></li>
                <li><Link to="/returns" className="hover:text-secondary transition-colors">Returns</Link></li>
                <li><Link to="/shipping" className="hover:text-secondary transition-colors">Shipping Info</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <p className="text-background/80">
                Questions? Reach out via WhatsApp<br />
                for instant support and orders.
              </p>
            </div>
          </div>
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-background/60">
            <p>&copy; 2025 NileCart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
