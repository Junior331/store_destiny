import { create } from 'zustand';

export interface Server {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
}

interface ServerStore {
  selectedServer: Server | null;
  servers: Server[];
  setSelectedServer: (server: Server | null) => void;
  setServers: (servers: Server[]) => void;
  clearSelectedServer: () => void;
  init: () => void;
}

// Servidores mockados - substituir por chamada à API
const mockServers: Server[] = [
  {
    id: 'server-1',
    name: 'Destiny Server',
    slug: 'destiny',
    description: 'Servidor principal de Destiny',
  },
  {
    id: 'server-2',
    name: 'Survival Server',
    slug: 'survival',
    description: 'Servidor de sobrevivência',
  },
  {
    id: 'server-3',
    name: 'Creative Server',
    slug: 'creative',
    description: 'Servidor criativo',
  },
];

const STORAGE_KEY = 'server-storage';

export const useServerStore = create<ServerStore>((set, get) => ({
  selectedServer: null,
  servers: mockServers,

  init: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          set({ selectedServer: data.selectedServer, servers: data.servers || mockServers });
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  },

  setSelectedServer: (server: Server | null) => {
    set({ selectedServer: server });
    if (typeof window !== 'undefined') {
      const current = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedServer: server,
        servers: current.servers,
      }));
    }
  },

  setServers: (servers: Server[]) => {
    set({ servers });
    if (typeof window !== 'undefined') {
      const current = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedServer: current.selectedServer,
        servers,
      }));
    }
  },

  clearSelectedServer: () => {
    set({ selectedServer: null });
    if (typeof window !== 'undefined') {
      const current = get();
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedServer: null,
        servers: current.servers,
      }));
    }
  },
}));

