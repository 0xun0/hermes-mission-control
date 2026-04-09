'use client';

import { useInstanceStore } from '@/lib/store/instance-store';
import { useUnaStore } from '@/lib/store/una-store';
import { Sidebar } from '@/components/navigation/sidebar';
import { TopHeader } from '@/components/navigation/header';
import { ActivitySidebar } from '@/components/navigation/activity-sidebar';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const { isSidebarOpen, setSidebarOpen } = useInstanceStore();
  const [isActivityOpen, setActivityOpen] = useState(false);

  // Close drawers on resize past breakpoints
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1280) {
        setActivityOpen(false);
        setSidebarOpen(false);
      } else if (window.innerWidth >= 1024) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setSidebarOpen]);

  const isOverlayVisible = isSidebarOpen || isActivityOpen;

  return (
    <>
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
              setActivityOpen(false);
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
        <TopHeader onToggleActivity={() => setActivityOpen(!isActivityOpen)} />

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 md:p-8 pb-12 md:pb-8 flex flex-col gap-6 md:gap-8">
          {children}
        </div>
      </main>

      {/* Right Activity Sidebar */}
      <ActivitySidebar isOpen={isActivityOpen} onClose={() => setActivityOpen(false)} />
    </>
  );
}
