import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { useApi } from '../hooks/useApi';
import { fetchProductById } from '../utils/api';
import { addToCart } from '../utils/api';
import { useCart } from '../context/CartContext'; // Importamos para actualizar el count

const ProductDetailPage = () => {
  const { id } = useParams();
  const { data: product, loading, error } = useApi(fetchProductById, [id]);
  const { setCartCount } = useCart(); // Usamos la función para actualizar el count global

  const [selectedColor, setSelectedColor] = useState('');
  const [selectedStorage, setSelectedStorage] = useState('');
  const [message, setMessage] = useState('');

  // Efecto para preseleccionar opciones si solo hay una
  useEffect(() => {
    if (product) {
      if (product.options.colors && product.colors.length === 1) {
        setSelectedColor(product.options.colors[0].code);
      }
      if (product.options.storages && product.options.storages.length === 1) {
        setSelectedStorage(product.options.storages[0].code);
      }
    }
  }, [product]); // Se ejecuta cuando cambia 'product'

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage) {
      setMessage('Por favor, selecciona color y almacenamiento.');
      return;
    }

    try {
      // Asumiendo que el API espera 'colorCode' y 'storageCode'
      const newCount = await addToCart(id, selectedColor, selectedStorage);
      setCartCount(newCount); // Actualizamos el count global
      setMessage('Producto añadido al carrito!');
    } catch (err) {
      setMessage('Error al añadir al carrito.');
      console.error(err);
    }
  };

  if (loading) return <div className="loading">Cargando producto...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  if (!product) return <div className="error">Producto no encontrado.</div>;

  const imageUrl = product.imgUrl || 'https://placehold.co/300'; // Imagen placeholder

  return (
    <div className="page pdp">
      <Header breadcrumbs={[{ text: 'Inicio', link: '/' }, { text: 'Detalles del Producto' }]} />
      <main>
        <Link to="/" className="back-link">← Volver a la lista</Link>
        <div className="product-detail-container">
          <div className="product-image-section">
            <img src={imageUrl} alt={`${product.brand} ${product.model}`} />
          </div>

          <div className="product-info-section">
            <h1>{product.brand}</h1>
            <h2>{product.model}</h2>
            <p className="price">${product.price}</p>

            <div className="product-description">
              <h3>Detalles:</h3>
              <ul>
                <li>CPU: {product.cpu}</li>
                <li>RAM: {product.ram}</li>
                <li>Sistema Operativo: {product.os}</li>
                <li>Resolución de pantalla: {product.screen_resolution}</li>
                <li>Batería: {product.battery}</li>
                <li>Cámaras: {product.cameras}</li>
                <li>Dimensiones: {product.dimentions}</li>
                <li>Peso: {product.weight}</li>
              </ul>
            </div>

            <div className="product-actions">
              <div className="selector-group">
                <label htmlFor="color-select">Color:</label>
                <select
                  id="color-select"
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  disabled={!product.options.colors || product.options.colors.length === 0}
                >
                  {!product.options.colors || product.options.colors.length === 0 ? (
                    <option>No disponible</option>
                  ) : (
                    product.options.colors.map((color) => (
                      <option key={color.code} value={color.code}>
                        {color.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <div className="selector-group">
                <label htmlFor="storage-select">Almacenamiento:</label>
                <select
                  id="storage-select"
                  value={selectedStorage}
                  onChange={(e) => setSelectedStorage(e.target.value)}
                  disabled={!product.options.storages || product.options.storages.length === 0}
                >
                  {!product.options.storages || product.options.storages.length === 0 ? (
                    <option>No disponible</option>
                  ) : (
                    product.options.storages.map((storage) => (
                      <option key={storage.code} value={storage.code}>
                        {storage.name}
                      </option>
                    ))
                  )}
                </select>
              </div>

              <button onClick={handleAddToCart} disabled={!selectedColor || !selectedStorage}>
                Añadir al carrito
              </button>
              {message && <p className="message">{message}</p>}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProductDetailPage;