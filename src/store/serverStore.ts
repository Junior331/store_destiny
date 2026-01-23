import { create } from 'zustand';
import { MOCK_SERVERS } from '@/lib/data/mockServers';

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

const STORAGE_KEY = 'server-storage';

export const useServerStore = create<ServerStore>((set, get) => ({
  selectedServer: null,
  servers: MOCK_SERVERS,

  init: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          // SEMPRE usa MOCK_SERVERS para garantir dados atualizados
          set({ selectedServer: data.selectedServer, servers: MOCK_SERVERS });
        } catch (e) {
          // Ignore parse errors
          set({ servers: MOCK_SERVERS });
        }
      }
    }
  },

  setSelectedServer: (server: Server | null) => {
    set({ selectedServer: server });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedServer: server,
        // Não salva servers no localStorage, sempre usa MOCK_SERVERS
      }));
    }
  },

  setServers: (servers: Server[]) => {
    // Não permite modificar servers, sempre usa MOCK_SERVERS
    console.warn('setServers foi chamado mas será ignorado. Use MOCK_SERVERS diretamente.');
  },

  clearSelectedServer: () => {
    set({ selectedServer: null });
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        selectedServer: null,
      }));
    }
  },
}));

