'use client';

import { cn } from '@/lib/utils';
import { useInstanceStore } from '@/lib/store/instance-store';
import { SIDEBAR_SECTIONS } from '@/types';
import { Icon } from '@iconify/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();
  const { isSidebarOpen, setSidebarOpen, sidebarCollapsed, setSidebarCollapsed } = useInstanceStore();

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard' || pathname === '/' || pathname === '/personal';
    return pathname?.startsWith(href);
  };

  return (
    <aside
      className={cn(
        'focus-hideable fixed inset-y-0 left-0 transform transition-all duration-300 ease-in-out',
        'h-full flex flex-col',
        'bg-gradient-to-r from-[#11141a] to-[#0c0e12]',
        'border-r border-black z-50',
        'shadow-[5px_0_15px_rgba(0,0,0,0.8)]',
        'lg:relative lg:translate-x-0',
        // Desktop collapsed state: shrink to icon-only strip
        sidebarCollapsed ? 'lg:w-16' : 'lg:w-64',
        // Mobile open/close
        isSidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full w-64'
      )}
    >
      {/* Header / Logo */}
      <div className={cn(
        'h-20 flex items-center justify-between border-b border-[#333a47]/20 shadow-[0_1px_0_rgba(0,0,0,0.8)] shrink-0',
        sidebarCollapsed ? 'px-3 justify-center' : 'px-6'
      )}>
        <div className={cn('flex items-center gap-3', sidebarCollapsed && 'lg:hidden')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2a303c] to-[#15181e] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.15)] flex items-center justify-center border border-[#475266]/30">
            <Icon icon="solar:atom-linear" className="text-orange-500 glow-orange" width={20} />
          </div>
          <div>
            <h1 className="text-lg font-medium tracking-tight text-slate-200 drop-shadow-[0_2px_2px_rgba(0,0,0,1)]">
              UNOX
            </h1>
            <p className="text-[10px] text-slate-600 -mt-0.5">Una & Bruno</p>
          </div>
        </div>
        {/* Collapsed logo — shown when sidebar is icon-only */}
        <div className={cn('hidden items-center justify-center', sidebarCollapsed && 'lg:flex')}>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2a303c] to-[#15181e] shadow-[0_2px_4px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.15)] flex items-center justify-center border border-[#475266]/30">
            <Icon icon="solar:atom-linear" className="text-orange-500 glow-orange" width={20} />
          </div>
        </div>
        {/* Mobile Close Button */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-slate-500 hover:text-white transition-colors p-2 -mr-2"
        >
          <Icon icon="solar:close-circle-linear" width={24} />
        </button>
        {/* Desktop Collapse Toggle */}
        <button
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className={cn(
            'hidden lg:flex w-6 h-6 rounded-lg items-center justify-center text-slate-600 hover:text-slate-300 hover:bg-[#1e222a] transition-all shrink-0',
            sidebarCollapsed && 'hidden'
          )}
          title={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <Icon icon="solar:sidebar-minimalistic-linear" width={14} />
        </button>
      </div>

      {/* Nav Links — Dynamic sections */}
      <nav className={cn(
        'flex-1 overflow-y-auto py-4 flex flex-col gap-0.5',
        sidebarCollapsed ? 'px-2 items-center' : 'px-4'
      )}>
        {SIDEBAR_SECTIONS.map((section, sectionIdx) => (
          <div key={section.id} className={cn('w-full', sidebarCollapsed && 'lg:flex lg:flex-col lg:items-center')}>
            {sectionIdx > 0 && (
              <div className={cn('my-2 divider shrink-0', sidebarCollapsed ? 'lg:w-8 mx-auto' : 'mx-2')} />
            )}
            <p className={cn(
              'text-[10px] font-semibold text-slate-600 uppercase tracking-wider mb-1.5',
              sidebarCollapsed ? 'lg:hidden' : 'px-3'
            )}>
              {section.label}
            </p>
            {section.items.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => { if (window.innerWidth < 1024) setSidebarOpen(false); }}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-xl transition-colors',
                    sidebarCollapsed && 'lg:w-10 lg:h-10 lg:justify-center lg:px-0',
                    active
                      ? 'neu-active group'
                      : 'text-slate-500 hover:text-slate-300 hover:bg-[#161920]'
                  )}
                >
                  <Icon
                    icon={item.icon}
                    width={18}
                    className={cn(
                      'shrink-0',
                      active
                        ? 'text-orange-500 drop-shadow-[0_0_5px_rgba(249,115,22,0.6)]'
                        : ''
                    )}
                  />
                  <span className={cn(
                    'text-sm font-medium',
                    active ? 'text-slate-200' : '',
                    sidebarCollapsed && 'lg:hidden'
                  )}>
                    {item.label}
                  </span>
                  {item.badge !== undefined && item.badge > 0 && (
                    <span className={cn(
                      'text-[10px] font-bold bg-orange-500/20 text-orange-400 px-1.5 py-0.5 rounded-full',
                      sidebarCollapsed ? 'lg:hidden' : 'ml-auto'
                    )}>
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom User */}
      <div className={cn(
        'border-t border-[#333a47]/20 shadow-[0_-1px_0_rgba(0,0,0,0.8)] flex items-center shrink-0',
        sidebarCollapsed ? 'p-3 justify-center' : 'p-6 justify-between'
      )}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#0c0e12] shadow-[inset_2px_2px_5px_rgba(0,0,0,0.8),inset_-1px_-1px_2px_rgba(255,255,255,0.02)] border border-black flex items-center justify-center shrink-0">
            <span className="text-xs font-bold text-slate-400">B</span>
          </div>
          <div className={cn(sidebarCollapsed && 'lg:hidden')}>
            <p className="text-xs font-medium text-slate-300">Bruno</p>
            <p className="text-[10px] text-slate-600">Goal: Billionaire</p>
          </div>
        </div>
        <div className={cn('w-2 h-2 rounded-full bg-green-500 glow-green animate-pulse', sidebarCollapsed && 'lg:hidden')} />
      </div>

      {/* Desktop Expand Button — shown only when fully collapsed */}
      <button
        onClick={() => setSidebarCollapsed(false)}
        className={cn(
          'hidden absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#1e222a] border border-[#333a47]/40 items-center justify-center text-slate-500 hover:text-slate-200 transition-all shadow-md',
          sidebarCollapsed && 'lg:flex'
        )}
        title="Expand sidebar"
      >
        <Icon icon="solar:alt-arrow-right-linear" width={12} />
      </button>
    </aside>
  );
}
