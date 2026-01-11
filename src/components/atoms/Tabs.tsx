'use client';

import { cn } from '@/lib/utils/cn';

interface Tab {
  id: string;
  label: string;
}

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (tabId: string) => void;
  className?: string;
}

export function Tabs({ tabs, activeTab, onTabChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={cn(
            'flex items-center justify-center gap-2 px-6 py-2 rounded-[20px] transition-all duration-200',
            'font-medium text-base leading-6',
            activeTab === tab.id
              ? 'bg-[#377DFF] border-2 border-[#377DFF] text-[#F3F3F3]'
              : 'bg-[rgba(103,119,136,0.10)] text-[#91989E] hover:text-[#F3F3F3]'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
