import React from 'react'
import {
  useDroppable,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import Card from '../ui/Card'
import KanbanItem from './KanbanItem'
import type { OpenLoop } from '@/types'

export interface KanbanColumnProps {
  title: string
  status: OpenLoop['status']
  items: OpenLoop[]
}

const KanbanColumn: React.FC<KanbanColumnProps> = ({
  title,
  status,
  items,
}) => {
  const { setNodeRef } = useDroppable({
    id: status,
  })

  const statusColors = {
    open: 'border-t-blue-500',
    active: 'border-t-primary',
    waiting: 'border-t-warning',
    blocked: 'border-t-danger',
    complete: 'border-t-success',
  }

  return (
    <div
      ref={setNodeRef}
      className={`bg-panel border-4 rounded-lg p-4 min-h-96 ${statusColors[status]}`}
    >
      <h3 className="font-semibold text-white mb-4">
        {title} ({items.length})
      </h3>
      <SortableContext
        items={items.map((item) => item.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-2">
          {items.map((item) => (
            <KanbanItem key={item.id} item={item} />
          ))}
        </div>
      </SortableContext>
    </div>
  )
}

export default KanbanColumn
