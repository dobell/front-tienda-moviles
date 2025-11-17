/**
 * Contexto para el carrito
 */
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_COUNT':
      return { ...state, count: action.payload };
    case 'CLEAR_CART':
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  // Intentar cargar el contador inicial desde localStorage (navegaor de usuario)
  const initialCount = parseInt(localStorage.getItem('cartCount')) || 0;
  const [state, dispatch] = useReducer(cartReducer, { count: initialCount });

  // Efecto para guardar el contador en localStorage cada vez que cambie
  useEffect(() => {
    localStorage.setItem('cartCount', state.count);
  }, [state.count]);

  const setCartCount = (count) => {
    dispatch({ type: 'SET_COUNT', payload: count });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    localStorage.removeItem('cartCount'); // Limpiar también localStorage
  };

  return (
    <CartContext.Provider value={{ count: state.count, setCartCount, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart tiene que estar dentro de un CartProvider');
  }
  return context;
};