"use client";

import React from "react";
import { useServerStore } from "@/store/serverStore";
import Image from "next/image";

interface AuthLogoServerProps {
  className?: string;
}

const AuthLogoServer: React.FC<AuthLogoServerProps> = ({ className }) => {
  const { selectedServer } = useServerStore();

  if (!selectedServer) {
    return null;
  }

  if (selectedServer.image) {
    return (
      <div className={className}>
        <Image
          width={100}
          height={100}
          className="object-contain"
          src={selectedServer.image}
          alt={`Logo ${selectedServer.name}`}
        />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <span className="text-white font-bold text-lg">
        {selectedServer.name.substring(0, 3).toUpperCase()}
      </span>
    </div>
  );
};

export default AuthLogoServer;
