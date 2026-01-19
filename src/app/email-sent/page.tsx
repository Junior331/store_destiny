'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthButton from '@/components/auth/AuthButton';
import { useAuthStore } from '@/store/authStore';

const EmailSent: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/loja');
    }
  }, [isAuthenticated, router]);

  return (
    <AuthLayout>
      <h1 className="text-lg font-semibold text-white text-center mb-4">
        E-mail enviado!
      </h1>
      
      <p className="text-[#A6A6A6] text-sm mb-6">
        Um e-mail foi enviado para sua caixa de entrada, caso não encontre, 
        verifique a caixa de spam. Siga as instruções para redefinir sua senha. 
        Se você não recebeu nenhum e-mail, aguarde 1 minuto ou tente novamente 
        mais tarde com o e-mail correto.
      </p>
      
      <AuthButton variant="secondary" onClick={() => router.push('/login')}>
        Entrar
      </AuthButton>
    </AuthLayout>
  );
};

export default EmailSent;

