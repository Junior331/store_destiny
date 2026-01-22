import { create } from 'zustand';
import type { User } from '@/lib/types/auth';

interface AuthStore {
  user: User | null;
  isAuthenticated: boolean;
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

  logout: () => {
    set({ user: null, isAuthenticated: false });
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem('auth-token');
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

