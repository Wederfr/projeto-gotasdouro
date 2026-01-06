// frontend/src/components/HomeContent.jsx

import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação interna
import '../styles/home.css'; // Importa o CSS específico para a HomeContent

function HomeContent() {
  return (
    <>
      <section>
        <div className="banner1-contenedor">
          {/* Caminho da imagem: public/images/banner1.png */}
          <img src="/images/banner1.png" alt="Gotas D'ouro" />
        </div>
        <p className="titulohome">A ORIGEM DO CHUVISCO</p>
        <p className="subtitulohome">Clique na imagem abaixo para conhecer</p>
        <div className="comidas-container">
          <div className="historiaportugal">
            <br />
            {/* Convertendo <a> para Link para navegação interna */}
            <Link to="/Cardapio/chile/chile.html">
              {/* Caminho da imagem: public/images/portugalicon.png */}
              <img src="/images/portugalicon.png" alt="Ícone de Portugal/Chile" />
            </Link>
          </div>
        </div>
      </section>

      <section>
        <h3 className="titulohome">DESTAQUES</h3>
        <p className="subtitulohome">Produtos em destaque</p>
        <br /><br />
        <div className="destaquescontainer">
          <div className="opcao_1">
            {/* Convertendo <a> para Link para navegação interna */}
            <Link to="/pagina de produto/Arg_Prod/Arge_1.html">
              {/* Caminho da imagem: public/images/cristalizado.jpeg */}
              <img src="/images/cristalizado.jpeg" alt="Chuviscos cristalizados" className="destaques" />
            </Link>
            <h3 className="subtitulodestaque">Chuviscos cristalizados</h3>
            <p className="descripciondestaque">Deliciosos chuviscos cristalizados, envolto em camada fina de açucar refinado.</p>
          </div>
          <div className="opcao_2">
            {/* Convertendo <a> para Link para navegação interna */}
            <Link to="/pagina de produto/Col_Prod/Colo_1.html">
              {/* Caminho da imagem: public/images/caldacom.jpeg */}
              <img src="/images/caldacom.jpeg" alt="Chuviscos em calda" className="destaques" />
            </Link>
            <h3 className="subtitulodestaque">Chuviscos em calda</h3>
            <p className="descripciondestaque">Chuvisco tradicional em calda, preparado com matéria prima selecionada .</p>
          </div>
        </div>
        <div className="conferircontainer">
          <button className="conferircardapio">
            {/* Convertendo <a> para Link para navegação interna. O style foi mantido como objeto JS para React */}
            <Link to="/Cardapio/cardapio.html"
              style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#e9a913' }}>
              CONFERIR PRODUTOS
            </Link>
          </button>
        </div>
      </section>
    </>
  );
}

export default HomeContent;