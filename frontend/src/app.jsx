// frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação dos componentes principais
import Header from './components/Header';
import HomeContent from './components/HomeContent';
import Footer from './components/Footer';
import ProductsPage from './components/ProductsPage';

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
              
              {/* Rota temporária para a página de Pedidos (será criada em breve) */}
              <Route path="/pedidos" element={
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h2>Página de Pedidos (Em Construção)</h2>
                  <p>Conteúdo do seu carrinho será exibido aqui em breve!</p>
                </div>
              } />

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