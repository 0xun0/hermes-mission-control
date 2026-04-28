'use client';

import { useInstanceStore } from '@/lib/store/instance-store';
import { Sidebar } from '@/components/navigation/sidebar';
import { TopHeader } from '@/components/navigation/header';
import { ActivitySidebar } from '@/components/navigation/activity-sidebar';
import { UnaOrb } from '@/components/una/una-orb';
import { CommandBar } from '@/components/command-bar/command-bar';
import { SoundscapeController } from '@/components/ambient/soundscape-controller';
import { BottomNav } from '@/components/navigation/bottom-nav';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { InstanceType } from '@/types';

interface AppShellProps {
  children: React.ReactNode;
}

function getRealmFromPathname(pathname: string | null): InstanceType {
  if (pathname?.startsWith('/nexus')) return 'nexus';
  if (pathname?.startsWith('/brand')) return 'brand';
  if (pathname?.startsWith('/business')) return 'business';
  return 'personal';
}

export function AppShell({ children }: AppShellProps) {
  const { isSidebarOpen, setSidebarOpen, focusModeActive, setCurrentInstance, toggleFocusMode, isActivityOpen, toggleActivityOpen } = useInstanceStore();
  const [isMobileActivityOpen, setMobileActivityOpen] = useState(false);
  const pathname = usePathname();

  // Sync realm from pathname
  useEffect(() => {
    const realm = getRealmFromPathname(pathname);
    setCurrentInstance(realm);
  }, [pathname, setCurrentInstance]);

  // Close drawers on resize past breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setMobileActivityOpen(false);
        setSidebarOpen(false);
      } else if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + Shift + F -> Toggle Focus Mode
      if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFocusMode();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleFocusMode]);

  const isOverlayVisible = isSidebarOpen || isMobileActivityOpen;
  const currentRealm = getRealmFromPathname(pathname);
  const isNexus = currentRealm === 'nexus';

  return (
    <div className={cn('flex w-full h-full relative', focusModeActive && 'focus-mode')} data-realm={currentRealm}>
      {/* Mobile Overlay Backdrop */}
      <AnimatePresence>
        {isOverlayVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => {
              setSidebarOpen(false);
              setMobileActivityOpen(false);
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 xl:hidden cursor-pointer"
          />
        )}
      </AnimatePresence>

      {/* Left Sidebar */}
      <Sidebar />

      {/* Main Dashboard Area */}
      <main className="flex-1 flex flex-col h-full relative bg-gradient-to-br from-[#1a1d24] via-[#11141a] to-[#0a0c0f] min-w-0">

        {/* Top Header */}
        <div className="focus-dimmable">
          <TopHeader onToggleActivity={() => setMobileActivityOpen(!isMobileActivityOpen)} />
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-20 lg:pb-8 flex flex-col gap-6 md:gap-8 relative z-10">
          {children}
        </div>
      </main>

      {/* Right Activity Sidebar */}
      <ActivitySidebar
        isOpen={isMobileActivityOpen}
        onClose={() => setMobileActivityOpen(false)}
        isDesktopOpen={isActivityOpen}
        onToggleDesktop={toggleActivityOpen}
      />

      {/* Omnipresent: Una Orb */}
      <UnaOrb />

      {/* Omnipresent: Command Bar */}
      <CommandBar />

      {/* Omnipresent: Soundscapes */}
      <SoundscapeController />

      {/* Mobile Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
