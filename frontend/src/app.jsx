import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeContent from './pages/HomeContent';
import ProductsPage from './pages/ProductsPage';
import PedidosPage from './pages/PedidosPage';
import AboutUsPage from './pages/AboutUsPage';
import HistoriaChuvisco from './pages/HistoriaChuvisco';
import { CartProvider } from './CartContext';



function App() {
  return (

    <CartProvider>
      <Router>
        <div className="App">
          <Header />

          <main>
            <Routes>
              <Route path="/" element={<HomeContent />} />
              <Route path="/produtos" element={<ProductsPage />} />
              <Route path="/pedidos" element={<PedidosPage />} />
              <Route path="/sobre-nos" element={<AboutUsPage />} />
              <Route path="/historia-chuvisco" element={<HistoriaChuvisco />} />


              <Route path="*" element={
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <h1>404 - Página Não Encontrada</h1>
                  <p>A rota que você tentou acessar não existe.</p>
                </div>
              } />
            </Routes>

            <Footer />
          </main>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;