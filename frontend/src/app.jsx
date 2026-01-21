// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação dos componentes principais (reutilizáveis, não telas completas)
import Header from './components/Header';
import Footer from './components/Footer';

// Importação dos componentes de página (telas completas), agora da pasta 'pages'
import HomeContent from './pages/HomeContent';
import ProductsPage from './pages/ProductsPage';
import PedidosPage from './pages/PedidosPage';

// Importação das novas páginas que estamos construindo
import AboutUsPage from './pages/AboutUsPage'; // Importa a página Sobre Nós
// import ContactPage from './pages/ContactPage'; // <-- COMENTADO TEMPORARIAMENTE: A página ContactPage ainda não foi criada
import HistoriaChuvisco from './pages/HistoriaChuvisco'; // <-- NOVA IMPORTAÇÃO AQUI

// Importa o CartProvider
import { CartProvider } from './CartContext';



function App() {
  return (
    // O CartProvider envolve toda a aplicação
    <CartProvider>
      <Router>
        <div className="App">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/produtos" element={<ProductsPage />} />
              <Route path="/pedidos" element={<PedidosPage />} />

              {/* ROTAS PARA AS NOVAS PÁGINAS */}
              <Route path="/sobre-nos" element={<AboutUsPage />} />
              <Route path="/historia-chuvisco" element={<HistoriaChuvisco />} /> {/* <-- NOVA ROTA AQUI */}
              {/* <Route path="/contato" element={<ContactPage />} /> */} {/* <-- COMENTADO TEMPORARIAMENTE: Rota para ContactPage */}

              {/* Rota genérica para 404 - Páginas não encontradas */}
              <Route path="*" element={
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h1>404 - Página Não Encontrada</h1>
                  <p>A rota que você tentou acessar não existe.</p>
                </div>
              } />
            </Routes>

            <Footer /> {/* ✅ MOVI O FOOTER PARA DENTRO DO <main> */}
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;