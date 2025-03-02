import React, { createContext, useState, useContext, useEffect } from 'react';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string;
  restaurantId: string;
}

interface CartContextType {
  items: CartItem[];
  restaurantId: string | null;
  totalItems: number;
  totalAmount: number;
  addToCart: (item: Omit<CartItem, 'quantity'>, restaurantId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [restaurantId, setRestaurantId] = useState<string | null>(null);

  // Load cart from localStorage on initial load
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestaurantId = localStorage.getItem('restaurantId');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    
    if (savedRestaurantId) {
      setRestaurantId(savedRestaurantId);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
    if (restaurantId) {
      localStorage.setItem('restaurantId', restaurantId);
    } else {
      localStorage.removeItem('restaurantId');
    }
  }, [items, restaurantId]);

  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalAmount = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const addToCart = (item: Omit<CartItem, 'quantity'>, newRestaurantId: string) => {
    // Check if adding from a different restaurant
    if (restaurantId && restaurantId !== newRestaurantId && items.length > 0) {
      const confirmed = window.confirm(
        'Adding items from a different restaurant will clear your current cart. Continue?'
      );
      
      if (!confirmed) return;
      
      setItems([]);
    }

    setRestaurantId(newRestaurantId);
    
    setItems((prevItems) => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex((i) => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        // Update quantity of existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += 1;
        toast.success(`${item.name} quantity updated in cart!`);
        return updatedItems;
      } else {
        // Add new item to cart
        toast.success(`${item.name} added to cart!`);
        return [...prevItems, { ...item, quantity: 1, restaurantId: newRestaurantId }];
      }
    });
  };

  const removeFromCart = (itemId: string) => {
    setItems((prevItems) => {
      const updatedItems = prevItems.filter((item) => item.id !== itemId);
      
      // If cart is empty, reset restaurantId
      if (updatedItems.length === 0) {
        setRestaurantId(null);
      }
      
      return updatedItems;
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setRestaurantId(null);
  };

  const value = {
    items,
    restaurantId,
    totalItems,
    totalAmount,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};