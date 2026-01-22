import { motion } from "framer-motion";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/molecules/ProductCard";

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
}

const ProductCardSkeleton = () => (
  <div className="relative w-full rounded-[20px] overflow-hidden bg-[rgba(14,18,27,0.95)] border-2 border-[#354426] animate-pulse">
    <div className="p-3 pb-4 flex flex-col">
      <div className="flex items-center mb-2">
        <div className="w-[134px] h-[167px] bg-zinc-800 rounded-lg" />
      </div>
      <div className="absolute top-2.5 right-2.5 w-8 h-36 bg-zinc-800 rounded-lg" />
      <div className="space-y-1.5">
        <div className="h-6 bg-zinc-800 rounded w-3/4" />
        <div className="h-3 bg-zinc-800 rounded w-1/2" />
        <div className="flex items-center gap-2 mt-2">
          <div className="h-8 bg-zinc-800 rounded-full w-20" />
          <div className="h-8 bg-zinc-800 rounded w-12" />
        </div>
      </div>
    </div>
  </div>
);

const EmptyState = () => (
  <div className="text-center py-12">
    <p className="text-gray-400 text-lg">Nenhum produto disponível</p>
  </div>
);

const MotionGridContainer = ({
  children,
  className = "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-8"
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.3 }}
  >
    {children}
  </motion.div>
);

const MotionGridItem = ({ children, index }: { children: React.ReactNode; index: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{
      duration: 0.3,
      delay: index * 0.05,
      ease: "easeOut",
    }}
  >
    {children}
  </motion.div>
);

export function ProductGrid({ products, loading = false }: ProductGridProps) {
  if (loading) {
    return (
      <MotionGridContainer>
        {Array.from({ length: 10 }).map((_, index) => (
          <MotionGridItem key={index} index={index}>
            <ProductCardSkeleton />
          </MotionGridItem>
        ))}
      </MotionGridContainer>
    );
  }

  if (products.length === 0) {
    return <EmptyState />;
  }

  return (
    <MotionGridContainer>
      {products.map((product, index) => (
        <MotionGridItem key={product.id} index={index}>
          <ProductCard product={product} imageClassName="w-[134px] h-auto" />
        </MotionGridItem>
      ))}
    </MotionGridContainer>
  );
}