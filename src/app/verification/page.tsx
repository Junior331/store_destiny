'use client';

import React, { useState, useRef, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthLayout from '@/components/auth/AuthLayout';
import AuthButton from '@/components/auth/AuthButton';
import AuthLink from '@/components/auth/AuthLink';
import { useLoading } from '@/contexts/LoadingContext';
import { useAuth } from '@/lib/hooks/useAuth';
import { useServerStore } from '@/store/serverStore';
import { getVerificationCredentials, clearVerificationCookies } from '@/lib/utils/crypto';
import { customToast } from '@/components/CustomToast';

function VerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || '2fa'; // '2fa', 'security' ou 'ip'
  const codeLength = type === 'ip' ? 8 : 6;

  const [code, setCode] = useState<string[]>(Array(codeLength).fill(''));
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { addLoading, removeLoading } = useLoading();
  const { login, isLoading, error: authError } = useAuth();
  const { selectedServer } = useServerStore();

  useEffect(() => {
    // Focus no primeiro input ao montar
    inputRefs.current[0]?.focus();

    // Recupera credenciais dos cookies criptografados
    const credentials = getVerificationCredentials();
    if (credentials) {
      setEmail(credentials.email);
      setPassword(credentials.password);
    } else {
      // Se não há credenciais, redireciona para login
      router.push('/login');
    }
  }, [router]);

  const handleChange = (index: number, value: string) => {
    // Aceita apenas números
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1); // Pega apenas o último dígito
    setCode(newCode);

    // Move para o próximo input se tiver valor
    if (value && index < codeLength - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, codeLength);
    const newCode = [...code];

    for (let i = 0; i < pastedData.length; i++) {
      if (/^\d$/.test(pastedData[i])) {
        newCode[i] = pastedData[i];
      }
    }

    setCode(newCode);

    // Focus no próximo input vazio ou no último
    const nextEmptyIndex = newCode.findIndex(c => !c);
    const focusIndex = nextEmptyIndex !== -1 ? nextEmptyIndex : codeLength - 1;
    inputRefs.current[focusIndex]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullCode = code.join('');
    if (fullCode.length !== codeLength) {
      customToast.warning('Por favor, preencha todos os campos');
      return;
    }

    const loadingId = addLoading();

    try {
      // Faz o login com o código de verificação
      const result = await login({
        login: email,
        password,
        two_factor_code: type === '2fa' ? fullCode : undefined,
        security_code: type === 'security' || type === 'ip' ? fullCode : undefined,
        server: selectedServer?.name,
      });

      if (result.success) {
        // Limpa cookies criptografados
        clearVerificationCookies();

        // Redireciona para loja
        router.push('/loja');
      } else {
        customToast.error(result.error || 'Código inválido. Tente novamente.');
        // Limpa o código
        setCode(Array(codeLength).fill(''));
        inputRefs.current[0]?.focus();
      }
    } catch (error) {
      customToast.error(authError || 'Erro ao verificar código. Tente novamente.');
      setCode(Array(codeLength).fill(''));
      inputRefs.current[0]?.focus();
    } finally {
      removeLoading(loadingId);
    }
  };

  const isComplete = code.every(digit => digit !== '');

  return (
    <AuthLayout className='max-w-[535px]'>
      <h1 className="text-[22px] font-semibold text-white text-center mb-[16px] leading-tight">
        

        {type !== 'security'
          ? 'Verificação 2FA'
          : 'Código de verificação'
        }
      </h1>

      <p className="text-[14px] text-[#A8A8A8] text-center mb-[32px] leading-relaxed">
        {type !== 'security'
          ? 'Para continuar, informe o código 2FA gerado no seu aplicativo.'
          : 'É necessário um código de verificação para continuar. Digite o código de segurança enviado para o e-mail cadastrado.'
        }
      </p>

      <form onSubmit={handleSubmit} className="space-y-[24px]">
        <div className="flex gap-[12px] justify-center">
          {code.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
                inputRefs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              onPaste={handlePaste}
              className="w-[42px] h-[52px] text-center text-[24px] font-semibold bg-transparent border-b-2 border-[#5A5A5A] text-white focus:outline-none focus:border-[#2B8CE7] transition-colors"
            />
          ))}
        </div>

        <AuthButton
          type="submit"
          isLoading={isLoading}
          disabled={!isComplete}
        >
          Verificar
        </AuthButton>
      </form>

      <div className="flex items-center justify-center gap-2 mt-[24px] text-center">
        <p className="text-[#A8A8A8] text-[14px]">
          Deseja fazer um novo login?
        </p>
        <AuthLink href="/login" className="text-[14px] !text-[#379CF9]">Clique aqui</AuthLink>
      </div>
    </AuthLayout>
  );
}

export default function VerificationPage() {
  return (
    <Suspense fallback={
      <AuthLayout className='max-w-[535px]'>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
        </div>
      </AuthLayout>
    }>
      <VerificationForm />
    </Suspense>
  );
}
