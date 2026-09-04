'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { Button, Card, Input } from '@/components/ui'
import { useSession } from '@supabase/auth-helpers-react'
import { useCreateAsset } from '@/hooks/useApi'
import { Plus, TrendingUp } from 'lucide-react'

const AssetsPage = () => {
  const session = useSession()
  const userId = session?.user?.id || ''
  const [isCreating, setIsCreating] = useState(false)

  const createMutation = useCreateAsset()

  const [formData, setFormData] = useState({
    name: '',
    asset_type: 'cash' as const,
    value: 0,
    currency: 'USD',
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync({
        ...formData,
        user_id: userId,
        purchase_date: null,
        notes: null,
      })
      setFormData({
        name: '',
        asset_type: 'cash',
        value: 0,
        currency: 'USD',
      })
      setIsCreating(false)
    } catch (error) {
      console.error('Failed to create asset:', error)
    }
  }

  const assetTypes = [
    { value: 'cash', label: 'Cash' },
    { value: 'investment', label: 'Investment' },
    { value: 'property', label: 'Property' },
    { value: 'vehicle', label: 'Vehicle' },
    { value: 'skill', label: 'Skill' },
    { value: 'certification', label: 'Certification' },
  ]

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">Assets Portfolio</h1>
          <Button onClick={() => setIsCreating(!isCreating)}>
            <Plus size={20} />
            Add Asset
          </Button>
        </div>

        {isCreating && (
          <Card>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                placeholder="Asset name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <select
                className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white"
                value={formData.asset_type}
                onChange={(e) => setFormData({ ...formData, asset_type: e.target.value as any })}
              >
                {assetTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              <Input
                type="number"
                placeholder="Value"
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: parseFloat(e.target.value) })}
                required
              />
              <select
                className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
              <div className="flex gap-2">
                <Button type="submit" isLoading={createMutation.isPending}>
                  Add Asset
                </Button>
                <Button variant="secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Coming Soon */}
        <Card>
          <div className="text-center py-8 text-gray-400">
            <TrendingUp className="mx-auto mb-3" size={48} />
            <p className="text-lg">Portfolio Analytics</p>
            <p className="text-sm mt-2">Asset allocation charts and net worth tracking coming soon</p>
          </div>
        </Card>
      </div>
    </AppShell>
  )
}

export default AssetsPage
