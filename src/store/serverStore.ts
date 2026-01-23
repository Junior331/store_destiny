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
          set({ selectedServer: data.selectedServer, servers: data.servers || MOCK_SERVERS });
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

