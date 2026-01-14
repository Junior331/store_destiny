'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Server } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { Button } from '@/components/atoms/Button';

export function Header() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { selectedServer, clearSelectedServer } = useServerStore();

  const handleLogout = () => {
    logout();
    clearSelectedServer();
    router.push('/login');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedServer && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Server size={16} />
                <span className="text-card-foreground font-medium">
                  {selectedServer.name}
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {user && (
              <span className="text-sm text-muted-foreground">
                Olá, <span className="text-card-foreground font-medium">{user.username}</span>
              </span>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-muted-foreground hover:text-card-foreground"
            >
              <LogOut size={16} className="mr-2" />
              Sair
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

