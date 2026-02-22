import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/header_footer.css';

function Footer() {

  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState(false);

  const toggleFooterMenu = () => {
    setIsFooterMenuOpen(!isFooterMenuOpen);
    console.log("isFooterMenuOpen agora é:", !isFooterMenuOpen);
  };

  return (
    <footer>
      {/* ------------------- Estrutura do Footer para Desktop ------------------- */}
      <div className="footer-container-desktop"> { }
        <div className="logo-footer">
          <Link to="/">
            <img src="/images/brasaoLogo.png" alt="imgfooter" />
          </Link>
        </div>
        <div className="menufooter">
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/sobre-nos">Sobre nós</Link></li>
            <li><Link to="/pedidos">Pedidos</Link></li>
          </ul>
        </div>
        <div className="social-icons">
          <a href="https://www.instagram.com/sagres.gotasdouro/" rel="noopener noreferrer">
            <img src="/images/instagram-original-colorido.png" alt="Instagram" />
          </a>
          <a href="https://wa.me/5522999330966" rel="noopener noreferrer">
            <img src="/images/whatsapp-original.png" alt="Watsapp" />
          </a>
        </div>
      </div>

      {/* ------------------- Estrutura do Footer para Mobile ------------------- */}
      <div className="footer-container-mobile">

        <div className={`footer-menu-toggle ${isFooterMenuOpen ? 'open' : ''}`} onClick={toggleFooterMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>


        <div className="logo-footer-mobile">
          <Link to="/">
            <img src="/images/brasaoLogo.png" alt="imgfooter" />
          </Link>
        </div>


        <div className="social-icons-mobile">
          <a href="https://www.instagram.com/sagres.gotasdouro/" rel="noopener noreferrer">
            <img src="/images/instagram-original-colorido.png" alt="Instagram" />
          </a>
          <a href="https://wa.me/5522999330966" rel="noopener noreferrer">
            <img src="/images/whatsapp-original.png" alt="Watsapp" />
          </a>
        </div>
      </div>


      <div className={`menufooter-mobile-links ${isFooterMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleFooterMenu}>Início</Link></li>
          <li><Link to="/produtos" onClick={toggleFooterMenu}>Produtos</Link></li>
          <li><Link to="/sobre-nos" onClick={toggleFooterMenu}>Sobre nós</Link></li>
          <li><Link to="/pedidos" onClick={toggleFooterMenu}>Pedidos</Link></li>
        </ul>
      </div>

      <div className="creditos">
        Imagens meramente ilustrativas. Gotas D'ouro - Desenvolvido por Weder e Maria Eduarda
      </div>
    </footer>
  );

}

export default Footer;