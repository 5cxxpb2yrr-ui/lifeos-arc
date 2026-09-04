import React from 'react'
import { Card, CardContent, CardHeader } from "@/components/ui/card";
export interface MetricCardProps {
  label: string
  value: number | string
  suffix?: string
  trend?: number
  onClick?: () => void
}

const MetricCard: React.FC<MetricCardProps> = ({
  label,
  value,
  suffix = '',
  trend,
  onClick,
}) => {
  const trendColor = trend && trend > 0 ? 'text-success' : 'text-danger'
  const trendSymbol = trend && trend > 0 ? '↑' : '↓'

  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer hover:bg-gray-600/50 transition-colors ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div className="text-gray-400 text-sm mb-2">{label}</div>
      <div className="flex items-baseline justify-between">
        <div className="text-3xl font-bold text-white">
          {value}
          <span className="text-lg text-gray-400 ml-1">{suffix}</span>
        </div>
        {trend !== undefined && (
          <div className={`text-sm font-medium ${trendColor}`}>
            {trendSymbol} {Math.abs(trend)}%
          </div>
        )}
      </div>
    </Card>
  )
}

export default MetricCard
