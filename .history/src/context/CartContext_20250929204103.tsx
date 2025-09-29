import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product } from '@/components/ProductCard';
import { DeliveryAddress } from '@/components/DeliveryAddressForm';
import { formatCurrency } from '@/lib/currency';

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Product }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const initialState: CartState = {
  items: [],
  total: 0,
  itemCount: 0,
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      let newItems: CartItem[];
      if (existingItem) {
        newItems = state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: newItems, total, itemCount };
    }
    
    case 'CLEAR_CART':
      return initialState;
    
    default:
      return state;
  }
};

interface CartContextType extends CartState {
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  generateWhatsAppMessage: (deliveryAddress?: DeliveryAddress) => string;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (product: Product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeItem = (productId: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: productId });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id: productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const generateWhatsAppMessage = (deliveryAddress?: DeliveryAddress) => {
    if (state.items.length === 0) return '';
    
    let message = `*NileCart Order Request - South Sudan*\n\n`;
    message += `Hello! I would like to place an order for the following items:\n\n`;
    
    state.items.forEach((item, index) => {
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Category: ${item.category}\n`;
      message += `   Price: $${item.price.toFixed(2)}\n`;
      message += `   Quantity: ${item.quantity}\n`;
      message += `   Subtotal: $${(item.price * item.quantity).toFixed(2)}\n\n`;
    });
    
    message += `*Total Amount: $${state.total.toFixed(2)}*\n\n`;
    
    if (deliveryAddress) {
      message += `*Delivery Address:*\n`;
      message += `Name: ${deliveryAddress.fullName}\n`;
      message += `Phone: ${deliveryAddress.phoneNumber}\n`;
      message += `Address: ${deliveryAddress.street}\n`;
      message += `City: ${deliveryAddress.city}, ${deliveryAddress.state}\n`;
      if (deliveryAddress.landmark) {
        message += `Landmark: ${deliveryAddress.landmark}\n`;
      }
      message += `\n`;
    }
    
    message += `*Payment Method:* Cash on Delivery (COD)\n\n`;
    message += `Please confirm availability and estimated delivery time. Thank you!`;
    
    return encodeURIComponent(message);
  };

  const value: CartContextType = {
    ...state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    generateWhatsAppMessage,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};