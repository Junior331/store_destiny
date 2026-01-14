'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthLink from '@/components/auth/AuthLink';
import AuthCheckbox from '@/components/auth/AuthCheckbox';
import AuthLogo from '@/components/auth/AuthLogo';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { useLoading } from '@/contexts/LoadingContext';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login, isAuthenticated } = useAuthStore();
  const { selectedServer } = useServerStore();
  const { addLoading, removeLoading } = useLoading();

  useEffect(() => {
    if (isAuthenticated) {
      if (selectedServer) {
        router.push('/loja');
      } else {
        router.push('/select-server');
      }
    }
  }, [isAuthenticated, selectedServer, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    const loadingId = addLoading();
    
    try {
      const success = await login(email, password);
      if (success) {
        // Redirecionamento será feito pelo useEffect
        if (selectedServer) {
          router.push('/loja');
        } else {
          router.push('/select-server');
        }
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      alert('Erro ao fazer login. Tente novamente.');
    } finally {
      setIsLoading(false);
      removeLoading(loadingId);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthLayout logo={<AuthLogo className="w-16 h-16 text-card-foreground" />}>
      <h1 className="text-xl font-semibold text-card-foreground text-center mb-6">
        Entre com a sua conta
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          type="text"
          placeholder="Usuário ou e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        
        <AuthInput
          isPassword
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        
        <div className="flex items-center justify-between">
          <AuthCheckbox
            id="remember"
            label="Lembrar senha"
            checked={rememberMe}
            onChange={setRememberMe}
          />
          <AuthLink href="/forgot-password">Esqueceu a senha?</AuthLink>
        </div>
        
        <AuthButton type="submit" isLoading={isLoading}>
          Entrar na minha conta
        </AuthButton>
      </form>
      
      <div className="mt-6 flex justify-center gap-4 text-sm">
        <AuthLink href="/privacy">Política de privacidade</AuthLink>
        <AuthLink href="/terms">Termos de uso</AuthLink>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          Ainda não tem uma conta?{' '}
          <AuthLink href="/register">Criar conta</AuthLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Login;

