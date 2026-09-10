import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'success' | 'warning' | 'error';
}

export function Badge({
  className,
  variant = 'secondary',
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: 'bg-primary-light text-primary border border-primary/20',
    secondary: 'bg-surface text-text-main border border-surface-darker',
    outline: 'border border-gray-300 text-text-main bg-white',
    success: 'bg-success-light text-success-dark border border-success/20',
    warning: 'bg-warning-light text-warning-dark border border-warning/20',
    error: 'bg-error-light text-error-dark border border-error/20',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
