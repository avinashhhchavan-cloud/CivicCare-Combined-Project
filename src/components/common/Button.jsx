import React from 'react';

/**
 * Unified Button component that follows the Apple‑inspired design system
 * defined in tailwind.config.js.
 *
 * Props:
 *  - variant: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost'
 *  - size:    'sm' | 'md' | 'lg' | 'xl'
 *  - disabled, type, onClick, className, children, icon, iconPosition
 */
export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  type = 'button',
  disabled = false,
  className = '',
  onClick,
  icon: Icon,
  iconPosition = 'left',
  ...props
}) {
  // Base styles – flex, centered, rounded, transition, focus ring
  const baseStyles =
    'inline-flex items-center justify-center font-medium rounded transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Size scale – matches the design system spacing
  const sizeStyles = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 px-6 text-sm tracking-wide gap-2',
    xl: 'h-12 px-8 text-base tracking-wide gap-2.5',
  };

  // Variant mapping – uses Tailwind color tokens from tailwind.config.js
  const variantStyles = {
    primary: 'bg-primary text-white hover:bg-primary/90 focus-visible:ring-primary shadow-sm',
    secondary: 'bg-muted text-primary hover:bg-muted/90 focus-visible:ring-primary',
    outline: 'border border-border-muted text-primary hover:bg-muted/50 focus-visible:ring-primary',
    destructive: 'bg-error text-white hover:bg-error/90 focus-visible:ring-error',
    ghost: 'bg-transparent text-primary hover:bg-muted/20 focus-visible:ring-primary',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
