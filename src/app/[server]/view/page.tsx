'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { getProductsByServer } from '@/lib/data/mockProducts';
import { Typography } from '@/components/atoms/Typography';
import { ShinyButton } from '@/components/atoms/ShinyButton';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { useCart } from '@/lib/hooks/useCart';
import { useLoading } from '@/contexts/LoadingContext';
import { customToast } from '@/components/CustomToast';

export default function ServerViewPage() {
  const router = useRouter();
  const params = useParams();
  const serverSlug = params.server as string;

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const { items } = useCart();
  const { isAuthenticated } = useAuthStore();
  const { selectedServer, setSelectedServer, servers } = useServerStore();
  const { addLoading, removeLoading } = useLoading();

  useEffect(() => {
    // Carrega produtos do servidor específico
    const loadProducts = async () => {
      setIsLoading(true);
      const loadingId = addLoading();

      // Busca o servidor pela slug da URL
      const server = servers.find(s => s.slug === serverSlug);

      if (!server) {
        customToast.error('Servidor não encontrado');
        router.push('/destiny/view');
        removeLoading(loadingId);
        return;
      }

      // Define o servidor selecionado
      setSelectedServer(server);

      // Simula carregamento
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Carrega produtos específicos do servidor
      const serverProducts = getProductsByServer(server.id);
      setProducts(serverProducts);

      setIsLoading(false);
      removeLoading(loadingId);
    };

    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serverSlug]);

  const handleCheckout = () => {
    if (items.length === 0) {
      customToast.warning('Adicione um produto ao carrinho para continuar.');
      return;
    }

    // Se não estiver autenticado, salva URL de destino e redireciona para login
    if (!isAuthenticated) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('redirectAfterLogin', `/${serverSlug}/checkout`);
      }
      router.push('/login');
      return;
    }

    router.push(`/${serverSlug}/checkout`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 space-y-6"
        >
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
            {selectedServer && (
              <p className="text-sm text-gray-400 mt-2">
                Servidor: <span className="text-blue-400 font-semibold">{selectedServer.name}</span>
              </p>
            )}
          </motion.div>
        </motion.div>
        <div className='relative'>
          <ProductGrid products={products} loading={isLoading} />

          <ShinyButton onClick={handleCheckout} cartCount={items.length}>
            Finalizar pedido
          </ShinyButton>
        </div>
      </div>
  );
}
