'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useServerStore, Server } from '@/store/serverStore';
import { useAuthStore } from '@/store/authStore';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthButton from '@/components/auth/AuthButton';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { useLoading } from '@/contexts/LoadingContext';

const SelectServerPage = () => {
  const router = useRouter();
  const { servers, setSelectedServer } = useServerStore();
  const { isAuthenticated } = useAuthStore();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { addLoading, removeLoading } = useLoading();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleSelectServer = (server: Server) => {
    setSelectedId(server.id);
  };

  const handleContinue = () => {
    if (selectedId) {
      const server = servers.find((s) => s.id === selectedId);
      if (server) {
        const loadingId = addLoading();
        setSelectedServer(server);
        // Pequeno delay para mostrar o loading
        setTimeout(() => {
          router.push('/loja');
          removeLoading(loadingId);
        }, 300);
      }
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <AuthGuard>
      <AuthLayout >
        <h1 className="text-lg font-semibold text-white text-center mb-4">
          Selecione seu servidor
        </h1>

        <p className="text-[#A6A6A6] text-sm mb-6">
          Escolha o servidor onde deseja fazer suas compras
        </p>

        <div className="space-y-3 mb-6">
          {servers.map((server, index) => (
            <motion.button
              key={server.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              onClick={() => handleSelectServer(server)}
              className={`
                w-full p-4 rounded-md border-2 transition-all duration-200 text-left
                ${
                  selectedId === server.id
                    ? 'border-primary bg-primary/10'
                    : 'border-border bg-[#1a1a1a] hover:border-primary/50'
                }
              `}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-white font-semibold">
                    {server.name}
                  </h3>
                  {server.description && (
                    <p className="text-[#A6A6A6] text-sm mt-1">
                      {server.description}
                    </p>
                  )}
                </div>
                {selectedId === server.id && (
                  <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                    <svg
                      className="w-3 h-3 text-primary-foreground"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        <AuthButton
          onClick={handleContinue}
          disabled={!selectedId}
        >
          Continuar
        </AuthButton>
      </AuthLayout>
    </AuthGuard>
  );
};

export default SelectServerPage;

