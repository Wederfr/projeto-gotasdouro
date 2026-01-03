// frontend/src/components/Header.jsx

import React from 'react';

function Header() {
  return (
    <header>
      <div className="header-container">
        <div className="logo-header">
          <a href="/">
            <img src="/images/brasaoLogo.png" alt="A Divisa" /> {/* MUDANÇA AQUI */}
          </a>
        </div>
        <div className="menu-header">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/Cardapio/cardapio.html">Produtos</a></li>
            <li><a href="/Sobre nos/sobrenos.html">Sobre nós</a></li>
            <li><a href="/Contato/contato.html">Contato</a></li>
            <li><a href="/pedidos/pedidos.html">Pedidos</a></li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;