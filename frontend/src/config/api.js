/* Configuração da API - URLs do backend*/

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://backend-gotas.onrender.com'
  : 'http://localhost:3001';

export default API_BASE_URL;