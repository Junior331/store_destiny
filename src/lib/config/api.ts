// Configurações da API
export const API_CONFIG = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://auth-api-p7l2.onrender.com',
  clientToken: process.env.NEXT_PUBLIC_CLIENT_TOKEN || 'token1',
  endpoints: {
    auth: {
      login: '/auth/login',
      disconnect: '/auth/disconnect',
    },
  },
};

// Headers padrão para requisições
export const getDefaultHeaders = () => ({
  'Content-Type': 'application/json',
  'X-Client-Token': API_CONFIG.clientToken,
});
