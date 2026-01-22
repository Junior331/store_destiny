import CryptoJS from 'crypto-js';
import Cookies from 'js-cookie';

/**
 * Chave de criptografia - DEVE ser armazenada em variável de ambiente
 * Em produção, use uma chave forte e única
 */
const getEncryptionKey = (): string => {
  if (typeof window === 'undefined') return '';

  // Usa variável de ambiente ou gera uma chave única por sessão
  const key = process.env.NEXT_PUBLIC_ENCRYPTION_KEY;

  if (!key) {
    console.warn('NEXT_PUBLIC_ENCRYPTION_KEY não configurada. Usando chave de fallback (NÃO SEGURO EM PRODUÇÃO)');
    return 'default-key-change-in-production';
  }

  return key;
};

/**
 * Criptografa um valor usando AES
 */
export const encrypt = (value: string): string => {
  try {
    const key = getEncryptionKey();
    return CryptoJS.AES.encrypt(value, key).toString();
  } catch (error) {
    console.error('Erro ao criptografar:', error);
    throw new Error('Falha na criptografia');
  }
};

/**
 * Descriptografa um valor usando AES
 */
export const decrypt = (encryptedValue: string): string => {
  try {
    const key = getEncryptionKey();
    const bytes = CryptoJS.AES.decrypt(encryptedValue, key);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);

    if (!decrypted) {
      throw new Error('Falha na descriptografia - resultado vazio');
    }

    return decrypted;
  } catch (error) {
    console.error('Erro ao descriptografar:', error);
    throw new Error('Falha na descriptografia');
  }
};

/**
 * Configuração de cookies seguros
 */
const cookieConfig: Cookies.CookieAttributes = {
  secure: process.env.NODE_ENV === 'production', // HTTPS apenas em produção
  sameSite: 'strict',
  expires: 1/24, // 1 hora (usado apenas para fluxo de verificação)
};

/**
 * Salva valor criptografado em cookie
 */
export const setEncryptedCookie = (name: string, value: string): void => {
  try {
    const encrypted = encrypt(value);
    Cookies.set(name, encrypted, cookieConfig);
  } catch (error) {
    console.error('Erro ao salvar cookie criptografado:', error);
    throw error;
  }
};

/**
 * Obtém e descriptografa valor de cookie
 */
export const getEncryptedCookie = (name: string): string | null => {
  try {
    const encrypted = Cookies.get(name);

    if (!encrypted) {
      return null;
    }

    return decrypt(encrypted);
  } catch (error) {
    console.error('Erro ao ler cookie criptografado:', error);
    // Remove cookie corrompido
    Cookies.remove(name);
    return null;
  }
};

/**
 * Remove cookie criptografado
 */
export const removeEncryptedCookie = (name: string): void => {
  Cookies.remove(name);
};

/**
 * Remove todos os cookies de verificação
 */
export const clearVerificationCookies = (): void => {
  removeEncryptedCookie('verification-email');
  removeEncryptedCookie('verification-password');
};

/**
 * Salva credenciais temporárias para verificação (2FA/Security Code)
 */
export const saveVerificationCredentials = (email: string, password: string): void => {
  setEncryptedCookie('verification-email', email);
  setEncryptedCookie('verification-password', password);
};

/**
 * Recupera credenciais temporárias para verificação
 */
export const getVerificationCredentials = (): { email: string; password: string } | null => {
  const email = getEncryptedCookie('verification-email');
  const password = getEncryptedCookie('verification-password');

  if (!email || !password) {
    return null;
  }

  return { email, password };
};
