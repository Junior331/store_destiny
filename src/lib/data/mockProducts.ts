import { Product } from '@/lib/types';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    serverId: 'shop',
    name: '10.000 CASH',
    cashAmount: 10000,
    originalPrice: 12.90,
    discountedPrice: 10.97, // 15% desconto
    discount: 15,
    imageUrl: 'cash_10k',
    rarity: 'common',
  },
  {
    id: '2',
    serverId: 'shop',
    name: '10.000 CASH',
    cashAmount: 10000,
    originalPrice: 12.90,
    discountedPrice: 10.97, // 15% desconto
    discount: 15,
    imageUrl: 'cash_10k',
    rarity: 'common',
  },
  {
    id: '3',
    serverId: 'shop',
    name: '10.000 CASH',
    cashAmount: 10000,
    originalPrice: 12.90,
    discountedPrice: 10.97, // 15% desconto
    discount: 15,
    imageUrl: 'cash_10k',
    rarity: 'common',
  },
  {
    id: '4',
    serverId: 'shop',
    name: '10.000 CASH',
    cashAmount: 10000,
    originalPrice: 12.90,
    discountedPrice: 10.97, // 15% desconto
    discount: 15,
    imageUrl: 'cash_10k',
    rarity: 'common',
  },
  {
    id: '5',
    serverId: 'shop',
    name: '100.000 CASH',
    cashAmount: 100000,
    originalPrice: 17.90,
    discountedPrice: 13.43, // 25% desconto
    discount: 25,
    imageUrl: 'cash_100k',
    rarity: 'rare',
  },
  {
    id: '6',
    serverId: 'shop',
    name: '100.000 CASH',
    cashAmount: 100000,
    originalPrice: 17.90,
    discountedPrice: 13.43, // 25% desconto
    discount: 25,
    imageUrl: 'cash_100k',
    rarity: 'rare',
  },
  {
    id: '6',
    serverId: 'shop',
    name: '100.000 CASH',
    cashAmount: 100000,
    originalPrice: 17.90,
    discountedPrice: 13.43, // 25% desconto
    discount: 25,
    imageUrl: 'cash_100k',
    rarity: 'rare',
  },
  {
    id: '7',
    serverId: 'shop',
    name: '150.000 CASH',
    cashAmount: 150000,
    originalPrice: 1000.00,
    discountedPrice: 700.00, // 30% desconto
    discount: 30,
    imageUrl: 'cash_150k',
    rarity: 'epic',
  },
];

export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS;
}
