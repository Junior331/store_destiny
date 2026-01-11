import { Product } from '@/lib/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    serverId: 'shop',
    name: '10.000 CASH',
    cashAmount: 10000,
    originalPrice: 12.90,
    imageUrl: 'cash_10k',
    rarity: 'common',
  },
  {
    id: '2',
    serverId: 'shop',
    name: '100.000 CASH',
    cashAmount: 100000,
    originalPrice: 17.90,
    imageUrl: 'cash_100k',
    rarity: 'rare',
  },
  {
    id: '3',
    serverId: 'shop',
    name: '150.000 CASH',
    cashAmount: 150000,
    originalPrice: 1000.00,
    imageUrl: 'cash_150k',
    rarity: 'epic',
  },
];

export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS;
}
