'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Turnstile } from '@marsidev/react-turnstile';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthLink from '@/components/auth/AuthLink';
import AuthCheckbox from '@/components/auth/AuthCheckbox';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { useLoading } from '@/contexts/LoadingContext';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [showTurnstile, setShowTurnstile] = useState(false);
  const { login, isAuthenticated } = useAuthStore();
  const { selectedServer } = useServerStore();
  const { addLoading, removeLoading } = useLoading();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/loja');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      alert('Preencha todos os campos');
      return;
    }

    // Mostra o Turnstile
    setShowTurnstile(true);
  };

  const handleTurnstileSuccess = async (token: string) => {
    setTurnstileToken(token);
    setIsLoading(true);
    const loadingId = addLoading();

    try {
      // Simula delay
      await new Promise(resolve => setTimeout(resolve, 400));

      const success = await login(email, password);
      if (success) {
        // Redireciona para página de verificação
        // Em produção, você verificaria se precisa de 2FA baseado na resposta do backend
        const needs2FA = Math.random() > 0.5; // Simula necessidade de 2FA

        if (needs2FA) {
          router.push('/verification?type=2fa' as any);
        } else {
          router.push('/loja');
        }
        setShowTurnstile(false);
      }
    } catch (error) {
      alert('Erro ao fazer login. Tente novamente.');
      setShowTurnstile(false);
    } finally {
      setIsLoading(false);
      removeLoading(loadingId);
    }
  };

  if (isAuthenticated) {
    return null;
  }

  return (
    <AuthLayout >
      <h1 className="text-[18px] font-semibold text-white text-center mb-[32px] leading-tight">
        Entre com a sua conta Destiny
      </h1>

      <form onSubmit={handleSubmit} className="space-y-[18px]">
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

        <div className="flex items-center justify-between pt-[2px]">
          <AuthCheckbox
            id="remember"
            label="Lembrar senha"
            checked={rememberMe}
            onChange={setRememberMe}
            tooltip="Sua senha neste dispositivo de acesso será armazenada nas próxima sessões."
          />
          <AuthLink href="/forgot-password" className="text-[14px] underline">Esqueceu a senha?</AuthLink>
        </div>

        {showTurnstile && (
          <div className="flex justify-center py-4">
            <Turnstile
              siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA'}
              onSuccess={handleTurnstileSuccess}
              onError={() => {
                setShowTurnstile(false);
                alert('Erro ao verificar. Tente novamente.');
              }}
              options={{
                theme: 'dark',
              }}
            />
          </div>
        )}

        <div className="pt-[8px]">
          <AuthButton type="submit" isLoading={isLoading}>
            Entrar na minha conta
          </AuthButton>
        </div>
      </form>

      <ul className="mt-[28px] flex justify-center gap-[24px] text-[13px]">
        <li><AuthLink href="/privacy" className="underline text-sm">Política de privacidade</AuthLink></li>
        <li><AuthLink href="/terms" className="underline text-sm">Termos de uso</AuthLink></li>
      </ul>

      <div className="mt-[24px] text-center">
        <p className="text-[#A8A8A8] text-[14px] mb-[6px]">
          Ainda não tem uma conta?
        </p>
        <AuthLink href="/register" className="text-[14px] underline">Criar conta</AuthLink>
      </div>
    </AuthLayout>
  );
};

export default Login;

