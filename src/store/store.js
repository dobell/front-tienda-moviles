import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../features/cart/cartSlice'; // Lo crearemos en el siguiente paso

export const store = configureStore({
  reducer: {
    cart: cartReducer, // El slice del carrito se encarga de la parte del estado llamada 'cart'
  },
  // Opcional: Middleware adicionales pueden añadirse aquí
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Configuración por defecto para evitar problemas con Redux DevTools
        // Puedes personalizarla si manejas datos no serializables (como Date, Set, Map)
        // Por ahora, dejamos la configuración por defecto
      },
    }),
});