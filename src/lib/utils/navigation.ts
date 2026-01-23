import { Server } from '@/store/serverStore';

/**
 * Retorna a URL da view do servidor selecionado
 */
export function getServerViewUrl(server: Server | null): any {
  const serverSlug = server?.slug || 'destiny';
  return `/${serverSlug}/view`;
}

/**
 * Retorna a URL do checkout do servidor selecionado
 */
export function getServerCheckoutUrl(server: Server | null): any {
  const serverSlug = server?.slug || 'destiny';
  return `/${serverSlug}/checkout`;
}
