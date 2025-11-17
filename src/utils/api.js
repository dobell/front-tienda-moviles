// llamadas a la api para obtener datos
import { getFromCache, setInCache } from './cache';

const API_BASE = 'https://itx-frontend-test.onrender.com/api';

/**
 * Obtener los productos del caché o bien consultarlos a la api si la caché no los tiene
 * @returns lista de productos
 */
export const fetchProducts = async () => {
  const cacheKey = 'products';
  let data = getFromCache(cacheKey);

  if (!data) {
    console.log('[API] Fetching products...');
    const response = await fetch(`${API_BASE}/product`);
    if (!response.ok) {
      throw new Error('Error al buscar productos');
    }
    data = await response.json();
    setInCache(cacheKey, data);
  } else {
    console.log('[API] Mostrando productos desde cache');
  }
  return data;
};

/**
 * Obtener detalles de producto concreto
 * @param {number} id id del producto
 * @returns datos del producto indicado
 */
export const fetchProductById = async (id) => {
  const cacheKey = `product_${id}`;
  let data = getFromCache(cacheKey);

  if (!data) {
    console.log(`[API] Buscando producto ${id}...`);
    const response = await fetch(`${API_BASE}/product/${id}`);
    if (!response.ok) {
      throw new Error('Error al buscar producto');
    }
    data = await response.json();
    setInCache(cacheKey, data);
  } else {
    console.log(`[API] Mostrando producto ${id} desde cache`);
  }
  return data;
};

/**
 * 
 * @param {number} id 
 * @param {*} colorCode 
 * @param {*} storageCode 
 * @returns el número de productos en el carro
 */
export const addToCart = async (id, colorCode, storageCode) => {
  console.log('[API] Adding to cart...', { id, colorCode, storageCode });
  const response = await fetch(`${API_BASE}/cart`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id, colorCode, storageCode }),
  });

  if (!response.ok) {
    throw new Error('Failed to add item to cart');
  }
  const result = await response.json();
  console.log('[API] Cart updated, new count:', result.count);
  return result.count; // Devolvemos el nuevo count
};