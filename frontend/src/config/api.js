/**
 * Configuração da API - URLs do backend
 * 
 * Em desenvolvimento: http://localhost:3001
 * Em produção: https://gotasdouro-backend.onrender.com
 */

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://gotasdouro-backend.onrender.com'
  : 'http://localhost:3001';

export default API_BASE_URL;