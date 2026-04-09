'use client';

import { cn } from '@/lib/utils';
import { type HTMLAttributes, forwardRef } from 'react';

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'circular' | 'rectangular';
  width?: string | number;
  height?: string | number;
}

const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  ({ className, variant = 'rectangular', width, height, style, ...props }, ref) => {
    const variantStyles = {
      text: 'rounded-[var(--radius-sm)] h-4',
      circular: 'rounded-full',
      rectangular: 'rounded-[var(--radius-md)]',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'skeleton bg-surface',
          variantStyles[variant],
          className
        )}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: typeof height === 'number' ? `${height}px` : height,
          ...style,
        }}
        {...props}
      />
    );
  }
);

Skeleton.displayName = 'Skeleton';

const SkeletonText = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { lines?: number }>(
  ({ className, lines = 3, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('space-y-2', className)} {...props}>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton
            key={i}
            variant="text"
            className={i === lines - 1 ? 'w-3/4' : 'w-full'}
          />
        ))}
      </div>
    );
  }
);

SkeletonText.displayName = 'SkeletonText';

const SkeletonCard = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'p-4 bg-surface border border-border rounded-[var(--radius-md)] space-y-3',
          className
        )}
        {...props}
      >
        <Skeleton variant="rectangular" height={120} />
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
    );
  }
);

SkeletonCard.displayName = 'SkeletonCard';

const SkeletonAvatar = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement> & { size?: number }>(
  ({ className, size = 40, ...props }, ref) => {
    return (
      <Skeleton
        ref={ref}
        variant="circular"
        width={size}
        height={size}
        className={className}
        {...props}
      />
    );
  }
);

SkeletonAvatar.displayName = 'SkeletonAvatar';

export { Skeleton, SkeletonText, SkeletonCard, SkeletonAvatar };
