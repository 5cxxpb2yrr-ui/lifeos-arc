import React from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import type { OpenLoop } from '@/types'

export interface KanbanItemProps {
  item: OpenLoop
}

const KanbanItem: React.FC<KanbanItemProps> = ({ item }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  }

  const priorityColors = {
    low: 'bg-blue-500/20 text-blue-400',
    medium: 'bg-yellow-500/20 text-yellow-400',
    high: 'bg-orange-500/20 text-orange-400',
    critical: 'bg-red-500/20 text-red-400',
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-surface border border-gray-700 rounded p-3 cursor-grab active:cursor-grabbing hover:border-gray-600 transition-colors"
    >
      <p className="text-sm font-medium text-white mb-2">{item.title}</p>
      <div className="flex items-center justify-between text-xs">
        <Badge
          variant="info"
          className={`${priorityColors[item.priority]} border-0`}
        >
          {item.priority}
        </Badge>
        {item.due_date && (
          <span className="text-gray-400">
            {new Date(item.due_date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
            })}
          </span>
        )}
      </div>
    </div>
  )
}

export default KanbanItem
