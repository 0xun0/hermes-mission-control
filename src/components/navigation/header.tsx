'use client';

import { useInstanceStore } from '@/lib/store/instance-store';
import { Icon } from '@iconify/react';

interface TopHeaderProps {
  onToggleActivity: () => void;
}

export function TopHeader({ onToggleActivity }: TopHeaderProps) {
  const { setSidebarOpen } = useInstanceStore();

  return (
    <header className="h-20 px-4 md:px-8 flex items-center justify-between border-b border-[#333a47]/20 shadow-[0_1px_10px_rgba(0,0,0,0.5)] relative z-10 bg-[#11141a]/80 backdrop-blur-md shrink-0">
      <div className="flex items-center gap-3 flex-1 sm:flex-none">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden neu-raised w-10 h-10 rounded-xl flex items-center justify-center text-slate-300 active:translate-y-px shrink-0"
        >
          <Icon icon="solar:hamburger-menu-linear" width={20} />
        </button>

        {/* Search Bar */}
        <div className="flex relative flex-1 max-w-[12rem] sm:max-w-xs lg:max-w-md h-10 rounded-xl neu-inset items-center px-4">
          <Icon icon="solar:magnifer-linear" className="text-slate-500 shrink-0" width={16} />
          <input
            type="text"
            placeholder="Search"
            className="bg-transparent border-none outline-none text-sm text-slate-300 placeholder-slate-600 ml-2 md:ml-3 w-full font-medium min-w-0"
          />
          <div className="hidden sm:flex px-1.5 py-0.5 rounded items-center justify-center bg-[#1a1d24] shadow-[0_1px_2px_rgba(0,0,0,0.5),inset_0_1px_1px_rgba(255,255,255,0.05)] border border-[#333a47]/40 text-[10px] text-slate-500 font-mono shrink-0">
            ⌘K
          </div>
        </div>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0 ml-3">
        <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl neu-raised text-slate-300 hover:text-white transition-all">
          <Icon icon="solar:pause-circle-linear" width={20} />
          <span className="text-sm font-medium">Pause</span>
        </button>

        <button className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl neu-raised text-slate-300 hover:text-white transition-all">
          <span className="w-2 h-2 rounded-full dot-orange shrink-0" />
          <span className="text-sm font-medium">Ping Una</span>
        </button>

        <button className="hidden md:flex w-10 h-10 rounded-xl neu-raised items-center justify-center text-slate-400 hover:text-orange-400 transition-all">
          <Icon icon="solar:refresh-linear" width={20} />
        </button>

        {/* Mobile-only Activity Toggle */}
        <button
          onClick={onToggleActivity}
          className="xl:hidden w-10 h-10 rounded-xl neu-inset flex items-center justify-center text-orange-500 active:translate-y-px transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay" />
          <Icon icon="solar:history-linear" width={20} className="relative z-10" />
        </button>
      </div>
    </header>
  );
}

// Re-export for backwards compatibility
export { TopHeader as Header };
