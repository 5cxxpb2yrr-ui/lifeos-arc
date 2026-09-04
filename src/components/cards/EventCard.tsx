import React from 'react'
import Card from '../ui/Card'
import Badge from '../ui/Badge'
import type { Event } from '@/types'

export interface EventCardProps {
  event: Event
  onClick?: () => void
}

const EventCard: React.FC<EventCardProps> = ({ event, onClick }) => {
  const eventDate = new Date(event.start_date)
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card
      onClick={onClick}
      className="cursor-pointer hover:bg-gray-600/50 transition-colors"
    >
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-white flex-1 truncate">
          {event.title}
        </h3>
        <Badge variant={event.is_planned ? 'info' : 'success'}>
          {event.is_planned ? 'Planned' : 'Done'}
        </Badge>
      </div>
      {event.description && (
        <p className="text-sm text-gray-400 truncate mb-3">
          {event.description}
        </p>
      )}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{formattedDate}</span>
        {event.location && <span>{event.location}</span>}
      </div>
    </Card>
  )
}

export default EventCard
