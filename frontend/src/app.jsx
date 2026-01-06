// frontend/src/App.jsx

import React from 'react';
// Importação dos componentes principais que já existem
import Header from './components/Header.jsx';
import HomeContent from './components/HomeContent.jsx';
import Footer from './components/Footer.jsx';

// Importações do React Router DOM
// BrowserRouter é renomeado para Router para facilitar o uso
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// ===========================================================================
// COMPONENTE TEMPORÁRIO PARA A PÁGINA DE PRODUTOS
// Este componente será renderizado quando a URL for /produtos
// ===========================================================================
const ProductsPage = () => (
  <div style={{ padding: '20px', textAlign: 'center' }}>
    <h2>Página de Produtos</h2>
    <p>Este é o conteúdo temporário da sua página de produtos.</p>
    {/* Em breve, você irá construir o conteúdo real desta página aqui! */}
  </div>
);
// ===========================================================================

function App() {
  return (
    // O Router envolve todo o seu aplicativo para habilitar a navegação
    <Router>
      <div className="App">
        {/* Header e Footer ficam fora do Routes porque são fixos em todas as páginas */}
        <Header />

        {/* O <main> é um elemento semântico HTML5 para o conteúdo principal */}
        <main>
          {/* Routes define onde as rotas serão renderizadas */}
          <Routes>
            {/* Rota para a página inicial (Home). Quando a URL for "/", renderiza HomeContent. */}
            <Route path="/" element={<HomeContent />} />

            {/* Rota para a página de Produtos. Quando a URL for "/produtos", renderiza ProductsPage. */}
            <Route path="/produtos" element={<ProductsPage />} />

            {/* Opcional: Rota para páginas não encontradas (404) */}
            <Route path="*" element={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>404 - Página Não Encontrada</h2>
                <p>A URL que você tentou acessar não existe.</p>
              </div>
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;