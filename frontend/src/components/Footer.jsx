// frontend/src/components/Footer.jsx

import React from 'react';

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-footer">
          <a href="/">
            <img src="/images/brasaoLogo.png" alt="imgfooter" /> {/* MUDANÇA AQUI */}
          </a>
        </div>
        <div className="menufooter">
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/Cardapio/cardapio.html">produtos</a></li>
            <li><a href="/Sobre nos/sobrenos.html">Sobre nós</a></li>
            <li><a href="/pedidos/pedidos.html">Fazer pedido</a></li>
            <li><a href="/Contato/contato.html">Contato</a></li>
            <li><a href="/sac/sac.html">SAC</a></li>
          </ul>
        </div>
        <div className="social-icons">
          <a href="#">
            <img src="/images/instagramicon.png" alt="Instagram" /> {/* MUDANÇA AQUI */}
          </a>
          <a href="#">
            <img src="/images/whatsappicon.png" alt="Watsapp" /> {/* MUDANÇA AQUI */}
          </a>
        </div>
      </div>
      <div className="creditos">
        Imagens meramente ilustrativas. Gotas D'ouro - desenvolvido por Weder e Maria Eduarda
      </div>
    </footer>
  );
}

export default Footer;