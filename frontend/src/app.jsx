// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação dos componentes principais (reutilizáveis, não telas completas)
import Header from './components/Header';
import Footer from './components/Footer';

// Importação dos componentes de página (telas completas), agora da pasta 'pages'
import HomeContent from './pages/HomeContent'; // Assumindo que HomeContent também é uma página
import ProductsPage from './pages/ProductsPage'; // Caminho atualizado para 'pages'
import PedidosPage from './pages/PedidosPage';     // <--- NOVA IMPORTAÇÃO: Sua página de Pedidos

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
              
              {/* <--- ROTA ATUALIZADA: Agora renderiza o componente PedidosPage */}
              <Route path="/pedidos" element={<PedidosPage />} />

              {/* Se você tiver outras páginas como SobreNos e Contato, elas também deveriam vir da pasta 'pages' */}
              {/* Exemplo: <Route path="/sobre-nos" element={<SobreNosPage />} /> */}
              {/* Exemplo: <Route path="/contato" element={<ContatoPage />} /> */}

              <Route path="*" element={
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h1>404 - Página Não Encontrada</h1>
                  <p>A rota que você tentou acessar não existe.</p>
                </div>
              } />
            </Routes>
          </main>

          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;