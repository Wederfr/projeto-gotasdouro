// frontend/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação interna
import '../styles/header_footer.css'; // Importa o CSS específico para o Header e Footer

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="logo-footer">
          {/* Convertendo <a> para Link para navegação interna */}
          <Link to="/">
            {/* Caminho da imagem: public/images/brasaoLogo.png */}
            <img src="/images/brasaoLogo.png" alt="imgfooter" />
          </Link>
        </div>
        <div className="menufooter">
          <ul>
            <li><Link to="/">Início</Link></li> {/* Usando a rota / */}
            <li><Link to="/produtos">Produtos</Link></li> {/* Usando a rota /produtos */}
            <li><Link to="/sobre-nos">Sobre nós</Link></li> {/* Usando a rota /sobre-nos */}
            <li><Link to="/pedidos">Pedidos</Link></li> {/* Usando a rota /pedidos */}
            
          </ul>
        </div>
        <div className="social-icons">
          {/* O href="#" não é ideal para React Router; se esses links forem externos, mantenha <a>.
              Se forem internos, defina rotas para eles. Por enquanto, mantive o href="#" */}
          <a href="https://www.instagram.com/sagres.gotasdouro/">
            {/* Caminho da imagem: public/images/instagramicon.png */}
            <img src="/images/instagramicon.png" alt="Instagram" />
          </a>
          <a href="https://wa.me/5522988043323">
            {/* Caminho da imagem: public/images/whatsappicon.png */}
            <img src="/images/whatsappicon.png" alt="Watsapp" />
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