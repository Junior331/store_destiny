export interface PaymentGateway {
  id: string;
  name: string;
  icon: string;
  fee: number; // porcentagem
  active: boolean;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  discountAmount?: number;
  active: boolean;
}
