// frontend/src/components/HomeContent.jsx

import React from 'react';

function HomeContent() {
  return (
    <>
      <section>
        <div className="banner1-contenedor">
          <img src="/images/banner1.png" alt="Gotas D'ouro" /> {/* MUDANÇA AQUI */}
        </div>
        <p className="titulohome">A ORIGEM DO CHUVISCO</p>
        <p className="subtitulohome">Clique na imagem abaixo para conhecer</p>
        <div className="comidas-container">
          <div className="historiaportugal">
            <br />
            <a href="/Cardapio/chile/chile.html">
              <img src="/images/portugalicon.png" /> {/* MUDANÇA AQUI */}
            </a>
          </div>
        </div>
      </section>

      <section>
        <h3 className="titulohome">DESTAQUES</h3>
        <p className="subtitulohome">Produtos em destaque</p>
        <br /><br />
        <div className="destaquescontainer">
          <div className="opcao_1">
            <a href="/pagina de produto/Arg_Prod/Arge_1.html">
              <img src="/images/cristalizado.jpeg" alt="Nachos com carne moida" className="destaques" /> {/* MUDANÇA AQUI */}
            </a>
            <h3 className="subtitulodestaque">Chuviscos cristalizados</h3>
            <p className="descripciondestaque">Deliciosos chuviscos cristalizados, envolto em camada fina de açucar refinado.</p>
          </div>
          <div className="opcao_2">
            <a href="/pagina de produto/Col_Prod/Colo_1.html">
              <img src="/images/caldacom.jpeg" alt="Bife ao molho" className="destaques" /> {/* MUDANÇA AQUI */}
            </a>
            <h3 className="subtitulodestaque">Chuviscos em calda</h3>
            <p className="descripciondestaque">Chuvisco tradicional em calda, preparado com matéria prima selecionada .</p>
          </div>
        </div>
        <div className="conferircontainer">
          <button className="conferircardapio">
            <a href="/Cardapio/cardapio.html"
              style={{ textDecoration: 'none', color: '#fff', backgroundColor: '#e9a913' }}>
              CONFERIR PRODUTOS
            </a>
          </button>
        </div>
      </section>
    </>
  );
}

export default HomeContent;