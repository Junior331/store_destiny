'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/molecules/ProductCard';
import { CartItem as CartItemType } from '@/lib/types';

interface ProductCarouselProps {
  items: CartItemType[];
}

export function ProductCarousel({ items }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setIsAtStart(scrollLeft === 0);
      setIsAtEnd(scrollLeft + clientWidth >= scrollWidth - 1);
    }
  };

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollContainerRef.current) {
        const { scrollWidth, clientWidth } = scrollContainerRef.current;
        setShowArrows(scrollWidth > clientWidth);
      }
      checkScrollPosition();
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [items]);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 250;
      const newScrollPosition =
        scrollContainerRef.current.scrollLeft +
        (direction === 'right' ? scrollAmount : -scrollAmount);

      scrollContainerRef.current.scrollTo({
        left: newScrollPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className="relative w-full max-w-4xl">
      {showArrows && !isAtStart && (
        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0E121B] to-transparent pointer-events-none z-50" />
      )}

      {showArrows && !isAtEnd && (
        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0E121B] to-transparent pointer-events-none z-50" />
      )}

      {showArrows && (
        <div className="absolute -top-14 right-0 z-20 flex gap-2">
        <button
          onClick={() => scroll('left')}
          className="w-10 h-10 rounded-full bg-[#1A1F2E] border border-[#2D3348] flex items-center justify-center text-white hover:bg-[#2D3348] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => scroll('right')}
          className="w-10 h-10 rounded-full bg-[#377DFF] flex items-center justify-center text-white hover:bg-[#2868dd] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        </div>
      )}

      <div
        ref={scrollContainerRef}
        onScroll={checkScrollPosition}
        className='overflow-x-auto scrollbar-hide flex gap-4 py-8'
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        {items.map((item) => (
          <div key={item.product.id} className="flex-shrink-0 w-[220px]">
            <ProductCard
              product={item.product}
              checkoutMode={true}
              quantity={item.quantity}
              className="justify-center -ml-[25px]"
              imageClassName="w-[180px] h-auto"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
