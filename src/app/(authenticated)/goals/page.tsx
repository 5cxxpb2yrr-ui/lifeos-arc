'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { GoalCard, TrendChart } from '@/components/cards'
import { Button, Card, Input, TextArea } from '@/components/ui'
import { useSession } from '@supabase/auth-helpers-react'
import { useGoals, useCreateGoal, useUpdateGoal } from '@/hooks/useApi'
import { Plus } from 'lucide-react'

const GoalsPage = () => {
  const session = useSession()
  const userId = session?.user?.id || ''
  const [isCreating, setIsCreating] = useState(false)

  const { data: goals = [] } = useGoals(userId)
  const createMutation = useCreateGoal()
  const updateMutation = useUpdateGoal()

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    goal_type: 'annual' as const,
    target_date: '',
    progress: 0,
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync({
        ...formData,
        user_id: userId,
        status: 'active',
        parent_goal_id: null,
        notes: null,
      })
      setFormData({
        title: '',
        description: '',
        goal_type: 'annual',
        target_date: '',
        progress: 0,
      })
      setIsCreating(false)
    } catch (error) {
      console.error('Failed to create goal:', error)
    }
  }

  const goalsByType = {
    annual: goals.filter(g => g.goal_type === 'annual'),
    quarterly: goals.filter(g => g.goal_type === 'quarterly'),
    monthly: goals.filter(g => g.goal_type === 'monthly'),
    weekly: goals.filter(g => g.goal_type === 'weekly'),
  }

  const chartData = [
    { name: 'Annual', value: goalsByType.annual.length },
    { name: 'Quarterly', value: goalsByType.quarterly.length },
    { name: 'Monthly', value: goalsByType.monthly.length },
    { name: 'Weekly', value: goalsByType.weekly.length },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Goals Planner</h1>
          <Button onClick={() => setIsCreating(!isCreating)}>
            <Plus size={20} />
            New Goal
          </Button>
        </div>

        {isCreating && (
          <Card>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                placeholder="Goal title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <TextArea
                placeholder="Description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
              <select
                className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white"
                value={formData.goal_type}
                onChange={(e) => setFormData({ ...formData, goal_type: e.target.value as any })}
              >
                <option value="annual">Annual</option>
                <option value="quarterly">Quarterly</option>
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
              <Input
                type="date"
                value={formData.target_date}
                onChange={(e) => setFormData({ ...formData, target_date: e.target.value })}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" isLoading={createMutation.isPending}>
                  Create Goal
                </Button>
                <Button variant="secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Goal Distribution Chart */}
        <TrendChart
          title="Goals by Type"
          data={chartData}
          dataKey="value"
          type="bar"
        />

        {/* Goals by Category */}
        {Object.entries(goalsByType).map(([type, typeGoals]) => (
          typeGoals.length > 0 && (
            <div key={type}>
              <h2 className="text-2xl font-bold text-white mb-4 capitalize">
                {type} Goals ({typeGoals.length})
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {typeGoals.map(goal => (
                  <GoalCard key={goal.id} goal={goal} />
                ))}
              </div>
            </div>
          )
        ))}
      </div>
    </AppShell>
  )
}

export default GoalsPage
