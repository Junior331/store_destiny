'use client';

import { toast } from 'sonner';
import { useEffect, useState } from 'react';

const ToastDivider = () => (
  <div
    style={{
      width: '1px',
      height: '40px',
      background: 'rgba(255, 255, 255, 0.15)',
    }}
  />
);

interface CustomToastProps {
  message: string;
  icon: React.ReactNode;
  gradientColor: string;
  duration: number;
}

const CustomToastContent = ({ message, icon, gradientColor, duration }: CustomToastProps) => {
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / duration) * 100);
      setProgress(remaining);

      if (remaining === 0) {
        clearInterval(interval);
      }
    }, 16); // ~60fps

    return () => clearInterval(interval);
  }, [duration]);

  return (
    <div style={{ position: 'relative', overflow: 'hidden', borderRadius: '8px' }}>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: `${progress}%`,
          bottom: 0,
          background: `linear-gradient(90deg, ${gradientColor} 0%, ${gradientColor} 60%, rgba(0, 0, 0, 0) 100%)`,
          transition: 'width 0.016s linear',
        }}
      />

      <div
        style={{
          position: 'relative',
          display: 'flex',
          padding: '16px',
          alignItems: 'center',
          gap: '12px',
          borderRadius: '8px',
          border: '1px solid #3F3F3F',
          backdropFilter: 'blur(30px)',
          color: '#FFF',
          fontFamily: 'Poppins',
          fontSize: '16px',
          fontWeight: 500,
          lineHeight: 'normal',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {icon}
          <ToastDivider />
          <span>{message}</span>
        </div>
      </div>
    </div>
  );
};

export const customToast = {
  success: (message: string) => {
    return toast.custom(
      () => (
        <CustomToastContent
          message={message}
          gradientColor="rgba(50, 171, 113, 0.15)"
          duration={3000}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <g clipPath="url(#clip0_16369_4855)">
                <path d="M11 17L14 20L21 13" stroke="#47F2A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#47F2A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_16369_4855">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
      ),
      { duration: 3000 }
    );
  },

  error: (message: string) => {
    return toast.custom(
      () => (
        <CustomToastContent
          message={message}
          gradientColor="rgba(241, 68, 68, 0.15)"
          duration={3000}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <g clipPath="url(#clip0_16369_4866)">
                <path d="M20 12L12 20" stroke="#F14444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 12L20 20" stroke="#F14444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="#F14444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
              <defs>
                <clipPath id="clip0_16369_4866">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
      ),
      { duration: 3000 }
    );
  },

  warning: (message: string) => {
    return toast.custom(
      () => (
        <CustomToastContent
          message={message}
          gradientColor="rgba(241, 182, 68, 0.15)"
          duration={3000}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <g clipPath="url(#clip0_16369_4876)">
                <path d="M17.8014 5.0275L28.7339 24.0112C29.5001 25.3487 28.5101 27 26.9326 27H5.06763C3.49013 27 2.50013 25.3487 3.26638 24.0112L14.1989 5.0275C14.9864 3.6575 17.0139 3.6575 17.8014 5.0275Z" stroke="#F1B644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 18V13" stroke="#F1B644" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 24C16.8284 24 17.5 23.3284 17.5 22.5C17.5 21.6716 16.8284 21 16 21C15.1716 21 14.5 21.6716 14.5 22.5C14.5 23.3284 15.1716 24 16 24Z" fill="#F1B644" />
              </g>
              <defs>
                <clipPath id="clip0_16369_4876">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
      ),
      { duration: 3000 }
    );
  },

  info: (message: string) => {
    return toast.custom(
      () => (
        <CustomToastContent
          message={message}
          gradientColor="rgba(217, 217, 217, 0.15)"
          duration={3000}
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
              <g clipPath="url(#clip0_16369_4832)">
                <path d="M16 28C22.6274 28 28 22.6274 28 16C28 9.37258 22.6274 4 16 4C9.37258 4 4 9.37258 4 16C4 22.6274 9.37258 28 16 28Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 15C15.2652 15 15.5196 15.1054 15.7071 15.2929C15.8946 15.4804 16 15.7348 16 16V21C16 21.2652 16.1054 21.5196 16.2929 21.7071C16.4804 21.8946 16.7348 22 17 22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15.5 12C16.3284 12 17 11.3284 17 10.5C17 9.67157 16.3284 9 15.5 9C14.6716 9 14 9.67157 14 10.5C14 11.3284 14.6716 12 15.5 12Z" fill="white" />
              </g>
              <defs>
                <clipPath id="clip0_16369_4832">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
            </svg>
          }
        />
      ),
      { duration: 3000 }
    );
  },
};
