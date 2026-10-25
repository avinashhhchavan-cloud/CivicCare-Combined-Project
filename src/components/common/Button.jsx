import React from 'react';

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
  const baseStyles =
    'inline-flex items-center justify-center font-label-md rounded font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'h-8 px-3 text-xs gap-1.5',
    md: 'h-10 px-4 text-sm gap-2',
    lg: 'h-11 px-6 text-sm tracking-wide gap-2',
    xl: 'h-12 px-8 text-base tracking-wide gap-2.5',
  };

  const variantStyles = {
    primary:
      'bg-primary text-on-primary hover:bg-[#222222] active:bg-[#000000] focus:ring-primary shadow-sm',
    secondary:
      'bg-surface-container text-on-surface hover:bg-surface-container-high active:bg-surface-container-highest focus:ring-outline',
    outline:
      'bg-surface-container-lowest text-on-surface border border-outline-variant hover:bg-surface-container-low active:bg-surface-container focus:ring-primary shadow-sm',
    destructive:
      'bg-error text-on-error hover:bg-[#991b1b] focus:ring-error shadow-sm',
    ghost:
      'bg-transparent text-on-surface-variant hover:text-on-surface hover:bg-surface-container-low focus:ring-outline',
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${
        variantStyles[variant] || variantStyles.primary
      } ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
    </button>
  );
}
