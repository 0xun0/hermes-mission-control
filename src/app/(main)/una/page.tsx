'use client';

import { Icon } from '@iconify/react';
import { ChatPanel } from '@/components/una/chat-panel';

export default function UnaPage() {
  return (
    <>
      <div className="flex items-center gap-3 px-2 animate-slide-up stagger-1">
        <Icon icon="solar:chat-round-linear" className="text-orange-500 glow-orange" width={22} />
        <div>
          <h1 className="text-lg font-medium text-slate-200">Una</h1>
          <p className="text-xs text-slate-500">Your AI partner — always learning</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] text-green-500">Online</span>
        </div>
      </div>

      {/* Chat */}
      <div className="flex-1 px-2 animate-slide-up stagger-2">
        <ChatPanel />
      </div>
    </>
  );
}
