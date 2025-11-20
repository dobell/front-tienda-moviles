# Tienda de Productos Móviles

Esta es una mini-aplicación de ejemplo para la compra de dispositivos móviles, desarrollada con React.

## Tecnologías Utilizadas

- React
- React Router DOM
- JavaScript ES6
- CSS

 - En las primeras versiones se ha desactivado eslint por un problema de configuración entre diferentes veresiones. Cuando se corrija se activará de nuevo.

## Cómo Ejecutar el Proyecto

1.  Asegúrate de tener Node.js instalado.
2.  Clona este repositorio.
3.  Navega a la carpeta del proyecto: `cd mobile-store-app`
4.  Instala las dependencias: `npm install`
5.  Inicia el servidor de desarrollo: `npm start`
6.  La aplicación se abrirá automáticamente en `http://localhost:3000`.

## Scripts Disponibles

- `npm start`: Inicia la aplicación en modo desarrollo.
- `npm run build`: Crea una versión optimizada para producción en la carpeta `build`.
- `npm test`: Lanza los tests (actualmente sin tests implementados).
- `npm run lint`: Verifica el código con ESLint (asegúrate de tener ESLint instalado globalmente o como devDependency).

## Funcionalidades

- Vista de listado de productos (PLP) con búsqueda en tiempo real.
- Vista de detalle de producto (PDP) con selección de color y almacenamiento.
- Añadir productos al carrito con persistencia del contador en `localStorage`.
- Caché de datos del API con expiración de 1 hora.
- Navegación entre vistas con React Router.
- Diseño responsive.