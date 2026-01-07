// frontend/src/pages/HomeContent.jsx (ou components/HomeContent.jsx)

import React from 'react';
import { Link } from 'react-router-dom'; // Importando Link para navegação interna
import '../styles/home.css'; // Importa o CSS específico para a HomeContent

function HomeContent() {
  return (
    // <--- ADIÇÃO: Adicionamos esta div para envolver todo o conteúdo
    <div className="home-page-container">
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
            {/* O link para /Cardapio/chile/chile.html sugere uma página interna. Considere criar uma rota React para ela. */}
            <Link to="/historia-chuvisco"> {/* Sugestão de rota mais limpa para a história */}
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
            {/* Links como /pagina de produto/... podem ser problemáticos com React Router se não forem rotas definidas. */}
            {/* Considere uma rota como /produtos/arg-prod/arge-1 ou /produto/chuvisco-cristalizado */}
            <Link to="/produto/chuvisco-cristalizado"> {/* Exemplo de rota mais limpa */}
              {/* Caminho da imagem: public/images/cristalizado.jpeg */}
              <img src="/images/cristalizado.jpeg" alt="Chuviscos cristalizados" className="destaques" />
            </Link>
            <h3 className="subtitulodestaque">Chuviscos cristalizados</h3>
            <p className="descripciondestaque">Deliciosos chuviscos cristalizados, envolto em camada fina de açucar refinado.</p>
          </div>
          <div className="opcao_2">
            {/* Convertendo <a> para Link para navegação interna */}
            <Link to="/produto/chuvisco-em-calda"> {/* Exemplo de rota mais limpa */}
              {/* Caminho da imagem: public/images/caldacom.jpeg */}
              <img src="/images/caldacom.jpeg" alt="Chuviscos em calda" />
            </Link>
            <h3 className="subtitulodestaque">Chuviscos em calda</h3>
            <p className="descripciondestaque">Chuvisco tradicional em calda, preparado com matéria prima selecionada .</p>
          </div>
        </div>
        <div className="conferircontainer">
          <button className="conferircardapio">
            {/* ALTERAÇÃO AQUI: O 'to' do Link foi mudado para '/produtos' */}
            <Link to="/produtos"
              style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#e9a913' }}>
              CONFERIR PRODUTOS
            </Link>
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomeContent;