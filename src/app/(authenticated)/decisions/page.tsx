'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { Button, Card, Input, TextArea } from '@/components/ui'
import { useSession } from '@supabase/auth-helpers-react'
import { useDecisions, useCreateDecision, useUpdateDecision } from '@/hooks/useApi'
import { Plus, CheckCircle } from 'lucide-react'
import type { Decision } from '@/types'

const DecisionsPage = () => {
  const session = useSession()
  const userId = session?.user?.id || ''
  const [isCreating, setIsCreating] = useState(false)
  const [selectedDecision, setSelectedDecision] = useState<Decision | null>(null)

  const { data: decisions = [] } = useDecisions(userId)
  const createMutation = useCreateDecision()
  const updateMutation = useUpdateDecision()

  const [formData, setFormData] = useState({
    title: '',
    context: '',
    expected_outcome: '',
    confidence_level: 50,
    risk_level: 25,
    review_date: '',
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync({
        ...formData,
        user_id: userId,
        actual_outcome: null,
        lessons_learned: null,
      })
      setFormData({
        title: '',
        context: '',
        expected_outcome: '',
        confidence_level: 50,
        risk_level: 25,
        review_date: '',
      })
      setIsCreating(false)
    } catch (error) {
      console.error('Failed to create decision:', error)
    }
  }

  const handleReview = async (decision: Decision) => {
    setSelectedDecision(decision)
  }

  const confidenceColor = (level: number) => {
    if (level >= 75) return 'text-success'
    if (level >= 50) return 'text-warning'
    return 'text-danger'
  }

  const riskColor = (level: number) => {
    if (level >= 75) return 'text-danger'
    if (level >= 50) return 'text-warning'
    return 'text-success'
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Decision Journal</h1>
          <Button onClick={() => setIsCreating(!isCreating)}>
            <Plus size={20} />
            New Decision
          </Button>
        </div>

        {isCreating && (
          <Card>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                placeholder="Decision title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <TextArea
                placeholder="Context and background"
                value={formData.context}
                onChange={(e) => setFormData({ ...formData, context: e.target.value })}
                rows={3}
              />
              <TextArea
                placeholder="Expected outcome"
                value={formData.expected_outcome}
                onChange={(e) => setFormData({ ...formData, expected_outcome: e.target.value })}
                rows={2}
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Confidence: {formData.confidence_level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.confidence_level}
                    onChange={(e) => setFormData({ ...formData, confidence_level: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Risk: {formData.risk_level}%
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={formData.risk_level}
                    onChange={(e) => setFormData({ ...formData, risk_level: parseInt(e.target.value) })}
                    className="w-full"
                  />
                </div>
              </div>
              <Input
                type="date"
                label="Review Date"
                value={formData.review_date}
                onChange={(e) => setFormData({ ...formData, review_date: e.target.value })}
                required
              />
              <div className="flex gap-2">
                <Button type="submit" isLoading={createMutation.isPending}>
                  Create Decision
                </Button>
                <Button variant="secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Decisions List */}
        <div className="space-y-4">
          {decisions.length === 0 ? (
            <p className="text-gray-400">No decisions yet. Create one to start tracking!</p>
          ) : (
            decisions.map(decision => (
              <Card key={decision.id}>
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-white flex-1">{decision.title}</h3>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleReview(decision)}
                  >
                    <CheckCircle size={16} />
                    Review
                  </Button>
                </div>
                {decision.context && (
                  <p className="text-sm text-gray-400 mb-3">{decision.context}</p>
                )}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Confidence</span>
                    <p className={`font-semibold ${confidenceColor(decision.confidence_level)}`}>
                      {decision.confidence_level}%
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Risk</span>
                    <p className={`font-semibold ${riskColor(decision.risk_level)}`}>
                      {decision.risk_level}%
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-400">Review Date</span>
                    <p className="font-semibold text-white">
                      {new Date(decision.review_date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      </div>
    </AppShell>
  )
}

export default DecisionsPage
