import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header_footer.css';
import { useCart } from '../CartContext';

function Header() {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Função para alternar o estado do menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header>
      {/* ------------------- Estrutura do Header para Desktop ------------------- */}
      <div className="header-container-desktop">
        <div className="logo-header">
          <Link to="/">
            <img src="/images/brasaoLogo.png" alt="A Divisa" />
          </Link>
        </div>

        <nav className="menu-header">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/sobre-nos">Sobre nós</Link></li>
            <li><Link to="/pedidos">Pedidos</Link></li>
          </ul>
        </nav>

        <div className="cart-widget-right-desktop">
          <Link to="/pedidos" className="cart-icon-link">

            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>

      {/* ------------------- Estrutura do Header para Mobile ------------------- */}
      <div className="header-container-mobile">

        <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>


        <div className="logo-header-mobile">
          <Link to="/">
            <img src="/images/brasaoLogo.png" alt="A Divisa" />
          </Link>
        </div>


        <div className="cart-widget-mobile">
          <Link to="/pedidos" className="cart-icon-link">

            <i className="fas fa-shopping-cart"></i>
            {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>


      <div className={`menu-header-mobile-overlay ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleMenu}>Início</Link></li>
          <li><Link to="/produtos" onClick={toggleMenu}>Produtos</Link></li>
          <li><Link to="/sobre-nos" onClick={toggleMenu}>Sobre nós</Link></li>
          <li><Link to="/pedidos" onClick={toggleMenu}>Pedidos</Link></li>
        </ul>
      </div>
    </header>
  );
}

export default Header;