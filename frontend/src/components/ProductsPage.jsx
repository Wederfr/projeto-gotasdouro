// frontend/src/components/ProductsPage.jsx

import React from 'react';
import '../styles/products.css';
import productsData from '../productsData'; // Importa os dados dos produtos
import { useCart } from '../CartContext'; // <--- IMPORTAMOS O HOOK useCart

function ProductsPage() {
  const { addItem } = useCart(); // <--- USAMOS O HOOK PARA PEGAR A FUNÇÃO addItem

  // Função para lidar com o clique do botão "Adicionar ao Carrinho"
  const handleAddToCart = (product) => {
    addItem(product, 1); // Adiciona o produto ao carrinho, com quantidade 1
    alert(`${product.name} adicionado ao carrinho!`); // Feedback simples para o usuário
  };

  return (
    <main className="products-page-container">
      <h1>Nossos Produtos</h1>
      <p>Aqui você encontrará a nossa seleção completa de deliciosos chuviscos e outros produtos.</p>

      <section className="products-grid">
        {productsData.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="price">R\$ {product.price.toFixed(2).replace('.', ',')}</span>
            {/* O botão agora tem um evento onClick que chama handleAddToCart com o produto */}
            <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default ProductsPage;