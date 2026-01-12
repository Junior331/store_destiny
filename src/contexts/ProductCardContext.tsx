'use client';

import React, { createContext, useContext, useState } from 'react';

interface ProductCardContextType {
  activeCardId: string | null;
  setActiveCardId: (id: string | null) => void;
}

const ProductCardContext = createContext<ProductCardContextType | undefined>(undefined);

export function ProductCardProvider({ children }: { children: React.ReactNode }) {
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  return (
    <ProductCardContext.Provider value={{ activeCardId, setActiveCardId }}>
      {children}
    </ProductCardContext.Provider>
  );
}

export function useProductCard() {
  const context = useContext(ProductCardContext);
  if (!context) {
    throw new Error('useProductCard must be used within a ProductCardProvider');
  }
  return context;
}
