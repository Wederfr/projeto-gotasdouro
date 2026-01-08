// frontend/src/pages/AboutUsPage.jsx
import React from 'react';
import '../styles/aboutus.css';

function AboutUsPage() {
  return (
    <div className="about-us-container">
      

      <section className="about-section history">
        <h2>Nossa História</h2>
        <p className="historical-text">
          A Gotas D'ouro nasceu da paixão pela confeitaria tradicional e o desejo de resgatar o sabor autêntico dos doces de antigamente. Começamos com uma receita de família, passada de geração em geração, que transformou a simplicidade dos ingredientes em uma experiência única. Há mais de [Número] anos, dedicamo-nos a adoçar a vida de nossos clientes com carinho e tradição.
        </p>
        <p className="historical-text">
          [Adicione mais detalhes sobre a história, marcos importantes, etc.]
        </p>
      </section>

      <section className="about-section mission-values">
        <h2>Missão e Valores</h2>
        <p className="historical-text">
          Nossa missão é "levar alegria através de nossos chuviscos artesanais, feitos com ingredientes selecionados e muito amor".
        </p>
        <p className="historical-text">
          Valorizamos "a tradição, a qualidade, a inovação e o sorriso de cada cliente que prova nossos produtos".
        </p>
      </section>

      <section className="about-section differentials">
        <h2>Por que Gotas D'ouro?</h2>
        {/* ALTERAÇÃO AQUI: Convertido de <ul><li> para um único <p> com a classe historical-text */}
        <p className="historical-text">
          Escolha Gotas D'ouro por nossos Ingredientes Frescos e Selecionados, Receitas Artesanais e Tradicionais, Produção Feita com Carinho e nosso inabalável Compromisso com a Qualidade.
        </p>
      </section>

    </div>
  );
}

export default AboutUsPage;
