import React, { useState } from 'react';
import { ShoppingCart as CartIcon, Plus, Minus, Trash2, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/context/CartContext';
import DeliveryAddressForm, { DeliveryAddress } from './DeliveryAddressForm';
import { formatCurrency } from '@/lib/currency';

const ShoppingCart = () => {
  const { items, total, itemCount, updateQuantity, removeItem, generateWhatsAppMessage, clearCart } = useCart();
  const [showAddressForm, setShowAddressForm] = useState(false);

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
    } else {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = (deliveryAddress: DeliveryAddress) => {
    const whatsappMessage = generateWhatsAppMessage(deliveryAddress);
    const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER;
    
    if (!phoneNumber) {
      console.error('WhatsApp number not configured');
      return;
    }
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`;
    window.open(whatsappUrl, '_blank');
    clearCart();
    setShowAddressForm(false);
  };

  if (items.length === 0) {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CartIcon className="w-5 h-5" />
            Your Cart
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <CartIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Your cart is empty</p>
          <p className="text-sm text-muted-foreground mt-2">Add some products to get started!</p>
        </CardContent>
      </Card>
    );
  }

  if (showAddressForm) {
    return (
      <DeliveryAddressForm
        onSubmit={handleCheckout}
        onCancel={() => setShowAddressForm(false)}
      />
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <CartIcon className="w-5 h-5" />
            Your Cart
          </span>
          <Badge variant="secondary" className="text-sm">
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
            <img
              src={item.image}
              alt={item.name}
              className="w-12 h-12 object-cover rounded-md"
            />
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm truncate">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{formatCurrency(item.price)}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
              >
                <Minus className="w-3 h-3" />
              </Button>
              <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                className="h-8 w-8 p-0"
                onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
              >
                <Plus className="w-3 h-3" />
              </Button>
            </div>
            <Button
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
              onClick={() => removeItem(item.id)}
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          </div>
        ))}
        
        <div className="border-t pt-4">
          <div className="flex justify-between items-center mb-4">
            <span className="font-semibold">Total:</span>
            <span className="font-bold text-lg">{formatCurrency(total)}</span>
          </div>
          
          <div className="space-y-2">
            <Button
              className="w-full"
              onClick={() => setShowAddressForm(true)}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Order via WhatsApp
            </Button>
            <p className="text-xs text-muted-foreground text-center">
              Payment: Cash on Delivery (COD) • Delivery: Juba & surrounding areas
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ShoppingCart;