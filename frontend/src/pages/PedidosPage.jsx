import React, { useEffect, useState } from 'react';
import { useCart } from '../CartContext';
import { Link } from 'react-router-dom';
import '../styles/PedidosPage.css';
import { IMaskInput } from 'react-imask';
import API_BASE_URL from '../config/api';

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
  const [rua, setRua] = useState('');
  const [numero, setNumero] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [complemento, setComplemento] = useState('');

  // Estados para o modal de PAGAMENTO

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('dinheiro');
  const [dinheiroPago, setDinheiroPago] = useState('');
  const [tipoCartao, setTipoCartao] = useState('credito');

  useEffect(() => {
    document.body.classList.add('pedidos-background');
    return () => {
      document.body.classList.remove('pedidos-background');
    };
  }, []);


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
    setSelectedPaymentMethod('dinheiro');
    setDinheiroPago('');
    setTipoCartao('credito');
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


    if (!rua || !bairro || !cidade) {
      alert('Por favor, preencha Rua, Bairro e Cidade.');
      return;
    }

    setShowRegistrationModal(false);
    setShowPaymentModal(true);
    setSelectedPaymentMethod('dinheiro');
  };

  const processDinheiroPayment = async () => {
    const valorPago = parseFloat(dinheiroPago.replace(',', '.'));
    if (isNaN(valorPago) || valorPago < totalPrice) {
      alert(`Valor insuficiente! O total é R$ ${totalPrice.toFixed(2)}.`);
      return;
    }

    const troco = valorPago - totalPrice;
    const mensagemTroco = troco > 0 ? `Troco: R$ ${troco.toFixed(2)}` : 'Pagamento exato.';

    alert(`Pagamento em dinheiro confirmado!\n${mensagemTroco}`);

    try {
      const result = await createOrderOnBackend({
        method: 'dinheiro',
        status: 'paid',
        amountPaid: valorPago,
        change: troco
      });

      alert(`Pedido finalizado!\nPedido: ${result.orderId}`);
      clearCart();
      closePaymentModal();
    } catch (e) {
      alert(`Erro ao finalizar pedido: ${e.message}`);
    }
  };

  const processCartaoPayment = async () => {
    const tipo = tipoCartao === 'credito' ? 'Crédito' : 'Débito';
    alert(`Pagamento com cartão ${tipo} confirmado!\nValor: R$ ${totalPrice.toFixed(2)}.`);

    try {
      const result = await createOrderOnBackend({
        method: `cartao_${tipoCartao}`,
        status: 'paid'
      });

      alert(`Pedido finalizado!\nPedido: ${result.orderId}`);
      clearCart();
      closePaymentModal();
    } catch (e) {
      alert(`Erro ao finalizar pedido: ${e.message}`);
    }
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

  return (
    <div className="pedidos-page-wrapper">
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

                {/* endereço estruturado */}
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
              <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Escolha a Forma de Pagamento</h2>

              <div className="payment-method-tabs">
                <button
                  type="button"
                  className={`tab-button ${selectedPaymentMethod === 'dinheiro' ? 'active' : ''}`}
                  onClick={() => setSelectedPaymentMethod('dinheiro')}
                >
                  💵 Dinheiro
                </button>
                <button
                  type="button"
                  className={`tab-button ${selectedPaymentMethod === 'cartao' ? 'active' : ''}`}
                  onClick={() => setSelectedPaymentMethod('cartao')}
                >
                  💳 Cartão
                </button>
                <button
                  type="button"
                  className={`tab-button ${selectedPaymentMethod === 'pix' ? 'active' : ''}`}
                  onClick={() => setSelectedPaymentMethod('pix')}
                >
                  📱 Pix
                </button>
              </div>

              <div className="payment-details-container">
                {selectedPaymentMethod === 'dinheiro' && (
                  <div className="payment-method-details dinheiro-details">
                    <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Pagamento em Dinheiro</h3>
                    <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                      Valor total: <span className="total-value">R$ {totalPrice.toFixed(2)}</span>
                    </p>
                    <div className="form-group" style={{ textAlign: 'center' }}>
                      <label htmlFor="dinheiro-pago" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Valor que vai pagar:
                      </label>
                      <input
                        type="number"
                        id="dinheiro-pago"
                        value={dinheiroPago}
                        onChange={(e) => setDinheiroPago(e.target.value)}
                        placeholder="Ex: 50.00"
                        step="0.01"
                        min={totalPrice.toFixed(2)}
                        style={{
                          width: '200px',
                          padding: '12px',
                          border: '1px solid #ddd',
                          borderRadius: '5px',
                          fontSize: '16px',
                          textAlign: 'center',
                          margin: '0 auto',
                          display: 'block'
                        }}
                        required
                      />
                    </div>
                    {dinheiroPago && parseFloat(dinheiroPago.replace(',', '.')) >= totalPrice && (
                      <p className="troco-info" style={{ textAlign: 'center', marginTop: '10px', fontWeight: 'bold', color: '#e9a913' }}>
                        Troco: R$ {(parseFloat(dinheiroPago.replace(',', '.')) - totalPrice).toFixed(2)}
                      </p>
                    )}
                    <button className="process-payment-button" onClick={processDinheiroPayment}>
                      Confirmar Pagamento em Dinheiro
                    </button>
                  </div>
                )}

                {selectedPaymentMethod === 'cartao' && (
                  <div className="payment-method-details cartao-details">
                    <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Pagamento com Cartão</h3>
                    <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                      Valor total: <span className="total-value">R$ {totalPrice.toFixed(2)}</span>
                    </p>
                    <div className="form-group" style={{ textAlign: 'center', marginBottom: '20px' }}>
                      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                        Tipo de cartão:
                      </label>
                      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <input
                            type="radio"
                            name="tipo-cartao"
                            value="credito"
                            checked={tipoCartao === 'credito'}
                            onChange={(e) => setTipoCartao(e.target.value)}
                          />
                          Crédito
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                          <input
                            type="radio"
                            name="tipo-cartao"
                            value="debito"
                            checked={tipoCartao === 'debito'}
                            onChange={(e) => setTipoCartao(e.target.value)}
                          />
                          Débito
                        </label>
                      </div>
                    </div>

                    <button className="process-payment-button" onClick={processCartaoPayment}>
                      Confirmar Pagamento com Cartão
                    </button>
                  </div>
                )}

                {selectedPaymentMethod === 'pix' && (
                  <div className="payment-method-details pix-details">
                    <h3 style={{ textAlign: 'center', marginBottom: '15px' }}>Pagamento via Pix</h3>
                    <p style={{ textAlign: 'center', marginBottom: '15px' }}>
                      Valor total: <span className="total-value">R$ {totalPrice.toFixed(2)}</span>
                    </p>
                    <div className="pix-qr-code-placeholder">
                      <img
                        src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png"
                        alt="QR Code Pix"
                        className="qr-code-image"
                      />
                      <p style={{ textAlign: 'center' }}>Escaneie o QR Code acima para pagar.</p>
                      <p style={{ textAlign: 'center' }}>Ou copie e cole a chave Pix:</p>
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
              </div>
            </div>
          </div>
        )}
        {/* --- FIM MODAL DE PAGAMENTO --- */}
      </div>
    </div>
  );
}

export default PedidosPage;