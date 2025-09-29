import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Edit, Trash2, Eye, EyeOff, Package } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { formatCurrency, getSSPPrice } from '@/lib/currency';

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  image_url: string | null;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

const MyProducts = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: ''
  });

  const categories = [
    'Electronics',
    'Groceries', 
    'Fashion',
    'Home',
    'Sports',
    'Books',
    'Toys',
    'Health & Beauty'
  ];

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
        toast({
          title: "Error",
          description: "Failed to fetch products.",
          variant: "destructive"
        });
      } else {
        setProducts(data || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
      toast({
        title: "Error",
        description: "Failed to fetch products.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setEditFormData({
      title: product.title,
      description: product.description,
      price: (product.price / 1500).toFixed(2), // Convert back to USD for editing
      category: product.category
    });
  };

  const handleUpdate = async () => {
    if (!editingProduct || !user) return;

    try {
      const priceInSSP = getSSPPrice(parseFloat(editFormData.price));

      const { error } = await supabase
        .from('products')
        .update({
          title: editFormData.title,
          description: editFormData.description,
          price: priceInSSP,
          category: editFormData.category,
          updated_at: new Date().toISOString()
        })
        .eq('id', editingProduct.id)
        .eq('seller_id', user.id);

      if (error) {
        console.error('Error updating product:', error);
        toast({
          title: "Update failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Product updated",
          description: "Your product has been updated successfully."
        });
        setEditingProduct(null);
        fetchProducts();
      }
    } catch (err) {
      console.error('Error updating product:', err);
      toast({
        title: "Update failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = async (productId: string) => {
    if (!user) return;

    if (!confirm('Are you sure you want to delete this product? This action cannot be undone.')) {
      return;
    }

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productId)
        .eq('seller_id', user.id);

      if (error) {
        console.error('Error deleting product:', error);
        toast({
          title: "Delete failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        toast({
          title: "Product deleted",
          description: "Your product has been deleted successfully."
        });
        fetchProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      toast({
        title: "Delete failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading your products...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">My Products</h2>
          <p className="text-muted-foreground">
            Manage your product listings and track their status
          </p>
        </div>
        <Badge variant="outline" className="text-sm">
          {products.length} product{products.length !== 1 ? 's' : ''}
        </Badge>
      </div>

      {/* Products List */}
      {products.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No products yet</h3>
            <p className="text-muted-foreground">
              Upload your first product to get started selling on NileCart.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square overflow-hidden bg-muted">
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-12 h-12 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h3 className="font-semibold line-clamp-2">{product.title}</h3>
                    <Badge variant={product.is_approved ? "default" : "secondary"}>
                      {product.is_approved ? (
                        <><Eye className="w-3 h-3 mr-1" /> Approved</>
                      ) : (
                        <><EyeOff className="w-3 h-3 mr-1" /> Pending</>
                      )}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-primary">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {product.category}
                    </span>
                  </div>
                  
                  <div className="flex gap-2 pt-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleEdit(product)}
                          className="flex-1"
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Edit Product</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label htmlFor="edit-title">Title</Label>
                            <Input
                              id="edit-title"
                              value={editFormData.title}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, title: e.target.value }))}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Textarea
                              id="edit-description"
                              value={editFormData.description}
                              onChange={(e) => setEditFormData(prev => ({ ...prev, description: e.target.value }))}
                              rows={3}
                            />
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="edit-price">Price (USD)</Label>
                              <Input
                                id="edit-price"
                                type="number"
                                step="0.01"
                                value={editFormData.price}
                                onChange={(e) => setEditFormData(prev => ({ ...prev, price: e.target.value }))}
                              />
                            </div>
                            
                            <div className="space-y-2">
                              <Label htmlFor="edit-category">Category</Label>
                              <Select
                                value={editFormData.category}
                                onValueChange={(value) => setEditFormData(prev => ({ ...prev, category: value }))}
                              >
                                <SelectTrigger>
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {categories.map((category) => (
                                    <SelectItem key={category} value={category}>
                                      {category}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button onClick={handleUpdate} className="flex-1">
                              Update Product
                            </Button>
                            <Button
                              variant="outline"
                              onClick={() => setEditingProduct(null)}
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyProducts;
