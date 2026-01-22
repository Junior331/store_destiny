import { API_CONFIG, getDefaultHeaders } from '@/lib/config/api';
import type { LoginRequest, LoginResponse, DisconnectRequest, DisconnectResponse } from '@/lib/types/auth';

/**
 * Serviço de autenticação
 */
export class AuthService {
  /**
   * Realiza login unificado (web, fivem, mta)
   */
  static async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.login}`, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        // Tratamento de erros específicos baseado no status code
        switch (response.status) {
          case 400:
            throw new Error(errorData?.message || 'Campos obrigatórios faltando');
          case 401:
            throw new Error('Credenciais inválidas');
          case 403:
            throw new Error(errorData?.message || 'Conta desabilitada ou e-mail não confirmado');
          case 409:
            throw new Error('Já conectado');
          case 429:
            throw new Error('Muitas tentativas. Tente novamente mais tarde');
          default:
            throw new Error('Erro ao fazer login');
        }
      }

      const result: LoginResponse = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao conectar com o servidor');
    }
  }

  /**
   * Desconecta usuário(s) de um servidor
   */
  static async disconnect(data: DisconnectRequest): Promise<DisconnectResponse> {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}${API_CONFIG.endpoints.auth.disconnect}`, {
        method: 'POST',
        headers: getDefaultHeaders(),
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Erro ao desconectar');
      }

      const result: DisconnectResponse = await response.json();
      return result;
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Erro ao conectar com o servidor');
    }
  }

  /**
   * Obtém o IP do cliente
   */
  static async getClientIP(): Promise<string> {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip || '';
    } catch {
      return '';
    }
  }
}
