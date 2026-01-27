import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/home.css';

function HomeContent() {
  return (

    <div className="home-page-container">
      <section>
        <div className="banner1-contenedor">

          <img src="/images/banner1.png" alt="Gotas D'ouro" />
        </div>
        <p className="titulohome">A ORIGEM DO CHUVISCO</p>
        <p className="subtitulohome">Clique na imagem abaixo para conhecer</p>
        <div className="comidas-container">
          <div className="historiaportugal">
            <br />

            <Link to="/historia-chuvisco">

              <img src="/images/portugalicon.png" alt="Ícone de Portugal" />
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

            <Link to="/produto/chuvisco-cristalizado">

              <img src="/images/cristalizado.jpeg" alt="Chuviscos cristalizados" className="destaques" />
            </Link>
            <h3 className="subtitulodestaque">Chuviscos cristalizados</h3>
            <p className="descripciondestaque">Deliciosos chuviscos cristalizados, envolto em camada fina de açucar refinado.</p>
          </div>
          <div className="opcao_2">

            <Link to="/produto/chuvisco-em-calda">

              <img src="/images/caldacom.jpeg" alt="Chuviscos em calda" />
            </Link>
            <h3 className="subtitulodestaque">Chuviscos em calda</h3>
            <p className="descripciondestaque">Chuvisco tradicional em calda, preparado com matéria prima selecionada .</p>
          </div>
        </div>
        <div className="conferircontainer">
          <button className="conferircardapio">

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