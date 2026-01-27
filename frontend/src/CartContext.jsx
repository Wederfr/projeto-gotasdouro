import React, { createContext, useState, useContext, useEffect } from 'react';

// Criação do Contexto

const CartContext = createContext({
  cart: [],
  addItem: () => { },
  removeItem: () => { },
  updateItemQuantity: () => { },
  clearCart: () => { },
  totalItems: 0,
  totalPrice: 0,
});

// Componente Provedor do Contexto

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState(() => {
    try {
      const localCart = localStorage.getItem('cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error("Failed to load cart from localStorage", error);
      return [];
    }
  });


  useEffect(() => {
    try {
      localStorage.setItem('cart', JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage", error);
    }
  }, [cart]);

  // Funções para manipular o carrinho
  const addItem = (product, quantity = 1) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        // Se o item já existe, atualiza a quantidade
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        // Se o item não existe, adiciona-o ao carrinho
        return [...prevCart, { ...product, quantity }];
      }
    });
  };

  const removeItem = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const updateItemQuantity = (productId, newQuantity) => {
    setCart((prevCart) => {
      if (newQuantity <= 0) {
        // Se a nova quantidade for 0 ou menos, remove o item
        return prevCart.filter((item) => item.id !== productId);
      }
      // Caso contrário, atualiza a quantidade
      return prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calcula o número total de itens no carrinho
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Calcula o preço total do carrinho
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  // O valor que será fornecido pelo contexto
  const contextValue = {
    cart,
    addItem,
    removeItem,
    updateItemQuantity,
    clearCart,
    totalItems,
    totalPrice,
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

// Hook Personalizado para Consumir o Contexto

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};