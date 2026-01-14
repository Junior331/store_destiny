'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Server } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { getAllProducts } from '@/lib/data/mockProducts';
import { Typography } from '@/components/atoms/Typography';
import { ShinyButton } from '@/components/atoms/ShinyButton';
import { Button } from '@/components/atoms/Button';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { useCart } from '@/lib/hooks/useCart';
import { PageLoader } from '@/components/atoms/PageLoader';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useLoading } from '@/contexts/LoadingContext';

const TABS = [
  { id: 'cash', label: 'Cash' },
  { id: 'colecionaveis', label: 'Colecionáveis' },
  { id: 'exclusivos', label: 'Exclusivos' },
  { id: 'promocoes', label: 'Em promoções' },
];

export default function LojaPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('cash');
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const { items } = useCart();
  const { isAuthenticated } = useAuthStore();
  const { selectedServer } = useServerStore();
  const { addLoading, removeLoading } = useLoading();

  const handleChangeServer = () => {
    router.push('/select-server');
  };

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
      return;
    }

    if (!selectedServer) {
      router.push('/select-server');
      return;
    }
  }, [isAuthenticated, selectedServer, router]);

  useEffect(() => {
    // Simula carregamento inicial
    const loadProducts = async () => {
      setIsLoading(true);
      const loadingId = addLoading();
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setProducts(getAllProducts());
      setIsLoading(false);
      removeLoading(loadingId);
    };

    if (selectedServer) {
      loadProducts();
    }
  }, [selectedServer, addLoading, removeLoading]);

  const handleCheckout = () => {
    if (items.length > 0) {
      router.push('/checkout');
    }
  };

  if (!isAuthenticated || !selectedServer) {
    return null;
  }

  return (
    <AuthGuard>
      <div className="max-w-5xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-6"
        >
          {/* Botão para trocar servidor */}
          <div className="flex justify-end">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleChangeServer}
              className="text-muted-foreground hover:text-card-foreground"
            >
              <Server size={16} className="mr-2" />
              Trocar servidor
            </Button>
          </div>

          {/* Tabs customizadas com scroll */}
          <div className="relative">
            <div className="overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:overflow-visible md:px-0">
              <div className="flex gap-2 min-w-max md:min-w-0 md:w-full md:justify-start">
                {TABS.map((tab, index) => (
                  <motion.button
                    key={tab.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
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
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Typography variant="h1" className="mb-2">
              Compre cash e faça a festa!
            </Typography>
            <Typography variant="body">
              Aproveite as opções de compra e obtenha os melhores pacotes no valor que você precisa gastar! Escolha o melhor pacote para você e compre aquele item que você sempre quis ter! OwO
            </Typography>
          </motion.div>
        </motion.div>
        <div className='relative'>
          <ProductGrid products={products} loading={isLoading} />

          {items.length > 0 && (
            <ShinyButton onClick={handleCheckout}>
              Finalizar pedido
            </ShinyButton>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}

