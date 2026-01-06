// frontend/src/components/Header.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação interna
import '../styles/header_footer.css'; // Importa o CSS específico para o Header e Footer

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo-header">
          {/* Convertendo <a> para Link para navegação interna */}
          <Link to="/">
            {/* Caminho da imagem: public/images/brasaoLogo.png */}
            <img src="/images/brasaoLogo.png" alt="A Divisa" />
          </Link>
        </div>
        <div className="menu-header">
          <ul>
            <li><Link to="/">Início</Link></li> {/* Usando a rota / */}
            <li><Link to="/produtos">Produtos</Link></li> {/* Usando a rota /produtos */}
            <li><Link to="/sobre-nos">Sobre nós</Link></li> {/* Usando a rota /sobre-nos */}
            <li><Link to="/contato">Contato</Link></li> {/* Usando a rota /contato */}
            <li><Link to="/pedidos">Pedidos</Link></li> {/* Usando a rota /pedidos */}
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;