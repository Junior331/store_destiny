'use client';

import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { Badge } from '@/components/atoms/Badge';
import { Typography } from '@/components/atoms/Typography';
import { useCoupon } from '@/lib/hooks/useCoupon';

export function CouponInput() {
  const [code, setCode] = useState('');
  const { appliedCoupon, isValidating, error, validateCoupon, removeCoupon } =
    useCoupon();

  const handleApply = async () => {
    if (code.trim()) {
      await validateCoupon(code.trim());
      setCode('');
    }
  };

  const handleRemove = () => {
    removeCoupon();
  };

  if (appliedCoupon) {
    return (
      <div className="bg-accent/10 border border-accent rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Check className="w-5 h-5 text-accent" />
            <div>
              <Typography variant="body" className="text-white font-semibold">
                Cupom aplicado
              </Typography>
              <Typography variant="small">
                {appliedCoupon.code} -{' '}
                {appliedCoupon.discountAmount
                  ? `R$ ${appliedCoupon.discountAmount.toFixed(2)}`
                  : `${appliedCoupon.discountPercent}%`}
              </Typography>
            </div>
          </div>
          <Button onClick={handleRemove} variant="ghost" size="sm">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Insira o cupom aqui"
          disabled={isValidating}
          className="flex-1 h-10 px-4 rounded-lg bg-gray-800/50 border border-gray-700 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#377DFF] transition-colors"
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleApply();
            }
          }}
        />
        <button
          onClick={handleApply}
          disabled={!code.trim() || isValidating}
          className="px-6 h-10 rounded-lg bg-[#377DFF] hover:bg-[#2868dd] disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium transition-colors"
        >
          {isValidating ? 'Validando...' : 'Aplicar'}
        </button>
      </div>
      {error && (
        <p className="text-red-500 text-xs">{error}</p>
      )}
    </div>
  );
}
