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
import { useAuth } from '@/lib/hooks/useAuth';
import { saveVerificationCredentials } from '@/lib/utils/crypto';
import { customToast } from '@/components/CustomToast';

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>('');
  const [showTurnstile, setShowTurnstile] = useState(false);
  const { isAuthenticated } = useAuthStore();
  const { selectedServer } = useServerStore();
  const { addLoading, removeLoading } = useLoading();
  const { login, isLoading, error: authError } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/loja');
    }
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      customToast.warning('Preencha todos os campos');
      return;
    }

    // Mostra o Turnstile apenas se ainda não foi validado
    if (!turnstileToken) {
      setShowTurnstile(true);
      return;
    }

    // Se já tem token do Turnstile, prossegue com login
    await handleLogin();
  };

  const handleTurnstileSuccess = async (token: string) => {
    setTurnstileToken(token);
    // Automaticamente prossegue com o login após Turnstile validar
    await handleLogin(token);
  };

  const handleLogin = async (token?: string) => {
    const finalToken = token || turnstileToken;

    if (!finalToken) {
      customToast.error('Erro na verificação. Tente novamente.');
      return;
    }

    const loadingId = addLoading();

    try {
      const result = await login({
        login: email,
        password,
        token: finalToken,
        server: selectedServer?.name,
      });

      if (result.success) {
        // Login completo - redireciona para loja
        router.push('/loja');
      } else if (result.requires2FA || result.requiresSecurityCode) {
        // Salva credenciais em cookies criptografados para a página de verificação
        saveVerificationCredentials(email, password);

        // Redireciona para página de verificação
        const verificationType = result.requires2FA ? '2fa' : 'security';
        router.push(`/verification?type=${verificationType}` as any);
      } else {
        // Mostra erro e reseta Turnstile
        customToast.error(result.error || 'Erro ao fazer login. Tente novamente.');
        setShowTurnstile(false);
        setTurnstileToken('');
      }
    } catch (error) {
      customToast.error(authError || 'Erro ao fazer login. Tente novamente.');
      setShowTurnstile(false);
      setTurnstileToken('');
    } finally {
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
                customToast.error('Erro ao verificar. Tente novamente.');
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

