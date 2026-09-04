import React from 'react'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info'
  children: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'default',
  className = '',
  children,
  ...props
}) => {
  const variants = {
    default: 'bg-gray-700 text-gray-200',
    success: 'bg-success/20 text-success',
    warning: 'bg-warning/20 text-warning',
    danger: 'bg-danger/20 text-danger',
    info: 'bg-primary/20 text-primary',
  }

  return (
    <span
      className={`inline-block px-2 py-1 rounded text-xs font-medium ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}

export default Badge
