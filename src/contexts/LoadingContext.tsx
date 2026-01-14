'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface LoadingContextType {
  isLoading: boolean;
  setLoading: (loading: boolean) => void;
  addLoading: () => string;
  removeLoading: (id: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set());
  const isLoading = loadingIds.size > 0;

  useEffect(() => {
    if (isLoading) {
      document.body.style.cursor = 'wait';
      document.body.classList.add('loading-cursor');
    } else {
      document.body.style.cursor = '';
      document.body.classList.remove('loading-cursor');
    }

    return () => {
      document.body.style.cursor = '';
      document.body.classList.remove('loading-cursor');
    };
  }, [isLoading]);

  const setLoading = (loading: boolean) => {
    if (loading) {
      const id = Date.now().toString();
      setLoadingIds((prev) => new Set([...prev, id]));
      return id;
    } else {
      setLoadingIds(new Set());
    }
  };

  const addLoading = () => {
    const id = `loading-${Date.now()}-${Math.random()}`;
    setLoadingIds((prev) => new Set([...prev, id]));
    return id;
  };

  const removeLoading = (id: string) => {
    setLoadingIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setLoading, addLoading, removeLoading }}>
      {children}
    </LoadingContext.Provider>
  );
}

export function useLoading() {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

