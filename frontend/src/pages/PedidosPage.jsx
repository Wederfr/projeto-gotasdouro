// frontend/src/pages/PedidosPage.jsx

import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import '../styles/PedidosPage.css';
import { IMaskInput } from 'react-imask';

function PedidosPage() {
  const {
    cart,
    removeItem,
    updateItemQuantity,
    totalPrice,
    totalItems,
    clearCart
  } = useCart();

  // Estados para o formulário de cadastro dentro do modal de ENTREGA
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [telefone, setTelefone] = useState('');

  // ✅ NOVO: endereço estruturado (compatível com o backend)
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [complemento, setComplemento] = useState('');

  // Estados para o modal de PAGAMENTO
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('pix');

  // Estados para o formulário de Cartão de Crédito
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiration, setCardExpiration] = useState(''); // MM/AA
  const [cardCVV, setCardCVV] = useState('');
  const [installments, setInstallments] = useState('1'); // Padrão 1x

  useEffect(() => {
    document.body.classList.add('pedidos-background');
    return () => {
      document.body.classList.remove('pedidos-background');
    };
  }, []);

  const API_BASE_URL = import.meta?.env?.VITE_API_URL || 'http://localhost:3001';

  const createOrderOnBackend = async (payment) => {
    if (!cart || cart.length === 0) {
      throw new Error('Carrinho vazio.');
    }

    const items = cart.map((item) => {
      const unitPrice = Number(item.price || 0);
      const quantity = Number(item.quantity || 0);
      return {
        productId: String(item.id),
        name: item.name,
        unitPrice,
        quantity,
        subtotal: unitPrice * quantity
      };
    });

    const payload = {
      customer: {
        name: nome,
        email: email,
        phone: telefone
      },
      deliveryAddress: {
        street: rua,
        number: numero || 'S/N',
        neighborhood: bairro,
        city: cidade,
        complement: complemento || ''
      },
      items,
      totals: {
        totalItems: totalItems,
        totalPrice: Number(totalPrice || 0)
      },
      payment
    };

    const resp = await fetch(`${API_BASE_URL}/api/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await resp.json();
    if (!resp.ok || !data?.ok) {
      throw new Error(data?.error || 'Falha ao criar pedido.');
    }

    return data;
  };

  const increaseQuantity = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (item) updateItemQuantity(productId, item.quantity + 1);
  };

  const decreaseQuantity = (productId) => {
    const item = cart.find(i => i.id === productId);
    if (item && item.quantity > 1) updateItemQuantity(productId, item.quantity - 1);
    else if (item && item.quantity === 1) removeItem(productId);
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) {
      alert('Seu carrinho está vazio! Adicione produtos antes de finalizar a compra.');
      return;
    }
    setShowRegistrationModal(true);
  };

  const closeRegistrationModal = () => {
    setShowRegistrationModal(false);
    setNome('');
    setEmail('');
    setTelefone('');

    setRua('');
    setNumero('');
    setBairro('');
    setCidade('');
    setComplemento('');
  };

  const closePaymentModal = () => {
    setShowPaymentModal(false);
    setSelectedPaymentMethod('pix');
    setCardNumber('');
    setCardExpiration('');
    setCardCVV('');
    setInstallments('1');
    closeRegistrationModal();
  };

  const handleRegistrationSubmit = (event) => {
    event.preventDefault();

    const unmaskedTelefone = telefone.replace(/\D/g, '');
    if (!nome || !email || unmaskedTelefone.length !== 11) {
      alert('Por favor, preencha nome, e-mail e telefone válido (DD) XXXXX-XXXX!');
      return;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      alert('Por favor, informe um e-mail válido.');
      return;
    }

    // ✅ valida endereço mínimo exigido pelo backend
    if (!rua || !bairro || !cidade) {
      alert('Por favor, preencha Rua, Bairro e Cidade.');
      return;
    }

    setShowRegistrationModal(false);
    setShowPaymentModal(true);
    setSelectedPaymentMethod('pix');
  };

  const processPixPayment = async () => {
    try {
      alert(`PIX Selecionado!\nGerando QR Code para o valor de R$ ${totalPrice.toFixed(2)}.`);

      const result = await createOrderOnBackend({
        method: 'pix',
        status: 'pending'
      });

      alert(`Pedido finalizado via PIX!\nPedido: ${result.orderId}`);
      clearCart();
      closePaymentModal();
    } catch (e) {
      alert(`Erro ao finalizar pedido: ${e.message}`);
    }
  };

  const processMercadoPagoPayment = async () => {
    try {
      alert(`Redirecionando para o Mercado Pago para o valor de R$ ${totalPrice.toFixed(2)}.`);

      const result = await createOrderOnBackend({
        method: 'mercadopago',
        status: 'pending'
      });

      alert(`Pedido finalizado via Mercado Pago!\nPedido: ${result.orderId}`);
      clearCart();
      closePaymentModal();
    } catch (e) {
      alert(`Erro ao finalizar pedido: ${e.message}`);
    }
  };

  const processCreditCardPayment = async (event) => {
    event.preventDefault();

    if (!cardNumber || !cardExpiration || !cardCVV) {
      alert('Por favor, preencha todos os dados do cartão.');
      return;
    }

    try {
      alert(`Pagamento com Cartão de Crédito de R$ ${totalPrice.toFixed(2)} em ${installments}x Processado.`);

      const result = await createOrderOnBackend({
        method: 'creditcard',
        status: 'approved',
        installments: Number(installments)
      });

      alert(`Pedido finalizado via Cartão!\nPedido: ${result.orderId}`);
      clearCart();
      closePaymentModal();
    } catch (e) {
      alert(`Erro ao finalizar pedido: ${e.message}`);
    }
  };

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
            <button className="checkout-button" onClick={handleCheckoutClick}>
              Finalizar Pedido
            </button>
          </div>
        </div>
      )}

      {/* --- MODAL DE ENTREGA --- */}
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
                <label htmlFor="modal-email">E-mail:</label>
                <input
                  type="email"
                  id="modal-email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="seuemail@exemplo.com"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-telefone">Telefone de Contato:</label>
                <IMaskInput
                  mask="(00) 00000-0000"
                  value={telefone}
                  onAccept={(value) => setTelefone(value)}
                  definitions={{ '0': /[0-9]/ }}
                  type="tel"
                  id="modal-telefone"
                  name="telefone"
                  placeholder="(DD) XXXXX-XXXX"
                  required
                />
                <small>Formato: (DD) XXXXX-XXXX</small>
              </div>

              {/* ✅ endereço estruturado */}
              <div className="form-group">
                <label htmlFor="modal-rua">Rua:</label>
                <input
                  type="text"
                  id="modal-rua"
                  value={rua}
                  onChange={(e) => setRua(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-numero">Número:</label>
                <input
                  type="text"
                  id="modal-numero"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="123"
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-bairro">Bairro:</label>
                <input
                  type="text"
                  id="modal-bairro"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-cidade">Cidade:</label>
                <input
                  type="text"
                  id="modal-cidade"
                  value={cidade}
                  onChange={(e) => setCidade(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="modal-complemento">Complemento:</label>
                <input
                  type="text"
                  id="modal-complemento"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  placeholder="apto, bloco, referência..."
                />
              </div>

              <button type="submit" className="modal-submit-button">
                Pagamento
              </button>
            </form>
          </div>
        </div>
      )}
      {/* --- FIM MODAL DE ENTREGA --- */}

      {/* --- MODAL DE PAGAMENTO --- */}
      {showPaymentModal && (
        <div className="modal-overlay">
          <div className="modal-content payment-modal-content">
            <button className="modal-close-button" onClick={closePaymentModal}>&times;</button>
            <h2>Escolha a Forma de Pagamento</h2>

            <div className="payment-method-tabs">
              <button
                type="button"
                className={`tab-button ${selectedPaymentMethod === 'pix' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('pix')}
              >
                <img src="/images/pix-logo.svg" alt="Pix" className="tab-icon" /> Pix
              </button>
              <button
                type="button"
                className={`tab-button ${selectedPaymentMethod === 'mercadopago' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('mercadopago')}
              >
                <img src="/images/mercadopago-logo.png" alt="Mercado Pago" className="tab-icon" /> Mercado Pago
              </button>
              <button
                type="button"
                className={`tab-button ${selectedPaymentMethod === 'creditcard' ? 'active' : ''}`}
                onClick={() => setSelectedPaymentMethod('creditcard')}
              >
                <img src="/images/credit-card-icon.svg" alt="Cartão" className="tab-icon" /> Cartão de Crédito
              </button>
            </div>

            <div className="payment-details-container">
              {selectedPaymentMethod === 'pix' && (
                <div className="payment-method-details pix-details">
                  <h3>Pagamento via Pix</h3>
                  <p>Valor total: <span className="total-value">R$ {totalPrice.toFixed(2)}</span></p>
                  <div className="pix-qr-code-placeholder">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                      alt="QR Code Pix"
                      className="qr-code-image"
                    />
                    <p>Escaneie o QR Code acima para pagar.</p>
                    <p>Ou copie e cole a chave Pix:</p>
                    <div className="pix-key-display">
                      <span className="pix-key">123.456.789-00 (CPF Exemplo)</span>
                      <button
                        type="button"
                        className="copy-pix-key-button"
                        onClick={() => navigator.clipboard.writeText('123.456.789-00')}
                      >
                        Copiar Chave
                      </button>
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
                        onChange={(e) => setCardNumber(e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 '))}
                        maxLength="19"
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
                          onChange={(e) => setCardExpiration(e.target.value.replace(/\D/g, '').replace(/(\d{2})(?=\d)/g, '$1/')).slice(0, 5)}
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
                          onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '')).slice(0, 4)}
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
            </div>
          </div>
        </div>
      )}
      {/* --- FIM MODAL DE PAGAMENTO --- */}
    </div>
  );
}

export default PedidosPage;