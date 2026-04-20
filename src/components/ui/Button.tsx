import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const variants = {
      primary: 'bg-gradient-to-r from-[#ff5e00] to-[#ff8c00] text-white hover:opacity-90 shadow-lg shadow-[#ff5e00]/20',
      secondary: 'bg-gradient-to-r from-[#7000ff] to-[#b52bff] text-white hover:opacity-90 shadow-lg shadow-[#7000ff]/20',
      outline: 'border-2 border-[#ff5e00] text-[#ff5e00] hover:bg-[#ff5e00]/10',
      ghost: 'bg-transparent text-foreground hover:bg-black/5 dark:hover:bg-white/5',
    };

    const sizes = {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-3 text-base',
      lg: 'px-8 py-4 text-lg font-bold',
    };

    return (
      <button
        ref={ref}
        className={cn(
          'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
