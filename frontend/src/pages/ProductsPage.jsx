import React, { useEffect } from 'react';
import '../styles/products.css';
import productsData from '../productsData';
import { useCart } from '../CartContext';

function ProductsPage() {
  const { addItem } = useCart();

  useEffect(() => {

    document.body.classList.add('products-background');


    return () => {
      document.body.classList.remove('products-background');
    };
  }, []);

  // Função para lidar com o clique do botão "Adicionar ao Carrinho"
  const handleAddToCart = (product) => {
    addItem(product, 1);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  return (
    <main className="products-page-container">
      <h1>Nossos Produtos</h1>


      <section className="products-grid">
        {productsData.map(product => (
          <div className="product-card" key={product.id}>
            <img src={product.imageUrl} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <span className="price">R\$ {product.price.toFixed(2).replace('.', ',')}</span>

            <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default ProductsPage;