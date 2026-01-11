import { Typography } from '@/components/atoms/Typography';
import { formatCurrency } from '@/lib/utils/formatters';

export interface PriceDisplayProps {
  subtotal: number;
  discount: number;
  gatewayFee: number;
  total: number;
}

export function PriceDisplay({
  subtotal,
  discount,
  gatewayFee,
  total,
}: PriceDisplayProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-center">
        <Typography variant="body">Subtotal</Typography>
        <Typography variant="body" className="font-semibold">
          {formatCurrency(subtotal)}
        </Typography>
      </div>

      {discount > 0 && (
        <div className="flex justify-between items-center">
          <Typography variant="body" className="text-accent">
            Desconto
          </Typography>
          <Typography variant="body" className="text-accent font-semibold">
            -{formatCurrency(discount)}
          </Typography>
        </div>
      )}

      {gatewayFee > 0 && (
        <div className="flex justify-between items-center">
          <Typography variant="small">Taxa do gateway</Typography>
          <Typography variant="small" className="font-semibold">
            +{formatCurrency(gatewayFee)}
          </Typography>
        </div>
      )}

      <div className="border-t border-slate-700 pt-3">
        <div className="flex justify-between items-center">
          <Typography variant="h3">Total</Typography>
          <Typography variant="h3" className="text-primary">
            {formatCurrency(total)}
          </Typography>
        </div>
      </div>
    </div>
  );
}
