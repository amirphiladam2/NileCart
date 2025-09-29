import React from 'react';
import { useSearchParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import ProductSearch from '@/components/ProductSearch';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              {query ? `Search Results for "${query}"` : 'Search Products'}
            </h1>
            <p className="text-muted-foreground">
              Find the perfect products for your needs
            </p>
          </div>

          {/* Search Component */}
          <ProductSearch />
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
