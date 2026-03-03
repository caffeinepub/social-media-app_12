import React from 'react';
import { cn } from '@/lib/utils';

interface AvatarPlaceholderProps {
  initials: string;
  colorClass: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap = {
  xs: 'w-6 h-6 text-xs',
  sm: 'w-8 h-8 text-xs',
  md: 'w-10 h-10 text-sm',
  lg: 'w-12 h-12 text-base',
  xl: 'w-20 h-20 text-xl',
};

export function AvatarPlaceholder({ initials, colorClass, size = 'md', className }: AvatarPlaceholderProps) {
  return (
    <div
      className={cn(
        'rounded-full flex items-center justify-center font-semibold text-white flex-shrink-0',
        sizeMap[size],
        colorClass,
        className
      )}
    >
      {initials}
    </div>
  );
}
