// frontend/src/pages/HistoriaChuvisco.jsx

import React from 'react';
import '../styles/historiachuvisco.css'; // Mantenha o CSS para estilizar a imagem

function HistoriaChuvisco() {
  // CONFIRA AQUI: Certifique-se de que a extensão está correta (.jpg, .png, etc.)
  const imagePath = '/images/historia-chuvisco.jpg'; // Usando .jpg como você mencionou

  return (
    // Retorna diretamente um container simples para a imagem
    <div className="historia-chuvisco-display"> {/* Uma div simples para envolver e estilizar a imagem */}
      <img
        src={imagePath}
        alt="A História do Chuvisco - Gotas D'ouro"
        className="historia-chuvisco-image" // Classe para estilizar a imagem
      />
    </div>
  );
}

export default HistoriaChuvisco;