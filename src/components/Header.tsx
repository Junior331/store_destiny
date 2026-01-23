'use client';

import { LogOut } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { Button } from '@/components/atoms/Button';
import { AuthLogo, AuthLogoServer } from './auth';
import { capitalizeFirstLetter } from '@/lib/utils/formatters';

export function Header() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { servers, setSelectedServer, clearSelectedServer } = useServerStore();

  const handleLogout = () => {
    logout();
    clearSelectedServer();
    router.push('/login');
  };

  const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const server = servers.find(s => s.id === e.target.value);
    if (server) {
      setSelectedServer(server);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-[#1A1A1A] backdrop-blur-sm sticky top-0 z-50">
      <div className="px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <AuthLogo className="w-[50px] h-full text-white" />
            <div
              className="w-[1px] h-[36px] bg-[#f3f3f319]"
              />
            <AuthLogoServer />
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="flex flex-col text-center text-sm text-[#777]">
                <span className="text-white font-medium">{capitalizeFirstLetter(user.username)}</span>
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-[#A6A6A6] hover:text-white"
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="!rounded-[4px] border border-[#f3f3f37f] bg-[#1A1A1A] text-white hover:text-[#0F0F0F] relative overflow-hidden group hover:!bg-[#1A1A1A]">
              <span className="relative z-10">SUPORTE</span>

              <span className="absolute inset-0 bg-[#F3F3F3] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

