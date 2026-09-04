import React from 'react'
import { AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react'

export interface AlertProps {
  title?: string
  description?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  className?: string
  onClose?: () => void
}

const Alert: React.FC<AlertProps> = ({
  title,
  description,
  type = 'info',
  className = '',
  onClose,
}) => {
  const typeConfig = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      icon: Info,
      text: 'text-blue-400',
    },
    success: {
      bg: 'bg-success/10',
      border: 'border-success/20',
      icon: CheckCircle,
      text: 'text-success',
    },
    warning: {
      bg: 'bg-warning/10',
      border: 'border-warning/20',
      icon: AlertTriangle,
      text: 'text-warning',
    },
    error: {
      bg: 'bg-danger/10',
      border: 'border-danger/20',
      icon: AlertCircle,
      text: 'text-danger',
    },
  }

  const config = typeConfig[type]
  const Icon = config.icon

  return (
    <div
      className={`rounded-lg border ${config.bg} ${config.border} p-4 ${className}`}
    >
      <div className="flex gap-3">
        <Icon className={`${config.text} h-5 w-5 flex-shrink-0 mt-0.5`} />
        <div className="flex-1">
          {title && <h3 className="font-medium text-white mb-1">{title}</h3>}
          {description && <p className="text-sm text-gray-300">{description}</p>}
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300 flex-shrink-0"
          >
            ×
          </button>
        )}
      </div>
    </div>
  )
}

export default Alert
