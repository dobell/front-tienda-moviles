/*
*Funciones para gestionar la caché en localStorage
*/

const CACHE_KEY = 'api_cache'; // nombre del elemento en la caché del navegador
const CACHE_DURATION = 60 * 60 * 1000; // tiempo de almacenamiento 1 hora en milisegundos

// leer datos del caché
export const getFromCache = (key) => {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  const cachedItem = cache[key];
  if (cachedItem) {
    const now = Date.now();
    if (now - cachedItem.timestamp < CACHE_DURATION) {
      console.log(`[Cache] Elemento de caché vaálido: ${key}`);
      return cachedItem.data;
    } else {
      console.log(`[Cache] Clave expirada: ${key}`);
      delete cache[key];
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    }
  }
  return null;
};

// guardar en caché
export const setInCache = (key, data) => {
  const cache = JSON.parse(localStorage.getItem(CACHE_KEY) || '{}');
  cache[key] = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
  console.log(`[Cache] Clave guardada: ${key}`);
};

// borrar caché
export const clearCache = () => {
  localStorage.removeItem(CACHE_KEY);
  console.log('[Cache] Borrada');
};