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
        <Input
          value={code}
          onChange={(e) => setCode(e.target.value.toUpperCase())}
          placeholder="Digite o cupom"
          disabled={isValidating}
          error={error || undefined}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleApply();
            }
          }}
        />
        <Button
          onClick={handleApply}
          variant="accent"
          disabled={!code.trim() || isValidating}
          className="whitespace-nowrap"
        >
          {isValidating ? 'Validando...' : 'Aplicar'}
        </Button>
      </div>
    </div>
  );
}
