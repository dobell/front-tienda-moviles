// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import ProductListPage from './pages/ProductListPage';
import ProductDetailPage from './pages/ProductDetailPage';
import './App.css'; // Archivo CSS para estilos básicos

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            {/* Opcional: Ruta para carrito, aunque solo muestra el contador en header */}
            {/* <Route path="/cart" element={<CartPage />} /> */}
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;