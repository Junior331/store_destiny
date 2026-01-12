'use client';

import React from 'react';
import Image from 'next/image';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { Product, ProductRarity } from '@/lib/types';
import { Button } from '@/components/atoms/Button';
import { formatCurrency, formatCash } from '@/lib/utils/formatters';
import { useCart } from '@/lib/hooks/useCart';
import { getImage } from '@/assets/images';

export interface ProductCardProps {
  product: Product;
}

const RARITY_COLORS: Record<ProductRarity, { border: string; gradientStart: string; gradientEnd: string; glowBg: string; hoverGlow: string }> = {
  common: {
    border: '#354426',
    gradientStart: '#88C94A',
    gradientEnd: '#A3EA5F',
    glowBg: 'radial-gradient(105.79% 89% at 45.38% 29.73%, rgba(163, 234, 95, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)',
    hoverGlow: 'radial-gradient(105.79% 89% at 45.38% 29.73%, rgba(163, 234, 95, 0.35) 0%, rgba(0, 0, 0, 0.00) 100%)',
  },
  rare: {
    border: '#332F20',
    gradientStart: '#EFC139',
    gradientEnd: '#F5CF5E',
    glowBg: 'radial-gradient(105.79% 89% at 45.38% 29.73%, rgba(163, 234, 95, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)',
    hoverGlow: 'radial-gradient(105.79% 89% at 45.38% 29.73%, rgba(163, 234, 95, 0.35) 0%, rgba(0, 0, 0, 0.00) 100%)',
  },
  epic: {
    border: '#27232F',
    gradientStart: '#9B77DB',
    gradientEnd: '#C8B3E8',
    glowBg: 'radial-gradient(105.79% 89% at 45.38% 29.73%, rgba(155, 119, 219, 0.10) 0%, rgba(0, 0, 0, 0.00) 100%)',
    hoverGlow: 'radial-gradient(105.79% 89% at 45.38% 29.73%, rgba(155, 119, 219, 0.35) 0%, rgba(0, 0, 0, 0.00) 100%)',
  },
};

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, updateQuantity, isInCart, getItemQuantity } = useCart();
  const quantity = getItemQuantity(product.id);
  const inCart = isInCart(product.id);
  const rarityColors = RARITY_COLORS[product.rarity];
  const [showButton, setShowButton] = React.useState(false);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncrement = () => {
    if (quantity < 15) {
      updateQuantity(product.id, quantity + 1);
    }
  };

  const handleDecrement = () => {
    updateQuantity(product.id, quantity - 1);
  };

  const handleCardClick = () => {
    setShowButton(true);
  };

  const price = product.discountedPrice || product.originalPrice;

  return (
    <div
      onClick={handleCardClick}
      className="relative w-full rounded-[20px] group/card transition-all duration-300 cursor-pointer"
      style={{
        background: 'rgba(14, 18, 27, 0.95)',
        border: `2px solid ${rarityColors.border}`,
      }}
    >
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 group-hover/card:opacity-0"
        style={{ background: rarityColors.glowBg }}
      />

      <div
        className="absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300 opacity-0 group-hover/card:opacity-100"
        style={{ background: rarityColors.hoverGlow }}
      />

      <div className="absolute bottom-0 right-0 pointer-events-none opacity-70">
        <svg xmlns="http://www.w3.org/2000/svg" width="176" height="212" viewBox="0 0 176 212" fill="none">
          <mask id={`path-1-inside-1_${product.id}`} fill="white">
            <path d="M164.401 3.47847e-05L3.06431 3.47847e-05C2.43373 -0.00341499 1.82461 0.249845 1.35589 0.71036C0.887178 1.17087 0.592526 1.80558 0.529475 2.49053C-4.29685 51.7082 24.585 87.3499 58.0803 95.087C59.04 95.2926 59.923 95.8022 60.619 96.5522C61.315 97.3022 61.7933 98.2593 61.9941 99.3042C64.3928 110.968 69.135 121.905 75.878 131.324C82.6211 140.743 91.1966 148.409 100.985 153.769C101.34 153.967 101.649 154.254 101.885 154.605C102.121 154.956 102.28 155.363 102.347 155.793C102.414 156.222 102.389 156.663 102.273 157.08C102.157 157.498 101.954 157.88 101.679 158.196L39.2516 227L164.401 227C221.628 227 268 176.377 268 113.91V113.096C268 50.6234 221.628 3.47847e-05 164.401 3.47847e-05ZM92.4628 97.572L164.153 97.572C168.043 97.572 171.773 99.2588 174.524 102.261C177.274 105.264 178.82 109.337 178.82 113.583C178.82 117.829 177.274 121.902 174.524 124.905C171.773 127.907 168.043 129.594 164.153 129.594H138.805C125.329 129.644 104.767 127.264 92.478 97.572M238.297 113.583V114.175C238.297 124.775 236.384 135.271 232.668 145.063C228.951 154.856 223.504 163.753 216.637 171.247C209.77 178.741 201.618 184.684 192.647 188.738C183.675 192.792 174.06 194.876 164.351 194.873H110.252L139.236 163.719C140.182 162.706 141.458 162.143 142.784 162.153L160.574 162.209H164.092C175.92 162.201 187.261 157.067 195.622 147.934C203.983 138.801 208.68 126.418 208.68 113.506V113.234C208.673 100.327 203.973 87.9507 195.613 78.8239C187.253 69.6971 175.915 64.5664 164.092 64.5591L75.9661 64.5591C62.6887 64.5591 41.3352 57.6355 33.9487 32.8081L164.351 32.8081C205.177 32.9409 238.297 69.0697 238.297 113.583Z" />
          </mask>
          <path d="M3.06431 3.47847e-05L3.05884 1.00003H3.06431V3.47847e-05ZM0.529475 2.49053L1.52472 2.58812L1.52527 2.58219L0.529475 2.49053ZM58.0803 95.087L57.8553 96.0613L57.8631 96.0631L57.8709 96.0648L58.0803 95.087ZM61.9941 99.3042L61.012 99.493L61.0146 99.5057L61.9941 99.3042ZM100.985 153.769L101.473 152.896L101.465 152.891L100.985 153.769ZM101.679 158.196L102.42 158.868L102.427 158.86L102.435 158.852L101.679 158.196ZM39.2516 227L38.511 226.328L36.994 228H39.2516V227ZM164.153 97.572V96.572V97.572ZM138.805 129.594V128.594L138.801 128.594L138.805 129.594ZM238.297 114.175H237.297V114.175H238.297ZM164.351 194.873L164.351 193.873H164.351V194.873ZM110.252 194.873L109.52 194.192L107.956 195.873H110.252V194.873ZM139.236 163.719L138.505 163.037L138.503 163.038L139.236 163.719ZM142.784 162.153L142.777 163.153L142.781 163.153L142.784 162.153ZM160.574 162.209L160.571 163.209H160.574V162.209ZM164.092 162.209V163.209H164.093L164.092 162.209ZM208.68 113.506H207.68V113.506H208.68ZM208.68 113.234H209.68V113.234L208.68 113.234ZM164.092 64.5591L164.093 63.5591H164.092V64.5591ZM33.9487 32.8081V31.8081L32.6079 31.8081L32.9902 33.0933L33.9487 32.8081ZM164.351 32.8081L164.354 31.8081H164.351V32.8081ZM164.401 -0.999965L3.06431 -0.999965V1.00003L164.401 1.00003V-0.999965ZM3.06978 -0.99995C2.16304 -1.00491 1.3033 -0.639871 0.655052 -0.00295858L2.05673 1.42368C2.34591 1.13956 2.70441 0.998081 3.05884 1.00002L3.06978 -0.99995ZM0.655052 -0.00295858C0.00919099 0.631604 -0.382681 1.49031 -0.466315 2.39886L1.52527 2.58219C1.56773 2.12084 1.76516 1.71015 2.05673 1.42368L0.655052 -0.00295858ZM-0.465751 2.39293C-5.33583 52.0568 23.8195 88.1994 57.8553 96.0613L58.3054 94.1126C25.3506 86.5004 -3.25786 51.3595 1.5247 2.58812L-0.465751 2.39293ZM57.8709 96.0648C58.6207 96.2254 59.3235 96.6262 59.886 97.2324L61.352 95.8719C60.5225 94.9781 59.4593 94.3597 58.2898 94.1092L57.8709 96.0648ZM59.886 97.2324C60.4494 97.8395 60.8451 98.6243 61.0121 99.4929L62.9761 99.1155C62.7415 97.8944 62.1807 96.7648 61.352 95.8719L59.886 97.2324ZM61.0146 99.5057C63.4407 111.303 68.238 122.37 75.0649 131.906L76.6911 130.742C70.0319 121.44 65.3449 110.634 62.9736 99.1028L61.0146 99.5057ZM75.0649 131.906C81.8919 141.442 90.5796 149.211 100.505 154.646L101.465 152.891C91.8136 147.607 83.3502 140.044 76.6911 130.742L75.0649 131.906ZM100.497 154.641C100.71 154.76 100.903 154.937 101.055 155.163L102.715 154.047C102.394 153.57 101.971 153.174 101.473 152.896L100.497 154.641ZM101.055 155.163C101.208 155.39 101.314 155.658 101.359 155.948L103.335 155.638C103.246 155.068 103.035 154.522 102.715 154.047L101.055 155.163ZM101.359 155.948C101.405 156.237 101.387 156.534 101.31 156.813L103.237 157.348C103.391 156.793 103.424 156.208 103.335 155.638L101.359 155.948ZM101.31 156.813C101.232 157.092 101.098 157.34 100.924 157.541L102.435 158.852C102.81 158.419 103.083 157.903 103.237 157.348L101.31 156.813ZM100.939 157.524L38.511 226.328L39.9922 227.672L102.42 158.868L100.939 157.524ZM39.2516 228L164.401 228V226L39.2516 226V228ZM164.401 228C222.261 228 269 176.845 269 113.91H267C267 175.909 220.995 226 164.401 226V228ZM269 113.91V113.096H267V113.91H269ZM269 113.096C269 50.1555 222.261 -0.999965 164.401 -0.999965V1.00003C220.995 1.00003 267 51.0913 267 113.096H269ZM92.4628 98.572L164.153 98.572V96.572L92.4628 96.572V98.572ZM164.153 98.572C167.748 98.572 171.215 100.13 173.786 102.937L175.261 101.586C172.331 98.3875 168.338 96.572 164.153 96.572V98.572ZM173.786 102.937C176.36 105.747 177.82 109.575 177.82 113.583H179.82C179.82 109.098 178.188 104.782 175.261 101.586L173.786 102.937ZM177.82 113.583C177.82 117.591 176.36 121.419 173.786 124.229L175.261 125.58C178.188 122.384 179.82 118.068 179.82 113.583H177.82ZM173.786 124.229C171.215 127.036 167.748 128.594 164.153 128.594V130.594C168.338 130.594 172.331 128.779 175.261 125.58L173.786 124.229ZM164.153 128.594H138.805V130.594H164.153V128.594ZM138.801 128.594C132.118 128.619 123.801 128.037 115.654 123.847C107.531 119.67 99.4687 111.848 93.402 97.1895L91.554 97.9544C97.7762 112.988 106.139 121.203 114.739 125.626C123.314 130.036 132.016 130.619 138.808 130.594L138.801 128.594ZM237.297 113.583V114.175H239.297V113.583H237.297ZM237.297 114.175C237.297 124.655 235.406 135.031 231.733 144.708L233.602 145.418C237.362 135.511 239.297 124.895 239.297 114.175H237.297ZM231.733 144.708C228.06 154.386 222.678 163.174 215.9 170.571L217.374 171.922C224.329 164.332 229.842 155.325 233.602 145.418L231.733 144.708ZM215.9 170.571C209.121 177.968 201.079 183.83 192.235 187.827L193.059 189.649C202.157 185.538 210.419 179.513 217.374 171.922L215.9 170.571ZM192.235 187.827C183.391 191.823 173.916 193.876 164.351 193.873L164.35 195.873C174.204 195.876 183.959 193.761 193.059 189.649L192.235 187.827ZM164.351 193.873H110.252V195.873H164.351V193.873ZM110.984 195.554L139.968 164.401L138.503 163.038L109.52 194.192L110.984 195.554ZM139.966 164.402C140.732 163.583 141.744 163.145 142.777 163.153L142.792 161.153C141.172 161.141 139.633 161.83 138.505 163.037L139.966 164.402ZM142.781 163.153L160.571 163.208L160.577 161.209L142.787 161.153L142.781 163.153ZM160.574 163.209H164.092V161.209H160.574V163.209ZM164.093 163.209C176.215 163.201 187.819 157.938 196.36 148.609L194.884 147.259C186.703 156.196 175.624 161.201 164.092 161.209L164.093 163.209ZM196.36 148.609C204.897 139.284 209.68 126.656 209.68 113.506H207.68C207.68 126.179 203.069 138.319 194.884 147.259L196.36 148.609ZM209.68 113.506V113.234H207.68V113.506H209.68ZM209.68 113.234C209.673 100.089 204.887 87.468 196.35 78.1484L194.876 79.4993C203.059 88.4334 207.673 100.566 207.68 113.235L209.68 113.234ZM196.35 78.1484C187.811 68.8259 176.211 63.5666 164.093 63.5591L164.092 65.5591C175.62 65.5663 186.695 70.5682 194.876 79.4993L196.35 78.1484ZM164.092 63.5591L75.9661 63.5591V65.5591L164.092 65.5591V63.5591ZM75.9661 63.5591C62.9673 63.5591 42.1263 56.7877 34.9072 32.5229L32.9902 33.0933C40.5442 58.4834 62.41 65.5591 75.9661 65.5591V63.5591ZM33.9487 33.8081L164.351 33.8081V31.8081L33.9487 31.8081V33.8081ZM164.347 33.8081C204.545 33.9389 237.297 69.5394 237.297 113.583H239.297C239.297 68.5999 205.809 31.943 164.354 31.8081L164.347 33.8081Z" fill={`url(#paint0_linear_${product.id})`} fillOpacity="0.07" mask={`url(#path-1-inside-1_${product.id})`} />
          <defs>
            <linearGradient id={`paint0_linear_${product.id}`} x1="134" y1="0" x2="134" y2="227" gradientUnits="userSpaceOnUse">
              <stop stopColor={rarityColors.gradientStart} />
              <stop offset="1" stopColor={rarityColors.gradientEnd} />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="absolute top-4 right-4 pointer-events-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="89" viewBox="0 0 15 89" fill="none">
          <path d="M15 89L-4.36736e-08 89L-8.73471e-08 88L15 88L15 89ZM15 87L-1.31021e-07 87L-2.62041e-07 84L15 84L15 87Z" fill={`url(#paint0_qr_${product.id})`} />
          <path d="M15 83L-3.05715e-07 83L-3.49389e-07 82L15 82L15 83ZM15 81L-3.93062e-07 81L-4.80409e-07 79L15 79L15 81ZM15 78L-5.24083e-07 78L-6.1143e-07 76L15 76L15 78Z" fill={`url(#paint1_qr_${product.id})`} />
          <path d="M15 75L-6.55104e-07 75L-6.98777e-07 74L15 74L15 75ZM15 71L-8.29798e-07 71L-8.73471e-07 70L15 70L15 71ZM15 69L-9.17145e-07 69L-9.60819e-07 68L15 68L15 69Z" fill={`url(#paint2_qr_${product.id})`} />
          <path d="M15 66L-1.04817e-06 66L15 66ZM15 63L-1.17919e-06 63L-1.31021e-06 60L15 60L15 63ZM15 59L-1.35388e-06 59L15 59Z" fill={`url(#paint3_qr_${product.id})`} />
          <path d="M15 58L-1.39755e-06 58L-1.52858e-06 55L15 55L15 58ZM15 54L-1.57225e-06 54L-1.6596e-06 52L15 52L15 54ZM15 51L-1.70327e-06 51L-1.74694e-06 50L15 50L15 51Z" fill={`url(#paint4_qr_${product.id})`} />
          <path d="M15 50L-1.74694e-06 50L-1.87796e-06 47L15 47L15 50ZM15 46L-1.92164e-06 46L-2.05266e-06 43L15 43L15 46ZM15 43L-2.05266e-06 43L-2.09633e-06 42L15 42L15 43Z" fill={`url(#paint5_qr_${product.id})`} />
          <path d="M15 41L-2.14001e-06 41L-2.18368e-06 40L15 40L15 41ZM15 39L-2.22735e-06 39L-2.35837e-06 36L15 36L15 39ZM15 34L-2.44572e-06 34L15 34Z" fill={`url(#paint6_qr_${product.id})`} />
          <path d="M15 33L-2.48939e-06 33L-2.57674e-06 31L15 31L15 33ZM15 28L-2.70776e-06 28L-2.75144e-06 27L15 27L15 28ZM15 27L-2.75144e-06 27L-2.79511e-06 26L15 26L15 27Z" fill={`url(#paint7_qr_${product.id})`} />
          <path d="M15 24L-2.88246e-06 24L15 24ZM15 21L-3.01348e-06 21L-3.10082e-06 19L15 19L15 21ZM15 18L-3.1445e-06 18L15 18Z" fill={`url(#paint8_qr_${product.id})`} />
          <path d="M15 16L-3.23184e-06 16L-3.27552e-06 15L15 15L15 16ZM15 14L-3.31919e-06 14L-3.45021e-06 11L15 11L15 14ZM15 10L-3.49389e-06 10L-3.53756e-06 9L15 9L15 10Z" fill={`url(#paint9_qr_${product.id})`} />
          <path d="M15 8L-3.58123e-06 8L-3.66858e-06 6L15 6L15 8ZM15 5L-3.71225e-06 5L-3.75593e-06 4L15 4L15 5ZM15 3L-3.7996e-06 3L-3.93062e-06 0L15 -6.56239e-07L15 3Z" fill={`url(#paint10_qr_${product.id})`} />
          <defs>
            {[...Array(11)].map((_, i) => (
              <linearGradient key={i} id={`paint${i}_qr_${product.id}`} x1="-1.96531e-06" y1="45" x2="15" y2="45" gradientUnits="userSpaceOnUse">
                <stop stopColor={rarityColors.gradientStart} />
                <stop offset="1" stopColor={rarityColors.gradientEnd} />
              </linearGradient>
            ))}
          </defs>
        </svg>
      </div>

      <div className="relative z-10 p-3 pb-4 flex flex-col">
        <div className="flex items-center justify-center -mt-[35px] -ml-[25px] mb-2">
          <Image
            width={194}
            height={242}
            alt={product.name}
            src={getImage(product.imageUrl)}
            className='rotate-[0.829deg]'
          />
        </div>

        <div className="space-y-1.5">
          <div className="text-left">
            <h3 className="text-white text-lg font-bold leading-tight">
              {formatCash(product.cashAmount)}
            </h3>
            <p className="text-gray-400 text-[10px] uppercase tracking-wide">
              CASH
            </p>
          </div>

          {!showButton ? (
            <div className="flex items-center gap-2">
              <div className="bg-[#6d747b19] group-hover/card:bg-[#377DFF] transition-colors duration-300 rounded-full px-3 py-1.5 inline-flex items-center gap-2">
                <span className="text-gray-400 group-hover/card:text-white transition-colors duration-300 text-sm font-medium">
                  {formatCurrency(price)}
                </span>
              </div>
              {product.discountedPrice && product.discount && (
                <div className='flex flex-col'>
                  <span
                    className="text-[10px] font-medium italic line-through leading-[14px]"
                    style={{ color: 'rgba(255, 255, 255, 0.50)' }}
                  >
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span
                    className="px-1 rounded-[14px] text-[10px] font-medium italic leading-[14px]"
                    style={{
                      background: 'rgba(90, 204, 122, 0.40)',
                      color: '#5ACC7A'
                    }}
                  >
                    -{product.discount}%
                  </span>
                </div>
              )}
            </div>
          ) : showButton && (
            <div className="relative max-w-32 py-1 px-0.5 z-50">

              <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="pulse-ring" />
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart();
                }}
                className="min-w-24  h-8 bg-transparent border border-white text-white text-sm py-3 px-4 rounded-full flex items-center justify-center gap-2 transition-colors duration-200"
              >

                <ShoppingCart className="w-3.5 h-3.5" />
                Adicionar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
