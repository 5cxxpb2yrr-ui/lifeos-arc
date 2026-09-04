import React, { useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  closestCorners,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import Card from '../ui/Card'
import KanbanColumn from './KanbanColumn'
import type { OpenLoop } from '@/types'

export interface KanbanBoardProps {
  items: OpenLoop[]
  onDragEnd: (items: OpenLoop[]) => void
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ items, onDragEnd }) => {
  const columns = {
    open: items.filter((item) => item.status === 'open'),
    active: items.filter((item) => item.status === 'active'),
    waiting: items.filter((item) => item.status === 'waiting'),
    blocked: items.filter((item) => item.status === 'blocked'),
    complete: items.filter((item) => item.status === 'complete'),
  }

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event

      if (!over) return

      const activeItem = items.find((item) => item.id === active.id)
      if (!activeItem) return

      const newItems = items.map((item) =>
        item.id === active.id
          ? { ...item, status: over.id as OpenLoop['status'] }
          : item
      )

      onDragEnd(newItems)
    },
    [items, onDragEnd]
  )

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <KanbanColumn title="Open" status="open" items={columns.open} />
        <KanbanColumn title="Active" status="active" items={columns.active} />
        <KanbanColumn title="Waiting" status="waiting" items={columns.waiting} />
        <KanbanColumn title="Blocked" status="blocked" items={columns.blocked} />
        <KanbanColumn title="Complete" status="complete" items={columns.complete} />
      </div>
    </DndContext>
  )
}

export default KanbanBoard
