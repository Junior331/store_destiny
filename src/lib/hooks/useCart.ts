import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/types';

export function useCart() {
  const {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  } = useCartStore();

  const handleAddToCart = (product: Product) => {
    addItem(product);
  };

  const handleRemoveFromCart = (productId: string) => {
    removeItem(productId);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    updateQuantity(productId, quantity);
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const getItemQuantity = (productId: string) => {
    const item = items.find((item) => item.product.id === productId);
    return item?.quantity || 0;
  };

  return {
    items,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart,
    getTotal,
    getItemCount,
    isInCart,
    getItemQuantity,
  };
}
