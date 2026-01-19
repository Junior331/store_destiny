export type ProductRarity = 'common' | 'rare' | 'epic' | 'lendary'| 'super_lendary';

export interface Product {
  id: string;
  serverId: string;
  name: string;
  cashAmount: number;
  originalPrice: number;
  discountedPrice?: number;
  discount?: number;
  imageUrl: string;
  rarity: ProductRarity;
}
