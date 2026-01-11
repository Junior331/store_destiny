import { create } from 'zustand';
import { PaymentGateway, Coupon } from '@/lib/types';

interface CheckoutStore {
  selectedGateway: PaymentGateway | null;
  appliedCoupon: Coupon | null;
  setGateway: (gateway: PaymentGateway) => void;
  applyCoupon: (coupon: Coupon) => void;
  removeCoupon: () => void;
  reset: () => void;
}

export const useCheckoutStore = create<CheckoutStore>((set) => ({
  selectedGateway: null,
  appliedCoupon: null,

  setGateway: (gateway) => set({ selectedGateway: gateway }),

  applyCoupon: (coupon) => set({ appliedCoupon: coupon }),

  removeCoupon: () => set({ appliedCoupon: null }),

  reset: () => set({ selectedGateway: null, appliedCoupon: null }),
}));
