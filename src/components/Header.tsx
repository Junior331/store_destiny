'use client';

import { useRouter } from 'next/navigation';
import { LogOut, Server, ChevronDown } from 'lucide-react';
import { useAuthStore } from '@/store/authStore';
import { useServerStore } from '@/store/serverStore';
import { Button } from '@/components/atoms/Button';

export function Header() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { selectedServer, servers, setSelectedServer, clearSelectedServer } = useServerStore();

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
    <header className="bg-card/50 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {selectedServer && (
              <div className="relative">
                <Server size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
                <select
                  value={selectedServer.id}
                  onChange={handleServerChange}
                  className="server-select pl-9 pr-8 py-2 bg-muted/50 border border-border rounded-md text-sm text-card-foreground font-medium appearance-none cursor-pointer hover:bg-muted/70 transition-colors focus:outline-none"
                >
                  {servers.map((server) => (
                    <option key={server.id} value={server.id}>
                      {server.name}
                    </option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none z-10" />
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

