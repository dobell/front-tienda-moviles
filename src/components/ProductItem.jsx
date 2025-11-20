import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
  // Aseguramos que las imágenes tengan un fallback
  const imageUrl = product.imgUrl || 'https://placehold.co/150'; // Imagen placeholder si no hay imagen de producto

  return (
    <Link to={`/product/${product.id}`} className="product-item">
      <img src={imageUrl} alt={`${product.brand} ${product.model}`} />
      <div className="product-info">
        <h3>{product.brand}</h3>
        <h4>{product.model}</h4>
        <p className="price">${product.price}</p>
      </div>
    </Link>
  );
};

export default ProductItem;