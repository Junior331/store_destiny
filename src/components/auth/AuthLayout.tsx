'use client';

import React from 'react';
import { getImage } from '@/assets/images';

interface AuthLayoutProps {
  children: React.ReactNode;
  logo?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, logo }) => {

  return (
    <div 
      className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${getImage('login_bg').src})` }}
    >
      <div className="w-full max-w-md py-[48px] px-[45px] rounded-lg bg-[rgba(38,38,38,0.80)] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px]">
        {logo && (
          <div className="flex justify-center mb-6">
            {logo}
          </div>
        )}
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;

