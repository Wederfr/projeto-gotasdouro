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

  //  Botão "Adicionar ao Carrinho"
  const handleAddToCart = (product) => {
    addItem(product, 1);
    alert(`${product.name} adicionado ao carrinho!`);
  };

  // Gera link do WhatsApp
  const generateWhatsAppLink = (product) => {
    const phoneNumber = '5522999330966';
    const message = `Olá, gostaria de encomendar ${product.name}`;
    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
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
            <span className="price">
              {product.price ? `R$ ${product.price.toFixed(2).replace('.', ',')}` : 'Sob Consulta'}
            </span>

            {product.isCustomOrder ? (
              // Botão de encomenda com ícone do WhatsApp
              <a
                href={generateWhatsAppLink(product)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-encomenda"
                style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
              >
                <span>Encomendar</span>
                <img
                  src="/images/whatsapp-original.png"
                  alt="WhatsApp"
                  style={{ width: '20px', height: '20px' }}
                />
              </a>
            ) : (
              // Botão normal → Carrinho
              <button onClick={() => handleAddToCart(product)}>Adicionar ao Carrinho</button>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}

export default ProductsPage;