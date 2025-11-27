import React from 'react';
import { Link } from 'react-router-dom';
// Importamos hooks de React-Redux
import { useSelector } from 'react-redux';

const Header = ({ breadcrumbs = [] }) => {
  // Obtenemos el count del estado de Redux en vez del contexto
  const cartCount = useSelector((state) => state.cart.count);

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
          🛒 ({cartCount})
        </Link>
      </div>
    </header>
  );
};

export default Header;