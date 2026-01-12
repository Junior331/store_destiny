'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

import { Tabs } from '@/components/atoms/Tabs';
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
        <Tabs
          tabs={TABS}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

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