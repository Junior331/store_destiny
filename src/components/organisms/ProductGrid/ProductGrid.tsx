import { Product } from '@/lib/types';
import { ProductCard } from '@/components/molecules/ProductCard';

export interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-400 text-lg">Nenhum produto disponível</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} imageClassName='w-[134px] h-auto' />
      ))}
    </div>
  );
}