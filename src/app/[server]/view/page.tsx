'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { getProductsByServer } from '@/lib/data/mockProducts';
import { Typography } from '@/components/atoms/Typography';
import { PulseButton } from '@/components/atoms/PulseButton';
import { ProductGrid } from '@/components/organisms/ProductGrid';
import { useCart } from '@/lib/hooks/useCart';
import { useLoading } from '@/contexts/LoadingContext';
import { customToast } from '@/components/CustomToast';
import { cn } from '@/lib/utils/cn';
import Image from 'next/image';
import { getIcons } from '@/assets/icons';

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
        <div className='sticky mt-6 -mb-1 bottom-0 left-0 right-0 flex justify-center z-50 py-2 w-full'>
          <PulseButton onClick={handleCheckout} size="xl" showIcon={false}
            className={cn(
              "rounded-full border !border-[#3A94AE] !bg-[#2A6C80] cursor-pointer overflow-hidden",
              "text-white font-medium text-lg w-[218px] h-[55px] !relative !px-0",
            )}>
          <span className="shiny-effect absolute inset-0 rounded-full pointer-events-none" />

            <span className="relative z-10 !cursor-pointer">Finalizar pedido</span>
          </PulseButton>
          {items.length > 0 && (
            <div className="cart-checkout">
              <Image
                src={getIcons("cart_checkout")}
                alt="Cart"
                width={16}
                height={16}
              />
              <span className="checkout-cart-quantity">{items.length}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
