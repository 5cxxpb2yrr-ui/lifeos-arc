'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { KanbanBoard } from '@/components/kanban'
import { useSession } from '@supabase/auth-helpers-react'
import { useOpenLoops, useCreateOpenLoop, useUpdateOpenLoop } from '@/hooks/useApi'
import { Button, Card, Input } from '@/components/ui'
import { Plus } from 'lucide-react'
import type { OpenLoop } from '@/types'

const OpenLoopsPage = () => {
  const session = useSession()
  const userId = session?.user?.id || ''
  const [isCreating, setIsCreating] = useState(false)

  const { data: openLoops = [] } = useOpenLoops(userId)
  const createMutation = useCreateOpenLoop()
  const updateMutation = useUpdateOpenLoop()

  const [formData, setFormData] = useState({
    title: '',
    loop_type: 'task' as const,
    priority: 'medium' as const,
    due_date: '',
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync({
        ...formData,
        user_id: userId,
        status: 'open',
        notes: null,
      })
      setFormData({
        title: '',
        loop_type: 'task',
        priority: 'medium',
        due_date: '',
      })
      setIsCreating(false)
    } catch (error) {
      console.error('Failed to create open loop:', error)
    }
  }

  const handleUpdateStatus = async (items: OpenLoop[]) => {
    try {
      for (const item of items) {
        await updateMutation.mutateAsync({
          id: item.id,
          updates: { status: item.status },
        })
      }
    } catch (error) {
      console.error('Failed to update open loops:', error)
    }
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Open Loops</h1>
          <Button onClick={() => setIsCreating(!isCreating)}>
            <Plus size={20} />
            New Loop
          </Button>
        </div>

        {isCreating && (
          <Card>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                placeholder="Loop title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <select
                className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white"
                value={formData.loop_type}
                onChange={(e) => setFormData({ ...formData, loop_type: e.target.value as any })}
              >
                <option value="task">Task</option>
                <option value="question">Question</option>
                <option value="risk">Risk</option>
                <option value="follow_up">Follow Up</option>
              </select>
              <select
                className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white"
                value={formData.priority}
                onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
              <Input
                type="date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
              />
              <div className="flex gap-2">
                <Button type="submit" isLoading={createMutation.isPending}>
                  Create
                </Button>
                <Button variant="secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        <KanbanBoard items={openLoops} onDragEnd={handleUpdateStatus} />
      </div>
    </AppShell>
  )
}

export default OpenLoopsPage
