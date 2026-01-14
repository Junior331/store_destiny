'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthButton from '@/components/auth/AuthButton';
import AuthLogo from '@/components/auth/AuthLogo';
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
    <AuthLayout logo={<AuthLogo className="w-16 h-16 text-card-foreground" />}>
      <h1 className="text-xl font-semibold text-card-foreground text-center mb-4">
        E-mail enviado!
      </h1>
      
      <p className="text-muted-foreground text-sm text-center mb-6">
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

