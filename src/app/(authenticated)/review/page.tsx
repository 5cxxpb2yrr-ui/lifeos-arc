'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { WeeklyReviewWizard } from '@/components/wizard'
import { Button, Card, TextArea } from '@/components/ui'
import { useSession } from '@supabase/auth-helpers-react'
import { useEvents, useOpenLoops, usePeople } from '@/hooks/useApi'

const WeeklyReviewPage = () => {
  const session = useSession()
  const userId = session?.user?.id || ''
  const [currentStep, setCurrentStep] = useState(0)
  const [isReviewStarted, setIsReviewStarted] = useState(false)

  const { data: events = [] } = useEvents(userId)
  const { data: openLoops = [] } = useOpenLoops(userId)
  const { data: people = [] } = usePeople(userId)

  const weekStart = new Date()
  weekStart.setDate(weekStart.getDate() - weekStart.getDay())

  const thisWeekEvents = events.filter(e => {
    const eventDate = new Date(e.start_date)
    const weekEnd = new Date(weekStart)
    weekEnd.setDate(weekEnd.getDate() + 7)
    return eventDate >= weekStart && eventDate <= weekEnd
  })

  const handleStepChange = (step: number) => {
    setCurrentStep(step)
  }

  const handleComplete = () => {
    setIsReviewStarted(false)
    setCurrentStep(0)
  }

  if (!isReviewStarted) {
    return (
      <AppShell>
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-white">Weekly Review</h1>
          <Card>
            <div className="text-center space-y-4">
              <p className="text-gray-300">
                Take time to reflect on your week and plan ahead.
              </p>
              <div className="text-sm text-gray-400 space-y-1">
                <p>Week starting: {weekStart.toLocaleDateString()}</p>
                <p>Events this week: {thisWeekEvents.length}</p>
                <p>Active open loops: {openLoops.filter(l => l.status !== 'complete').length}</p>
              </div>
              <Button
                onClick={() => setIsReviewStarted(true)}
                className="w-full"
              >
                Start Weekly Review
              </Button>
            </div>
          </Card>
        </div>
      </AppShell>
    )
  }

  const stepContent = [
    { // Events
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">
            You had {thisWeekEvents.length} events this week.
          </p>
          {thisWeekEvents.slice(0, 5).map(e => (
            <div key={e.id} className="bg-surface p-3 rounded text-sm text-gray-300">
              {e.title}
            </div>
          ))}
          {thisWeekEvents.length > 5 && (
            <p className="text-gray-400 text-sm">...and {thisWeekEvents.length - 5} more</p>
          )}
        </div>
      )
    },
    { // Open Loops
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">
            Active open loops: {openLoops.filter(l => l.status === 'active').length}
          </p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div className="bg-surface p-2 rounded">
              <div className="text-gray-400">Open</div>
              <div className="text-white font-bold">
                {openLoops.filter(l => l.status === 'open').length}
              </div>
            </div>
            <div className="bg-surface p-2 rounded">
              <div className="text-gray-400">Blocked</div>
              <div className="text-white font-bold">
                {openLoops.filter(l => l.status === 'blocked').length}
              </div>
            </div>
          </div>
        </div>
      )
    },
    { // People
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">
            You have {people.length} people in your network.
          </p>
          <div className="space-y-2">
            {people.slice(0, 3).map(p => (
              <div key={p.id} className="bg-surface p-2 rounded text-sm">
                <div className="font-medium text-white">{p.name}</div>
                <div className="text-gray-400 text-xs">
                  Last contact: {p.last_contact ? new Date(p.last_contact).toLocaleDateString() : 'Never'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    { // Assets
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">Review your asset portfolio and allocations.</p>
          <div className="bg-surface p-4 rounded text-center text-gray-400">
            Assets data coming soon
          </div>
        </div>
      )
    },
    { // Streams
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">Review your ongoing income and learning streams.</p>
          <div className="bg-surface p-4 rounded text-center text-gray-400">
            Streams data coming soon
          </div>
        </div>
      )
    },
    { // Decisions
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">Review decisions made and their outcomes.</p>
          <div className="bg-surface p-4 rounded text-center text-gray-400">
            Decisions to review coming soon
          </div>
        </div>
      )
    },
    { // Insights
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">Key insights from your week:</p>
          <TextArea
            placeholder="Write your insights and lessons learned..."
            rows={4}
            className="focus:border-primary"
          />
        </div>
      )
    },
    { // Planning
      content: (
        <div className="space-y-3">
          <p className="text-gray-400">Plan for the week ahead:</p>
          <TextArea
            placeholder="What are your commitments and goals for next week?"
            rows={4}
            className="focus:border-primary"
          />
        </div>
      )
    },
  ]

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <WeeklyReviewWizard
          currentStep={currentStep}
          onStepChange={handleStepChange}
          onComplete={handleComplete}
        >
          {stepContent[currentStep].content}
        </WeeklyReviewWizard>
      </div>
    </AppShell>
  )
}

export default WeeklyReviewPage
