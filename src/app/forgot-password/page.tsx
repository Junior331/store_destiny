'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthLink from '@/components/auth/AuthLink';
import AuthLogo from '@/components/auth/AuthLogo';
import { useAuthStore } from '@/store/authStore';
import { useLoading } from '@/contexts/LoadingContext';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();
  const { addLoading, removeLoading } = useLoading();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/loja');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingId = addLoading();
    // Simula requisição - substitua pela sua lógica de recuperação
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    removeLoading(loadingId);
    router.push('/email-sent');
  };

  return (
    <AuthLayout logo={<AuthLogo className="w-16 h-16 text-card-foreground" />}>
      <h1 className="text-xl font-semibold text-card-foreground text-center mb-4">
        Esqueci minha senha!
      </h1>
      
      <p className="text-muted-foreground text-sm text-center mb-6">
        Insira seu e-mail ou usuário cadastrado para recuperação da conta. 
        Você receberá um e-mail com instruções de redefinição de senha.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          type="text"
          placeholder="Endereço de e-mail ou usuário"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <AuthButton type="submit" isLoading={isLoading}>
          Enviar e-mail
        </AuthButton>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          Lembra sua senha?{' '}
          <AuthLink href="/login">Fazer login</AuthLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;

