import { create } from 'zustand';

interface User {
  id: string;
  username: string;
  email: string;
}

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  setUser: (user: User) => void;
  init: () => void;
}

const STORAGE_KEY = 'auth-storage';

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isAuthenticated: false,

  init: () => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        try {
          const data = JSON.parse(stored);
          set({ user: data.user, isAuthenticated: data.isAuthenticated });
        } catch (e) {
          // Ignore parse errors
        }
      }
    }
  },

  login: async (username: string, password: string) => {
    // TODO: Implementar chamada real à API
    // Por enquanto, simula login bem-sucedido
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const user: User = {
      id: '1',
      username,
      email: `${username}@example.com`,
    };

    const state = { user, isAuthenticated: true };
    set(state);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
    
    return true;
  },

  logout: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  },

  setUser: (user: User) => {
    const state = { user, isAuthenticated: true };
    set(state);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    }
  },
}));

