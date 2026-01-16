// frontend/src/components/Header.jsx

import React, { useState } from 'react'; // Importando useState para gerenciar o estado do menu
import { Link } from 'react-router-dom'; // Importando Link para navegação interna
import '../styles/header_footer.css'; // Importa o CSS específico para o Header e Footer
import { useCart } from '../CartContext'; // Importa o hook useCart

function Header() {
  const { totalItems } = useCart(); // Usa o hook para pegar o total de itens no carrinho
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado para controlar o menu mobile (aberto/fechado)

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

        <nav className="menu-header"> {/* Menu de navegação principal para desktop */}
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/sobre-nos">Sobre nós</Link></li>
            <li><Link to="/pedidos">Pedidos</Link></li>
          </ul>
        </nav>
        
        <div className="cart-widget-right-desktop"> {/* Carrinho para desktop */}
          <Link to="/pedidos" className="cart-icon-link"> 
            {/* Ícone do carrinho com Font Awesome para Desktop */}
            <i className="fas fa-shopping-cart"></i> {/* <--- ALTERADO AQUI */}
            {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>

      {/* ------------------- Estrutura do Header para Mobile ------------------- */}
      <div className="header-container-mobile">
        {/* Ícone de Hambúrguer (agora será o primeiro item visualmente) */}
        <div className={`hamburger-menu ${isMenuOpen ? 'open' : ''}`} onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Logo (segundo item visualmente) */}
        <div className="logo-header-mobile">
            <Link to="/">
                <img src="/images/brasaoLogo.png" alt="A Divisa" />
            </Link>
        </div>
        
        {/* Carrinho (terceiro item visualmente, renomeado para generalizar) */}
        <div className="cart-widget-mobile">
            <Link to="/pedidos" className="cart-icon-link">
                {/* Ícone do carrinho com Font Awesome para Mobile */}
                <i className="fas fa-shopping-cart"></i> {/* <--- ALTERADO AQUI */}
                {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
            </Link>
        </div>
      </div>

      {/* ------------------- Overlay de Navegação Mobile (Menu Sanduíche) ------------------- */}
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