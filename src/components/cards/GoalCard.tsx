import React from 'react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import type { Goal } from '@/types'

export interface GoalCardProps {
  goal: Goal
  onClick?: () => void
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onClick }) => {
  const progressPercentage = goal.progress || 0
  const goalTypeLabel = goal.goal_type
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (l) => l.toUpperCase())

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:bg-gray-600/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white flex-1">{goal.title}</h3>
        <Badge variant="info">{goalTypeLabel}</Badge>
      </div>
      {goal.description && (
        <p className="text-sm text-gray-400 mb-3 line-clamp-2">
          {goal.description}
        </p>
      )}
      <div className="mb-2">
        <div className="flex items-center justify-between text-xs mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="font-medium text-white">{progressPercentage}%</span>
        </div>
        <div className="h-2 bg-surface rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
    </Card>
  )
}

export default GoalCard
