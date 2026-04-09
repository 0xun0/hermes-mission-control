'use client';

import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'orange' | 'success' | 'warning' | 'danger' | 'info';
  size?: 'sm' | 'md';
  rounded?: boolean;
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', size = 'sm', rounded = false, ...props }, ref) => {
    const variantStyles = {
      default: 'bg-[#1a1d24] text-slate-500 border-[#333a47]/40',
      orange: 'bg-orange-500/15 text-orange-400 border-orange-500/30 drop-shadow-[0_0_2px_rgba(249,115,22,0.3)]',
      success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30 drop-shadow-[0_0_2px_rgba(52,211,153,0.3)]',
      warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
      danger: 'bg-red-500/15 text-red-400 border-red-500/30 drop-shadow-[0_0_2px_rgba(248,113,113,0.3)]',
      info: 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30 drop-shadow-[0_0_2px_rgba(129,140,248,0.3)]',
    };

    const sizeStyles = {
      sm: 'text-[10px] px-1.5 py-0.5',
      md: 'text-xs px-2 py-1',
    };

    return (
      <span
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium border whitespace-nowrap',
          rounded ? 'rounded-full' : 'rounded',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

export { Badge };
