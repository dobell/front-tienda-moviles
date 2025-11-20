import React, { useState } from 'react';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import ProductItem from '../components/ProductItem';
import { useApi } from '../hooks/useApi';
import { fetchProducts } from '../utils/api';

const ProductListPage = () => {
  const { data: products, loading, error } = useApi(fetchProducts);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrado local
  const filteredProducts = products
    ? products.filter(
        (product) =>
          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.model.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  if (loading) return <div className="loading">Cargando productos...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="page plp">
      <Header breadcrumbs={[{ text: 'Inicio' }]} />
      <main>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default ProductListPage;