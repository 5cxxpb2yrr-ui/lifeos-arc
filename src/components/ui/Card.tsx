import React from 'react'

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', children, ...props }, ref) => (
    <div
      ref={ref}
      className={`bg-panel border border-gray-700 rounded-lg p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  )
)

Card.displayName = 'Card'

export default Card
