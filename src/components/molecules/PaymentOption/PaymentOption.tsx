'use client';

import { PaymentGateway } from '@/lib/types';
import { Typography } from '@/components/atoms/Typography';
import { Badge } from '@/components/atoms/Badge';
import { cn } from '@/lib/utils/cn';

export interface PaymentOptionProps {
  gateway: PaymentGateway;
  selected?: boolean;
  onSelect: () => void;
}

export function PaymentOption({
  gateway,
  selected = false,
  onSelect,
}: PaymentOptionProps) {
  return (
    <button
      onClick={onSelect}
      className={cn(
        'w-full p-4 rounded-lg border-2 transition-all text-left',
        'hover:border-primary hover:bg-slate-800',
        selected
          ? 'border-primary bg-slate-800'
          : 'border-slate-700 bg-secondary'
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{gateway.icon}</span>
          <div>
            <Typography variant="h4" className="mb-1">
              {gateway.name}
            </Typography>
            <Typography variant="small">
              {gateway.fee > 0
                ? `Taxa: ${gateway.fee}%`
                : 'Sem taxa'}
            </Typography>
          </div>
        </div>

        {selected && <Badge variant="success">Selecionado</Badge>}
      </div>
    </button>
  );
}
