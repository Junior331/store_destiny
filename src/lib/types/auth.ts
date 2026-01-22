export interface User {
  id: string;
  username: string;
  email: string;
}

export interface LoginRequest {
  platform: 'web' | 'fivem' | 'mta';
  login: string;
  password: string;
  ip?: string;
  two_factor_code?: string;
  security_code?: string;
  server?: string;
  server_ip?: string;
  ip_address?: string;
  token?: string;
  identifiers?: Record<string, any>;
}

export interface LoginResponse {
  status?: 'success' | 'ok' | 'pending_2fa' | 'pending_security_code';
  code?: string;
  message?: string;
  token?: string;
  data?: {
    user?: User;
    token?: string;
    member_id?: number;
    account?: number;
    username?: string;
    email?: string;
    joined?: string;
    discord?: string;
    ip?: string | null;
    address?: string | null;
    kyc?: string | null;
  };
  error?: string;
}

export interface DisconnectRequest {
  platform: 'web' | 'fivem' | 'mta';
  server_name: string;
  server_ip?: string;
  member_id?: number;
  remove_all?: boolean;
}

export interface DisconnectResponse {
  success: boolean;
  message?: string;
  error?: string;
}
