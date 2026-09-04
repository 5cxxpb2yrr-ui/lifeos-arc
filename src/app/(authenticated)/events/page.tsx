'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { Button, Card, Input } from '@/components/ui'
import { EventCard } from '@/components/cards'
import { useSession } from '@supabase/auth-helpers-react'
import { useEvents, useCreateEvent, useUpdateEvent, useDeleteEvent } from '@/hooks/useApi'
import type { Event } from '@/types'
import { Plus, Calendar, MapPin } from 'lucide-react'

const EventsPage = () => {
  const session = useSession()
  const userId = session?.user?.id || ''
  const [isCreating, setIsCreating] = useState(false)

  const { data: events = [], isLoading } = useEvents(userId)
  const createEventMutation = useCreateEvent()
  const updateEventMutation = useUpdateEvent()
  const deleteEventMutation = useDeleteEvent()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    event_type: 'meeting' as const,
    start_date: new Date().toISOString().split('T')[0],
    location: '',
    is_planned: true,
  })

  const handleCreateEvent = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createEventMutation.mutateAsync({
        ...formData,
        user_id: userId,
        end_date: null,
        notes: null,
      })
      setFormData({
        title: '',
        description: '',
        event_type: 'meeting',
        start_date: new Date().toISOString().split('T')[0],
        location: '',
        is_planned: true,
      })
      setIsCreating(false)
    } catch (error) {
      console.error('Failed to create event:', error)
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Events</h1>
          <Button onClick={() => setIsCreating(!isCreating)}>
            <Plus size={20} />
            New Event
          </Button>
        </div>

        {isCreating && (
          <Card>
            <form onSubmit={handleCreateEvent} className="space-y-4">
              <Input
                placeholder="Event title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <Input
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <Input
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
              />
              <Input
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <select
                className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white"
                value={formData.event_type}
                onChange={(e) => setFormData({ ...formData, event_type: e.target.value as any })}
              >
                <option value="workout">Workout</option>
                <option value="meeting">Meeting</option>
                <option value="purchase">Purchase</option>
                <option value="conversation">Conversation</option>
                <option value="doctor_visit">Doctor Visit</option>
                <option value="learning">Learning</option>
                <option value="vacation">Vacation</option>
                <option value="maintenance">Maintenance</option>
              </select>
              <div className="flex gap-2">
                <Button type="submit" isLoading={createEventMutation.isPending}>
                  Create Event
                </Button>
                <Button variant="secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {isLoading ? (
          <p className="text-gray-400">Loading events...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-400">No events yet. Create one to get started!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  )
}

export default EventsPage
