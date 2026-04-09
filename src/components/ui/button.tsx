'use client';

import { cn } from '@/lib/utils';
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '@iconify/react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading = false, leftIcon, rightIcon, disabled, children, ...props }, ref) => {
    const variantStyles = {
      primary: 'neu-raised text-slate-200 hover:text-white transition-all relative overflow-hidden',
      secondary: 'neu-inset text-slate-300 hover:text-white transition-all',
      ghost: 'bg-transparent text-slate-400 hover:text-slate-200 hover:bg-[#161920] transition-colors',
      danger: 'bg-gradient-to-b from-red-900/50 to-red-950/50 text-red-300 border border-red-500/30 hover:border-red-500/50 transition-all shadow-[0_2px_4px_rgba(0,0,0,0.4)]',
    };

    const sizeStyles = {
      sm: 'h-8 px-3 text-xs rounded-lg gap-1.5',
      md: 'h-10 px-4 text-sm rounded-xl gap-2',
      lg: 'h-12 px-6 text-base rounded-xl gap-2',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center font-medium',
          'active:translate-y-px disabled:opacity-40 disabled:cursor-not-allowed',
          'cursor-pointer select-none',
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        disabled={disabled || loading}
        {...props}
      >
        {variant === 'primary' && (
          <div className="absolute inset-0 bg-orange-500/10 mix-blend-overlay pointer-events-none" />
        )}
        {loading ? (
          <Icon icon="solar:refresh-linear" className="w-4 h-4 animate-spin relative z-10" />
        ) : leftIcon ? (
          <span className="relative z-10">{leftIcon}</span>
        ) : null}
        <span className="relative z-10">{children}</span>
        {!loading && rightIcon && <span className="relative z-10">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
