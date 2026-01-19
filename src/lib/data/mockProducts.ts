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
    name: '16.000 CASH',
    cashAmount: 16000,
    originalPrice: 12.90,
    discountedPrice: 10.97, // 15% desconto
    discount: 15,
    imageUrl: 'cash_16k',
    rarity: 'common',
  },
  {
    id: '3',
    serverId: 'shop',
    name: '24.000 CASH',
    cashAmount: 24000,
    originalPrice: 12.90,
    discountedPrice: 10.97, // 15% desconto
    discount: 15,
    imageUrl: 'cash_24k',
    rarity: 'common',
  },
  {
    id: '4',
    serverId: 'shop',
    name: '30.000 CASH',
    cashAmount: 30000,
    originalPrice: 12.90,
    discountedPrice: 10.97, // 15% desconto
    discount: 15,
    imageUrl: 'cash_30k',
    rarity: 'common',
  },
  {
    id: '5',
    serverId: 'shop',
    name: '65.000 CASH',
    cashAmount: 65000,
    originalPrice: 17.90,
    discountedPrice: 13.43, // 25% desconto
    discount: 25,
    imageUrl: 'cash_65k',
    rarity: 'rare',
  },
  {
    id: '6',
    serverId: 'shop',
    name: '80.000 CASH',
    cashAmount: 80000,
    originalPrice: 17.90,
    discountedPrice: 13.43, // 25% desconto
    discount: 25,
    imageUrl: 'cash_80k',
    rarity: 'rare',
  },
  {
    id: '7',
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
    id: '8',
    serverId: 'shop',
    name: '150.000 CASH',
    cashAmount: 150000,
    originalPrice: 1000.00,
    discountedPrice: 700.00, // 30% desconto
    discount: 30,
    imageUrl: 'cash_150k',
    rarity: 'epic',
  },
  {
    id: '9',
    serverId: 'shop',
    name: '250.000 CASH',
    cashAmount: 250000,
    originalPrice: 1000.00,
    discountedPrice: 700.00, // 30% desconto
    discount: 30,
    imageUrl: 'cash_250k',
    rarity: 'epic',
  },
  {
    id: '10',
    serverId: 'shop',
    name: '390.000 CASH',
    cashAmount: 250000,
    originalPrice: 1000.00,
    discountedPrice: 700.00, // 30% desconto
    discount: 30,
    imageUrl: 'cash_390k',
    rarity: 'epic',
  },
];

export function getAllProducts(): Product[] {
  return MOCK_PRODUCTS;
}
