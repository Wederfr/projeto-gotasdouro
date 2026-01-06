// frontend/src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação interna
import '../styles/header_footer.css'; // Importa o CSS específico para o Header e Footer
import { useCart } from '../CartContext'; // Importa o hook useCart

function Header() {
  const { totalItems } = useCart(); // Usa o hook para pegar o total de itens no carrinho

  return (
    <header>
      <div className="header-container">
        {/* Lado esquerdo: Logo */}
        <div className="logo-header">
          <Link to="/">
            <img src="/images/brasaoLogo.png" alt="A Divisa" />
          </Link>
        </div>

        {/* Meio: Menu de navegação principal (com "Pedidos" como texto) */}
        <nav className="menu-header"> {/* É mais semântico usar <nav> aqui */}
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/sobre-nos">Sobre nós</Link></li>
            <li><Link to="/contato">Contato</Link></li>
            <li><Link to="/pedidos">Pedidos</Link></li> {/* "Pedidos" como um item de texto normal no menu */}
          </ul>
        </nav>
        
        {/* Lado direito extremo: Widget do carrinho com ícone e contador */}
        <div className="cart-widget-right"> {/* Novo wrapper para o ícone do carrinho */}
          <Link to="/pedidos" className="cart-icon-link">
            <span role="img" aria-label="carrinho">🛒</span>
            {/* O contador só aparece se houver itens no carrinho */}
            {totalItems > 0 && <span className="cart-count-badge">{totalItems}</span>}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;