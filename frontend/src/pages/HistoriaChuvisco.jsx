import React from 'react';
import '../styles/historiachuvisco.css';

function HistoriaChuvisco() {

  const imagePath = '/images/historia-chuvisco.jpeg';

  return (

    <div className="historia-chuvisco-display">
      <img
        src={imagePath}
        alt="A História do Chuvisco - Gotas D'ouro"
        className="historia-chuvisco-image"
      />
    </div>
  );
}

export default HistoriaChuvisco;