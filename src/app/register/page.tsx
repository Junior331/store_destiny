'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthInput from '@/components/auth/AuthInput';
import AuthButton from '@/components/auth/AuthButton';
import AuthLink from '@/components/auth/AuthLink';
import AuthCheckbox from '@/components/auth/AuthCheckbox';
import { useAuthStore } from '@/store/authStore';
import { useLoading } from '@/contexts/LoadingContext';

const Register: React.FC = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/loja');
    }
  }, [isAuthenticated, router]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addLoading, removeLoading } = useLoading();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validações
    if (!username.trim()) {
      alert('Por favor, preencha o nome de usuário');
      return;
    }

    if (!email.trim()) {
      alert('Por favor, preencha o e-mail');
      return;
    }

    if (!password.trim()) {
      alert('Por favor, preencha a senha');
      return;
    }

    if (!confirmPassword.trim()) {
      alert('Por favor, confirme sua senha');
      return;
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem');
      return;
    }

    if (!acceptTerms) {
      alert('Você precisa aceitar os termos de uso e política de privacidade');
      return;
    }

    setIsLoading(true);
    const loadingId = addLoading();
    // Simula requisição - substitua pela sua lógica de registro
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
    removeLoading(loadingId);
    console.log({ username, email, password, acceptTerms });
  };

  return (
    <AuthLayout className='max-w-[445px]'>
      <h1 className="text-[22px] font-semibold text-white text-center mb-[32px] leading-tight">
        Criando conta
      </h1>

      <form onSubmit={handleSubmit} className="space-y-[18px]">
        <AuthInput
          type="text"
          placeholder="Crie seu nome de usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <AuthInput
          type="email"
          placeholder="Endereço de e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <AuthInput
          isPassword
          showPasswordHints
          placeholder="Crie uma senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <AuthInput
          isPassword
          placeholder="Confirme sua senha"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <div className="pt-[4px]">
          <AuthCheckbox
            id="terms"
            label={
              <span className="text-[#A8A8A8]">
                Aceitar{' '}
                <AuthLink href="/terms" className="underline text-sm">termo de uso</AuthLink>
                {' '}e{' '}
                <AuthLink href="/privacy" className="underline text-sm">política de privacidade</AuthLink>
              </span>
            }
            checked={acceptTerms}
            onChange={setAcceptTerms}
          />
        </div>

        <div className="pt-[8px]">
          <AuthButton type="submit" isLoading={isLoading}>
            Criar conta
          </AuthButton>
        </div>
      </form>

      <div className="mt-[24px] text-center">
        <p className="text-[#A8A8A8] text-[14px] mb-[6px]">
          Já tenho uma conta no Destiny Community.
        </p>
        <AuthLink href="/login" className="text-[14px] underline">Fazer login</AuthLink>
      </div>
    </AuthLayout>
  );
};

export default Register;

