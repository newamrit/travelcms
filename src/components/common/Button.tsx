import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({
  variant = 'primary',
  size = 'md',
  loading = false,
  icon,
  iconPosition = 'left',
  fullWidth = false,
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ripple';

  const variantClasses = {
    primary: 'bg-gradient-to-r from-[#012871] to-[#011950] text-white hover:shadow-lg hover:from-[#011950] hover:to-[#011445] focus:ring-[#012871]',
    secondary: 'bg-gradient-to-r from-[#f35500] to-[#c54300] text-white hover:shadow-lg hover:from-[#c54300] hover:to-[#a83800] focus:ring-[#f35500]',
    danger: 'bg-gradient-to-r from-red-600 to-red-700 text-white hover:shadow-lg hover:from-red-700 hover:to-red-800 focus:ring-red-600',
    success: 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:shadow-lg hover:from-green-700 hover:to-green-800 focus:ring-green-600',
    outline: 'bg-white text-slate-700 border-2 border-slate-200 hover:border-[#012871] hover:text-[#012871] hover:shadow-md focus:ring-[#012871]'
  };

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2.5'
  };

  const widthClass = fullWidth ? 'w-full' : '';

  const loadingClasses = loading ? 'btn-loading' : '';

  const iconContent = icon && (
    <span className={`inline-flex ${loading ? 'opacity-0' : ''}`}>
      {icon}
    </span>
  );

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${loadingClasses} ${className}`}
      disabled={disabled || loading}
      {...props}
    >
      {iconPosition === 'left' && iconContent}
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
      {iconPosition === 'right' && iconContent}
    </button>
  );
}
