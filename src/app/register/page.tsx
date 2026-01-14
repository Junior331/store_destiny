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
    <AuthLayout logo={<AuthLogo className="w-16 h-16 text-card-foreground" />}>
      <h1 className="text-xl font-semibold text-card-foreground text-center mb-6">
        Criando conta
      </h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
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
        
        <AuthCheckbox
          id="terms"
          label={
            <span>
              Aceitar{' '}
              <AuthLink href="/terms">termo de uso</AuthLink>
              {' '}e{' '}
              <AuthLink href="/privacy">política de privacidade</AuthLink>
            </span>
          }
          checked={acceptTerms}
          onChange={setAcceptTerms}
        />
        
        <AuthButton type="submit" isLoading={isLoading}>
          Criar conta
        </AuthButton>
      </form>
      
      <div className="mt-6 text-center">
        <p className="text-muted-foreground text-sm">
          Já tenho uma conta.{' '}
          <AuthLink href="/login">Fazer login</AuthLink>
        </p>
      </div>
    </AuthLayout>
  );
};

export default Register;

