// frontend/src/pages/PedidosPage.jsx

import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import '../styles/PedidosPage.css';

// Ícones ou imagens (exemplo: você precisará ter esses arquivos na pasta public/images)
// import pixLogo from '/images/pix-logo.png'; // Exemplo de importação de imagem se for usar assets
// import mercadopagoLogo from '/images/mercadopago-logo.png'; // Exemplo
// import creditCardIcon from '/images/credit-card-icon.png'; // Exemplo

function PedidosPage() {
  const {
    cart,
    removeItem,
    updateItemQuantity,
    totalPrice,
    totalItems,
    clearCart // Adicionando clearCart para quando o pedido for finalizado
  } = useCart();

  // Estados para o formulário de cadastro dentro do modal de ENTREGA
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');

  // Estados para o modal de PAGAMENTO
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  // Modificado: Agora selectedPaymentMethod inicia com 'pix' (ou o método padrão que desejar)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pix'); 

  // Estados para o formulário de Cartão de Crédito
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState(''); // MM/AA
  const [cardCVV, setCardCVV] = useState('');
  const [installments, setInstallments] = useState('1'); // Padrão 1x

  // --- useEffect para gerenciar a classe do body ---
  useEffect(() => {
    document.body.classList.add('pedidos-background');
    return () => {
      document.body.classList.remove('pedidos-background');
    };
  }, []);

  // Funções auxiliares para aumentar/diminuir quantidade
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
      removeItem(productId);
    }
  };

  // Função para abrir o modal de ENTREGA
  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
      return;
    }
    setShowRegistrationModal(true); // Abre o modal de ENTREGA
  };

  // Função para fechar o modal de ENTREGA e limpar seus campos
  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    setNome('');
    setEndereco('');
    setTelefone('');
  };

  // Função para fechar o modal de PAGAMENTO e limpar seus estados
  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPaymentMethod('pix'); // Resetar para o padrão ao fechar
    // Limpa campos do cartão (se houver)
    setCardNumber('');
    setCardExpiration('');
    setCardCVV('');
    setInstallments('1');
    closeRegistrationModal(); // Garante que os campos de entrega sejam limpos.
  };

  // Função para lidar com o envio do formulário de cadastro (modal de ENTREGA)
  const handleRegistrationSubmit = (event) => {
    event.preventDefault();

    if (!nome || !endereco || !telefone) {
      alert('Por favor, preencha todos os campos do formulário de entrega!');
      return;
    }

    setShowRegistrationModal(false); // Fecha o modal de ENTREGA
    setShowPaymentModal(true);      // Abre o modal de PAGAMENTO
    setSelectedPaymentMethod('pix'); // Garante que Pix seja a opção inicial no modal de pagamento
  };

  // Funções para processar o pagamento
  const processPixPayment = () => {
    alert(`PIX Selecionado!\nGerando QR Code para o valor de R$ ${totalPrice.toFixed(2)}.`);
    // AQUI: Integraria a API para gerar o QR Code real
    // Por enquanto, apenas um alerta simulado e "finalização"
    alert(`Pedido finalizado via PIX!`);
    clearCart(); // Limpa o carrinho
    closePaymentModal(); // Fecha o modal de pagamento
  };

  const processMercadoPagoPayment = () => {
    alert(`Redirecionando para o Mercado Pago para o valor de R$ ${totalPrice.toFixed(2)}.`);
    // AQUI: Redirecionaria para o checkout do Mercado Pago
    // window.location.href = `https://www.mercadopago.com.br/checkout?amount=${totalPrice.toFixed(2)}...`;
    alert(`Pedido finalizado via Mercado Pago!`);
    clearCart(); // Limpa o carrinho
    closePaymentModal(); // Fecha o modal de pagamento
  };

  const processCreditCardPayment = (event) => {
    event.preventDefault();
    if (!cardNumber || !cardExpiration || !cardCVV) {
      alert('Por favor, preencha todos os dados do cartão.');
      return;
    }
    alert(`Pagamento com Cartão de Crédito de R$ ${totalPrice.toFixed(2)} em ${installments}x Processado.`);
    // AQUI: Integraria com a API de pagamento com cartão
    alert(`Pedido finalizado via Cartão de Crédito!`);
    clearCart(); // Limpa o carrinho
    closePaymentModal(); // Fecha o modal de pagamento
  };

  // Lógica para parcelamento do cartão
  const getInstallmentOptions = () => {
    const options = [];
    for (let i = 1; i <= 5; i++) {
      options.push(
        <option key={i} value={i}>
          {i}x de R$ {(totalPrice / i).toFixed(2)} (Total: R$ {totalPrice.toFixed(2)})
        </option>
      );
    }
    return options;
  };

  return (
    <div className="pedidos-page-container">
      <h1>Seu Carrinho de Compras</h1>

      {cart.length === 0 ? (
        <div className="empty-cart-message">
          <p>Seu carrinho está vazio. Adicione alguns produtos!</p>
          <Link to="/produtos" className="back-to-products-button">
            Voltar às Compras
          </Link>
        </div>
      ) : (
        <div className="cart-content">
          <div className="cart-items-list">
            {cart.map((item) => (
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
                  <button onClick={() => removeItem(item.id)} className="remove-item-button">Remover</button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h2>Resumo do Pedido</h2>
            <p>Total de itens: {totalItems}</p>
            <p className="cart-total">Total: R$ {totalPrice.toFixed(2)}</p>
            <button
              className="checkout-button"
              onClick={handleCheckoutClick}
            >
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}

      {/* --- ESTRUTURA DO MODAL DE ENTREGA --- */}
      {showRegistrationModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="modal-close-button" onClick={closeRegistrationModal}>&times;</button>
            <h2>Informações para Entrega</h2>
            <form onSubmit={handleRegistrationSubmit} className="registration-form">
              <div className="form-group">
                <label htmlFor="modal-nome">Nome Completo:</label>
                <input
                  type="text"
                  id="modal-nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-endereco">Endereço Completo:</label>
                <input
                  type="text"
                  id="modal-endereco"
                  name="endereco"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="modal-telefone">Telefone de Contato:</label>
                <input
                  type="tel"
                  id="modal-telefone"
                  name="telefone"
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                  placeholder="(DD) XXXXX-XXXX"
                  pattern="\([0-9]{2}\) [0-9]{5}-[0-9]{4}"
                  required
                />
                <small>Formato: (DD) XXXXX-XXXX</small>
              </div>
              <button type="submit" className="modal-submit-button">
                Pagamento
              </button>
            </form>
          </div>
        </div>
      )}
      {/* --- FIM DA ESTRUTURA DO MODAL DE ENTREGA --- */}


      {/* --- NOVA ESTRUTURA DO MODAL DE PAGAMENTO --- */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content payment-modal-content">
            <button className="modal-close-button" onClick={closePaymentModal}>&times;</button>
            <h2>Escolha a Forma de Pagamento</h2>

            {/* BOTOES DE SELEÇÃO DE MÉTODO - AGORA COMO ABAS/FILTROS */}
            <div className="payment-method-tabs">
                <button
                    className={`tab-button ${selectedPaymentMethod === 'pix' ? 'active' : ''}`}
                    onClick={() => setSelectedPaymentMethod('pix')}
                >
                    <img src="/images/pix-logo.svg" alt="Pix" className="tab-icon"/> Pix
                </button>
                <button
                    className={`tab-button ${selectedPaymentMethod === 'mercadopago' ? 'active' : ''}`}
                    onClick={() => setSelectedPaymentMethod('mercadopago')}
                >
                    <img src="/images/mercadopago-logo.png" alt="Mercado Pago" className="tab-icon"/> Mercado Pago
                </button>
                <button
                    className={`tab-button ${selectedPaymentMethod === 'creditcard' ? 'active' : ''}`}
                    onClick={() => setSelectedPaymentMethod('creditcard')}
                >
                    <img src="/images/credit-card-icon.svg" alt="Cartão" className="tab-icon"/> Cartão de Crédito
                </button>
            </div>

            {/* CONTEÚDO DOS MÉTODOS DE PAGAMENTO */}
            <div className="payment-details-container">
                {selectedPaymentMethod === 'pix' && (
                <div className="payment-method-details pix-details">
                    <h3>Pagamento via Pix</h3>
                    <p>Valor total: <span className="total-value">R$ {totalPrice.toFixed(2)}</span></p>
                    <div className="pix-qr-code-placeholder">
                    {/* Este seria o local onde o QR Code seria gerado pela API */}
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR Code Pix" className="qr-code-image" />
                    <p>Escaneie o QR Code acima para pagar.</p>
                    <p>Ou copie e cole a chave Pix:</p>
                    <div className="pix-key-display">
                        <span className="pix-key">123.456.789-00 (CPF Exemplo)</span>
                        <button className="copy-pix-key-button" onClick={() => navigator.clipboard.writeText('123.456.789-00')}>Copiar Chave</button>
                    </div>
                    </div>
                    <button className="process-payment-button" onClick={processPixPayment}>
                    Confirmar Pagamento Pix
                    </button>
                </div>
                )}

                {selectedPaymentMethod === 'mercadopago' && (
                <div className="payment-method-details mercadopago-details">
                    <h3>Pagamento via Mercado Pago</h3>
                    <p>Valor total: <span className="total-value">R$ {totalPrice.toFixed(2)}</span></p>
                    <p>Ao clicar no botão abaixo, você será redirecionado para o ambiente seguro do Mercado Pago para finalizar sua compra.</p>
                    <button className="process-payment-button mercadopago-redirect-button" onClick={processMercadoPagoPayment}>
                    Ir para o Mercado Pago
                    </button>
                </div>
                )}

                {selectedPaymentMethod === 'creditcard' && (
                <div className="payment-method-details creditcard-details">
                    <h3>Pagamento com Cartão de Crédito</h3>
                    <p>Valor total: <span className="total-value">R$ {totalPrice.toFixed(2)}</span></p>
                    <form onSubmit={processCreditCardPayment} className="credit-card-form">
                    <div className="form-group">
                        <label htmlFor="card-number">Número do Cartão:</label>
                        <input
                        type="text"
                        id="card-number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))} // Formata em grupos de 4
                        maxLength="19" // 16 dígitos + 3 espaços
                        placeholder="XXXX XXXX XXXX XXXX"
                        required
                        />
                    </div>
                    <div className="form-row">
                        <div className="form-group">
                        <label htmlFor="card-expiration">Validade (MM/AA):</label>
                        <input
                            type="text"
                            id="card-expiration"
                            value={cardExpiration}
                            onChange={(e) => setCardExpiration(e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/')).slice(0, 5)} // Formata MM/AA
                            maxLength="5"
                            placeholder="MM/AA"
                            required
                        />
                        </div>
                        <div className="form-group">
                        <label htmlFor="card-cvv">CVV:</label>
                        <input
                            type="text"
                            id="card-cvv"
                            value={cardCVV}
                            onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '')).slice(0, 4)} // Apenas números, máx 4
                            maxLength="4"
                            placeholder="XXX"
                            required
                        />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="installments">Parcelamento:</label>
                        <select
                        id="installments"
                        value={installments}
                        onChange={(e) => setInstallments(e.target.value)}
                        required
                        >
                        {getInstallmentOptions()}
                        </select>
                    </div>
                    <button type="submit" className="process-payment-button">
                        Pagar com Cartão
                    </button>
                    </form>
                </div>
                )}
            </div> {/* Fim payment-details-container */}
          </div>
        </div>
      )}
      {/* --- FIM DA NOVA ESTRUTURA DO MODAL DE PAGAMENTO --- */}

    </div>
  );
}

export default PedidosPage;