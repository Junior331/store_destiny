'use client';

import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/molecules/ProductCard';
import { CartItem as CartItemType } from '@/lib/types';

interface ProductCarouselProps {
  items: CartItemType[];
}

export function ProductCarousel({ items }: ProductCarouselProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

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
      {/* Gradient Fade - Left */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#0E121B] to-transparent pointer-events-none z-50" />

      {/* Gradient Fade - Right */}
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#0E121B] to-transparent pointer-events-none z-50" />

      {/* Navigation Buttons - Top Right */}
      <div className="absolute -top-14 right-0 z-20 flex gap-2">
        {/* Left Arrow Button */}
        <button
          onClick={() => scroll('left')}
          className="w-10 h-10 rounded-full bg-[#1A1F2E] border border-[#2D3348] flex items-center justify-center text-white hover:bg-[#2D3348] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={() => scroll('right')}
          className="w-10 h-10 rounded-full bg-[#377DFF] flex items-center justify-center text-white hover:bg-[#2868dd] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Scrollable Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-x-auto scrollbar-hide flex gap-4 px-12 py-4"
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
