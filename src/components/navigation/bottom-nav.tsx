'use client';

import { cn } from '@/lib/utils';
import { BOTTOM_NAV_ITEMS } from '@/types';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, CheckSquare, Calendar, Users, User } from 'lucide-react';

const iconMap: Record<string, typeof Home> = {
  home: Home,
  'check-square': CheckSquare,
  calendar: Calendar,
  users: Users,
  user: User,
};

export function BottomNav() {
  const pathname = usePathname();

  const getActiveTab = () => {
    if (pathname === '/council' || pathname?.startsWith('/council')) return 'council';
    if (pathname?.includes('/tasks')) return 'tasks';
    if (pathname?.includes('/calendar')) return 'calendar';
    if (pathname?.includes('/profile')) return 'profile';
    return 'home';
  };

  const activeTab = getActiveTab();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 md:hidden h-16 px-2 pb-safe bg-bg-primary/95 backdrop-blur-lg border-t border-border flex items-center justify-around">
      {BOTTOM_NAV_ITEMS.map((item) => {
        const Icon = iconMap[item.icon] || Home;
        const isActive = activeTab === item.id || pathname?.startsWith(item.href);

        return (
          <Link
            key={item.id}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 py-2 px-3 min-w-[56px] rounded-[var(--radius-sm)] text-xs transition-colors',
              isActive
                ? 'text-accent'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            <div className="relative">
              <Icon className="w-5 h-5" />
              {isActive && (
                <motion.div
                  layoutId="bottomNavActive"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </div>
            <span className="font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
