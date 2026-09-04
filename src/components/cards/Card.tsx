import React from 'react'

export interface CardProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
}

const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-gray-700 rounded-lg p-6 border border-gray-600 ${className}`}
    >
      {children}
    </div>
  )
}

export default Card
