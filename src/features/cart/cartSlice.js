// util para redux y estado de carrito
import { createSlice } from '@reduxjs/toolkit';

// Estado inicial del carrito
// Cargamos el count inicial desde localStorage si existe
const loadInitialState = () => {
  const storedCount = localStorage.getItem('reduxCartCount');
  const initialCount = storedCount ? parseInt(storedCount, 10) : 0;
  return { count: initialCount };
};

const initialState = loadInitialState();

export const cartSlice = createSlice({
  name: 'cart', // Nombre del slice
  initialState,
  reducers: {
    // Reducer para establecer el count total del carrito
    setCartCount: (state, action) => {
      state.count += action.payload; // action.payload es el nuevo count. Sumamos al total los productos añadidos
      // Guardamos el count en localStorage cada vez que cambia
      localStorage.setItem('reduxCartCount', state.count);
    },
    // Reducer para limpiar el carrito (opcional)
    clearCart: (state) => {
      state.count = 0;
      localStorage.removeItem('reduxCartCount');
    },
  },
});

// Exportamos las acciones generadas automáticamente
export const { setCartCount, clearCart } = cartSlice.actions;

// Exportamos el reducer del slice
export default cartSlice.reducer;