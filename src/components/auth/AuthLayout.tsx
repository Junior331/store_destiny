'use client';

import React from 'react';
import { getImage } from '@/assets/images';
import AuthLogo from './AuthLogo';
import { cn } from '@/lib/utils/cn';

interface AuthLayoutProps {
  className?: string;
  children: React.ReactNode;
  logo?: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, className, logo=<AuthLogo className="w-[63px] h-[50px] text-white" /> }) => {

  return (
    <div className="min-h-screen w-full relative">
      <div className="relative before:content-[''] before:fixed before:inset-0 before:bg-[rgba(12,12,12,0.10)]">
        <div
          className="min-h-screen w-full flex items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${getImage('login_bg').src})` }}
        >
          <div className={cn("w-full max-w-[435px] py-[35px] px-[30px] sm:py-[48px] sm:px-[45px] rounded-[8px] bg-[#262626cc] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] backdrop-blur-[30px] scale-90 relative z-10", className)}>
            {logo && (
              <div className="flex justify-center mb-[24px]">
                {logo}
              </div>
            )}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;