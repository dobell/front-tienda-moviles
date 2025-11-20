import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Header = ({ breadcrumbs = [] }) => {
  const { count } = useCart(); // Usamos el contexto para obtener el count de productos en el carro

  return (
    <header className="header">
      <div className="header-left">
        <Link to="/" className="app-title">Tienda Móvil</Link>
        <nav className="breadcrumbs">
          {breadcrumbs.map((crumb, index) => (
            <React.Fragment key={index}>
              {crumb.link ? <Link to={crumb.link}>{crumb.text}</Link> : <span>{crumb.text}</span>}
              {index < breadcrumbs.length - 1 && <span> / </span>}
            </React.Fragment>
          ))}
        </nav>
      </div>
      <div className="header-right">
        <Link to="/cart" className="cart-count">
          🛒 ({count})
        </Link>
      </div>
    </header>
  );
};

export default Header;