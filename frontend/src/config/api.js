/**
 * Configuração da API - URLs do backend
 * 
 * Em desenvolvimento: http://localhost:3001
 * Em produção: https://backend-gotas.onrender.com
 */

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://backend-gotas.onrender.com'
  : 'http://localhost:3001';

export default API_BASE_URL;