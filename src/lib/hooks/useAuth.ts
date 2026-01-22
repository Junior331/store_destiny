import { useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { AuthService } from '@/lib/services/auth';
import type { LoginRequest, DisconnectRequest } from '@/lib/types/auth';

interface UseAuthReturn {
  login: (data: Omit<LoginRequest, 'platform' | 'ip_address'>) => Promise<{
    success: boolean;
    requires2FA?: boolean;
    requiresSecurityCode?: boolean;
    error?: string;
  }>;
  disconnect: (data: Omit<DisconnectRequest, 'platform'>) => Promise<{
    success: boolean;
    error?: string;
  }>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

/**
 * Hook para gerenciar autenticação
 */
export function useAuth(): UseAuthReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setUser, logout: storeLogout } = useAuthStore();

  const login = async (data: Omit<LoginRequest, 'platform' | 'ip_address'>) => {
    setIsLoading(true);
    setError(null);

    try {
      // Obtém o IP do cliente
      const ip = await AuthService.getClientIP();

      // Prepara os dados para envio
      const loginData: LoginRequest = {
        ...data,
        platform: 'web',
        ip_address: ip,
      };

      // Realiza o login
      const response = await AuthService.login(loginData);

      // Login bem-sucedido
      if (response.status === 'success' || response.status === 'ok') {
        // Cria objeto user a partir dos dados disponíveis
        const user = response.data?.user || {
          id: (response.data?.account || response.data?.member_id)?.toString() || '',
          username: response.data?.username || data.login,
          email: response.data?.email || (data.login.includes('@') ? data.login : ''),
        };

        // Atualiza o estado global com o usuário
        setUser(user);

        // Armazena o token (pode estar em response.token ou response.data.token)
        const token = response.token || response.data?.token;
        if (token && typeof window !== 'undefined') {
          localStorage.setItem('auth-token', token);
        }

        return {
          success: true,
          requires2FA: false,
          requiresSecurityCode: false,
        };
      }

      // Login pendente de 2FA
      if (response.status === 'pending_2fa' || response.code === '2fa_required') {
        return {
          success: false,
          requires2FA: true,
          requiresSecurityCode: false,
        };
      }

      // Login pendente de código de segurança
      if (response.status === 'pending_security_code' || response.code === 'security_code_required') {
        return {
          success: false,
          requires2FA: false,
          requiresSecurityCode: true,
        };
      }

      throw new Error(response.error || response.message || 'Erro ao fazer login');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = async (data: Omit<DisconnectRequest, 'platform'>) => {
    setIsLoading(true);
    setError(null);

    try {
      const disconnectData: DisconnectRequest = {
        ...data,
        platform: 'web',
      };

      const response = await AuthService.disconnect(disconnectData);

      if (response.success) {
        return { success: true };
      }

      throw new Error(response.error || 'Erro ao desconectar');
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao desconectar';
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    storeLogout();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth-token');
    }
  };

  return {
    login,
    disconnect,
    logout,
    isLoading,
    error,
  };
}
