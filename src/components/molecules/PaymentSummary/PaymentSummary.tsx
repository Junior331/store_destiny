import React, { useState } from 'react';

interface PaymentSummaryProps {
  cashValue: number;
  paymentFee: number;
  onApplyCoupon?: (coupon: string) => { valid: boolean; discount: number };
  onTotalChange?: (total: number) => void;
}

const PaymentSummary: React.FC<PaymentSummaryProps> = ({
  cashValue,
  paymentFee,
  onApplyCoupon,
  onTotalChange,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const total = cashValue + paymentFee - discount;

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleApplyCoupon = () => {
    if (!couponCode.trim()) {
      setCouponError('Digite um cupom');
      return;
    }

    if (onApplyCoupon) {
      const result = onApplyCoupon(couponCode);
      if (result.valid) {
        setDiscount(result.discount);
        setCouponApplied(true);
        setCouponError('');
        onTotalChange?.(cashValue + paymentFee - result.discount);
      } else {
        setCouponError('Cupom inválido');
        setDiscount(0);
        setCouponApplied(false);
      }
    }
  };

  const handleRemoveCoupon = () => {
    setCouponCode('');
    setDiscount(0);
    setCouponApplied(false);
    setCouponError('');
    onTotalChange?.(cashValue + paymentFee);
  };

  return (
    <div className="w-full h-full max-w-[360px] rounded-lg bg-[#0D1B21] border border-[#1E3A47] p-5">
      {/* Summary rows */}
      <div className="space-y-3">
        {/* Cash */}
        <div className="flex justify-between items-center">
          <span className="text-[#8B9DA7] text-base">Cash</span>
          <span className="text-white text-base font-medium">
            {cashValue.toLocaleString('pt-BR')}
          </span>
        </div>

        {/* Payment fee */}
        <div className="flex justify-between items-center">
          <span className="text-[#8B9DA7] text-base">Taxa de pagamento</span>
          <span className="text-[#8B9DA7] text-base">
            {formatCurrency(paymentFee)}
          </span>
        </div>

        {/* Discount */}
        <div className="flex justify-between items-center">
          <span className="text-[#8B9DA7] text-base">Desconto</span>
          <span className={`text-base ${discount > 0 ? 'text-green-400' : 'text-[#8B9DA7]'}`}>
            {discount > 0 ? `- ${formatCurrency(discount)}` : '-'}
          </span>
        </div>

        {/* Divider */}
        <div className="border-t border-[#1E3A47] my-2" />

        {/* Total */}
        <div className="flex justify-between items-center">
          <span className="text-white text-base font-medium">Valor total</span>
          <span className="text-white text-lg font-bold">
            {formatCurrency(total)}
          </span>
        </div>
      </div>

      {/* Coupon section */}
      <div className="mt-14">
        <p className="text-white text-base mb-3">Tem um cupom?</p>

        <div className="flex">
          <input
            type="text"
            value={couponCode}
            onChange={(e) => {
              setCouponCode(e.target.value.toUpperCase());
              setCouponError('');
            }}
            placeholder="Insira o cupom aqui"
            disabled={couponApplied}
            className="flex-1 bg-[#6d747b19] border border-[#6d747b19] border-r-0 rounded-bl-lg rounded-tl-lg px-4 py-3 text-base text-white placeholder:text-[#6D747B] focus:outline-none disabled:opacity-50"
          />

          {couponApplied ? (
            <button
              onClick={handleRemoveCoupon}
              className="px-4 py-3 text-base font-medium text-red-400 hover:text-red-300 transition-colors"
            >
              Remover
            </button>
          ) : (
            <button
              onClick={handleApplyCoupon}
              className="px-4 py-3 text-base border rounded-br-lg rounded-tr-lg border-l-0 border-[#377dff19] bg-[#377dff19] font-medium text-[#377DFF] transition-colors"
            >
              Aplicar
            </button>
          )}
        </div>

        {couponError && (
          <p className="text-red-400 text-xs mt-2">{couponError}</p>
        )}

        {couponApplied && (
          <p className="text-green-400 text-xs mt-2">
            Cupom aplicado com sucesso!
          </p>
        )}
      </div>
    </div>
  );
};

export default PaymentSummary;
