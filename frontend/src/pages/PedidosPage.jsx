// frontend/src/pages/PedidosPage.jsx

import React from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import '../styles/PedidosPage.css'; // Importa os estilos, que ainda estarão na pasta 'styles'

function PedidosPage() {
  // ATUALIZAÇÃO AQUI: Alinhando com os nomes do CartContext
  const { 
    cart, // Agora o nome é 'cart', vindo diretamente do contexto
    removeItem, // Mapeia para removeItem no contexto
    updateItemQuantity, // Função para aumentar/diminuir quantidade
    totalPrice, // Preço total já calculado no contexto
    totalItems // Total de itens já calculado no contexto
  } = useCart();

  // Funções auxiliares para aumentar/diminuir, usando updateItemQuantity do contexto
  const increaseQuantity = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (item) {
      updateItemQuantity(productId, item.quantity + 1);
    }
  };

  const decreaseQuantity = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) {
      updateItemQuantity(productId, item.quantity - 1);
    } else if (item && item.quantity === 1) {
      // Se a quantidade é 1 e tentamos diminuir, removemos o item
      removeItem(productId);
    }
  };

  return (
    <div className="pedidos-page-container">
      <h1>Seu Carrinho de Compras</h1>

      {cart.length === 0 ? ( // Usando 'cart.length' agora
        <div className="empty-cart-message">
          <p>Seu carrinho está vazio. Adicione alguns produtos!</p>
          <Link to="/produtos" className="back-to-products-button">
            Voltar às Compras
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.map((item) => ( // Mapeando sobre 'cart'
              <div key={item.id} className="cart-item">
                <img src={item.imageUrl || 'https://via.placeholder.com/100'} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Preço unitário: R$ {item.price.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)} disabled={item.quantity === 1}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)}>+</button>
                  </div>
                  <p>Subtotal: R$ {(item.price * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeItem(item.id)} className="remove-item-button">Remover</button> {/* Usando removeItem */}
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <p>Total de itens: {totalItems}</p> {/* Usando totalItems do contexto */}
            <p className="cart-total">Total: R$ {totalPrice.toFixed(2)}</p> {/* Usando totalPrice do contexto */}
            <button className="checkout-button">Finalizar Pedido</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default PedidosPage;