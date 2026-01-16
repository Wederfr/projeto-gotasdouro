// frontend/src/components/Footer.jsx

import React, { useState } from 'react'; // Adicionado useState
import { Link } from 'react-router-dom';
import '../styles/header_footer.css';

function Footer() {
  // Estado para controlar a abertura/fechamento do menu do footer no mobile
  const [isFooterMenuOpen, setIsFooterMenuOpen] = useState(false); 

  const toggleFooterMenu = () => {
    setIsFooterMenuOpen(!isFooterMenuOpen);
     console.log("isFooterMenuOpen agora é:", !isFooterMenuOpen); // Adicione esta linha
  };

  return (
    <footer>
      {/* ------------------- Estrutura do Footer para Desktop ------------------- */}
      <div className="footer-container-desktop"> {/* Container para desktop, renomeado */}
        <div className="logo-footer">
          <Link to="/">
            <img src="/images/brasaoLogo.png" alt="imgfooter" />
          </Link>
        </div>
        <div className="menufooter"> {/* Menu de navegação do footer para desktop */}
          <ul>
            <li><Link to="/">Início</Link></li>
            <li><Link to="/produtos">Produtos</Link></li>
            <li><Link to="/sobre-nos">Sobre nós</Link></li>
            <li><Link to="/pedidos">Pedidos</Link></li>
          </ul>
        </div>
        <div className="social-icons"> {/* Ícones sociais para desktop */}
          <a href="https://www.instagram.com/sagres.gotasdouro/"  rel="noopener noreferrer">
            <img src="/images/instagramicon.png" alt="Instagram" />
          </a>
          <a href="https://wa.me/5522988043323"  rel="noopener noreferrer">
            <img src="/images/whatsappicon.png" alt="Watsapp" />
          </a>
        </div>
      </div>

      {/* ------------------- Estrutura do Footer para Mobile ------------------- */}
      <div className="footer-container-mobile"> {/* Container principal para o footer mobile */}
        {/* Ícone de Hambúrguer para o menu do footer (Lado esquerdo) */}
        <div className={`footer-menu-toggle ${isFooterMenuOpen ? 'open' : ''}`} onClick={toggleFooterMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>

        {/* Logomarca no centro para mobile */}
        <div className="logo-footer-mobile">
          <Link to="/">
            <img src="/images/brasaoLogo.png" alt="imgfooter" />
          </Link>
        </div>
        
        {/* Ícones da rede social à direita para mobile */}
        <div className="social-icons-mobile">
          <a href="https://www.instagram.com/sagres.gotasdouro/"  rel="noopener noreferrer">
            <img src="/images/instagramicon.png" alt="Instagram" />
          </a>
          <a href="https://wa.me/5522988043323"  rel="noopener noreferrer">
            <img src="/images/whatsappicon.png" alt="Watsapp" />
          </a>
        </div>
      </div>

      {/* Menu de navegação do footer para Mobile (colapsível / deslizante) */}
      <div className={`menufooter-mobile-links ${isFooterMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><Link to="/" onClick={toggleFooterMenu}>Início</Link></li>
          <li><Link to="/produtos" onClick={toggleFooterMenu}>Produtos</Link></li>
          <li><Link to="/sobre-nos" onClick={toggleFooterMenu}>Sobre nós</Link></li>
          <li><Link to="/pedidos" onClick={toggleFooterMenu}>Pedidos</Link></li>
        </ul>
      </div>

      <div className="creditos">
        Imagens meramente ilustrativas. Gotas D'ouro - desenvolvido por Weder e Maria Eduarda
      </div>
    </footer>
  );
  
}

export default Footer;