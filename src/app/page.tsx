'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { getAllProducts } from '@/lib/data/mockProducts';
import { Typography } from '@/components/atoms/Typography';
import { ShinyButton } from '@/components/atoms/ShinyButton';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { useCart } from '@/lib/hooks/useCart';

const TABS = [
  { id: 'cash', label: 'Cash' },
  { id: 'colecionaveis', label: 'Colecionáveis' },
  { id: 'exclusivos', label: 'Exclusivos' },
  { id: 'promocoes', label: 'Em promoções' },
];

export default function HomePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('cash');
  const products = getAllProducts();
  const { items } = useCart();

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push('/checkout');
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8 space-y-6">
        {/* Tabs customizadas com scroll */}
        <div className="relative">
          <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:overflow-visible md:px-0">
            <div className="flex gap-2 min-w-max md:min-w-0 md:w-full md:justify-start">
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-5 py-3 rounded-full text-sm md:text-base font-medium whitespace-nowrap
                    transition-all duration-200 flex-shrink-0
                    ${activeTab === tab.id
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700'
                    }
                  `}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <Typography variant="h1" className="mb-2">
            Compre cash e faça a festa!
          </Typography>
          <Typography variant="body">
            Aproveite as opções de compra e obtenha os melhores pacotes no valor que você precisa gastar! Escolha o melhor pacote para você e compre aquele item que você sempre quis ter! OwO
          </Typography>
        </div>
      </div>
      <div className='relative'>
        <ProductGrid products={products} />

        {items.length > 0 && (
          <ShinyButton onClick={handleCheckout}>
            Finalizar pedido
          </ShinyButton>
        )}
      </div>
    </div>
  );
}