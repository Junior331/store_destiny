import { getImage } from '@/assets/images';
import { Server } from '@/store/serverStore';

/**
 * Servidores mockados para teste
 * Cada servidor terá sua própria rota: exemplo.gg/{slug}/view
 */
export const MOCK_SERVERS: Server[] = [
  {
    id: 'server-1',
    name: 'Destiny Roleplay',
    slug: 'destiny',
    description: 'Servidor principal de Roleplay',
    image: getImage('logo_destiny_originals').src,
  },
  {
    id: 'server-2',
    name: 'BATTLEGROUNDS',
    slug: 'battlegrounds',
    description: 'Servidor de sobrevivência extrema',
    image: getImage('gtabattlegrounds_logo').src,
  },
  {
    id: 'server-3',
    name: 'Creative Build',
    slug: 'creative',
    description: 'Servidor criativo para construções',
    image: getImage('logo_destiny_originals').src,
  },
];

/**
 * Busca um servidor pelo slug
 */
export function getServerBySlug(slug: string): Server | undefined {
  return MOCK_SERVERS.find(server => server.slug === slug);
}

/**
 * Valida se um slug de servidor existe
 */
export function isValidServerSlug(slug: string): boolean {
  return MOCK_SERVERS.some(server => server.slug === slug);
}
