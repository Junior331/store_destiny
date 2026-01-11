import { Product } from '@/lib/types';
import { Typography } from '@/components/atoms/Typography';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { CartSummary } from '@/components/organisms/CartSummary';

export interface ViewTemplateProps {
  serverId: string;
  serverName: string;
  products: Product[];
}

export function ViewTemplate({
  serverId,
  serverName,
  products,
}: ViewTemplateProps) {
  return (
    <div className="min-h-screen bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <Typography variant="h1" className="mb-2">
            {serverName}
          </Typography>
          <Typography variant="body">
            Selecione os produtos que deseja adicionar ao carrinho
          </Typography>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductGrid products={products} />
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <CartSummary serverId={serverId} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
