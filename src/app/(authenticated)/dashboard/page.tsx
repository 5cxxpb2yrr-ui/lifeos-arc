'use client'

import React, { useState } from 'react'
import { useSession } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { AppShell } from '@/components/layout'
import { MetricCard, EventCard, GoalCard, BalanceWheel } from '@/components/cards'
import { useEvents, useGoals, useOpenLoops } from '@/hooks/useApi'
import {
  calculateLifeScore,
  calculateHealthScore,
  calculateRelationshipScore,
  calculateFinanceScore,
  calculateGrowthScore,
  calculateExecutionScore,
} from '@/lib/intelligence/calculations'
import type { Event, Goal, OpenLoop } from '@/types'

const Dashboard = () => {
  const session = useSession()
  const router = useRouter()
  const userId = session?.user?.id || ''

  const { data: events = [] } = useEvents(userId)
  const { data: goals = [] } = useGoals(userId)
  const { data: openLoops = [] } = useOpenLoops(userId)

  // Calculate scores
  const healthScore = calculateHealthScore({
    workoutsPerWeek: events.filter(e => e.event_type === 'workout').length,
    sleepHours: 7,
    stressLevel: 3,
  })

  const relationshipScore = calculateRelationshipScore({
    daysSinceContact: 5,
    interactionFrequency: 3,
    sharedEvents: 2,
  })

  const financeScore = calculateFinanceScore({
    netWorth: 50000,
    monthlyIncome: 5000,
    monthlyExpenses: 2000,
    savingsRate: 0.6,
  })

  const growthScore = calculateGrowthScore({
    learningHours: 5,
    skillsLearned: 2,
    certificationsEarned: 1,
  })

  const executionScore = calculateExecutionScore({
    openLoops: openLoops.filter(l => l.status === 'open').length,
    completedTasks: events.filter(e => !e.is_planned).length,
    overdueTasks: 2,
  })

  const lifeScore = calculateLifeScore({
    health: healthScore,
    relationships: relationshipScore,
    finance: financeScore,
    growth: growthScore,
    execution: executionScore,
  })

  if (!session) {
    router.push('/auth/login')
    return null
  }

  const todayEvents = events.filter(e => {
    const eventDate = new Date(e.start_date).toDateString()
    return eventDate === new Date().toDateString()
  })

  const activeGoals = goals.filter(g => g.status === 'active')
  const activeLoops = openLoops.filter(l => l.status !== 'complete')

  return (
    <AppShell onLogout={() => router.push('/auth/login')}>
      <div className="space-y-6">
        {/* Life Score Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <MetricCard label="Life Score" value={lifeScore} suffix="/100" />
          <MetricCard label="Health" value={healthScore} suffix="/100" />
          <MetricCard label="Relationships" value={relationshipScore} suffix="/100" />
          <MetricCard label="Finance" value={financeScore} suffix="/100" />
          <MetricCard label="Growth" value={growthScore} suffix="/100" />
          <MetricCard label="Execution" value={executionScore} suffix="/100" />
        </div>

        {/* Today's Events */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Today's Events</h2>
          {todayEvents.length === 0 ? (
            <p className="text-gray-400">No events scheduled for today</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {todayEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>

        {/* Active Goals */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">Active Goals</h2>
          {activeGoals.length === 0 ? (
            <p className="text-gray-400">No active goals</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeGoals.map(goal => (
                <GoalCard key={goal.id} goal={goal} />
              ))}
            </div>
          )}
        </div>

        {/* Balance Wheel */}
        <div className="lg:w-1/2">
          <BalanceWheel
            health={healthScore}
            family={relationshipScore}
            relationships={relationshipScore}
            career={growthScore}
            finance={financeScore}
            learning={growthScore}
            home={65}
            adventure={70}
            spirituality={55}
          />
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <MetricCard label="Total Events" value={events.length} />
          <MetricCard label="Active Goals" value={activeGoals.length} />
          <MetricCard label="Open Loops" value={activeLoops.length} />
          <MetricCard label="Completed" value={events.filter(e => !e.is_planned).length} />
        </div>
      </div>
    </AppShell>
  )
}

export default Dashboard
