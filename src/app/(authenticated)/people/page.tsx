'use client'

import React, { useState } from 'react'
import { AppShell } from '@/components/layout'
import { Button, Card, Input } from '@/components/ui'
import { useSession } from '@supabase/auth-helpers-react'
import { usePeople, useCreatePerson, useUpdatePerson } from '@/hooks/useApi'
import { Plus, Users } from 'lucide-react'
import type { Person } from '@/types'

const PeoplePage = () => {
  const session = useSession()
  const userId = session?.user?.id || ''
  const [isCreating, setIsCreating] = useState(false)
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const { data: people = [] } = usePeople(userId)
  const createMutation = useCreatePerson()
  const updateMutation = useUpdatePerson()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    relationship_type: '',
  })

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createMutation.mutateAsync({
        ...formData,
        user_id: userId,
        relationship_score: 50,
        last_contact: null,
        contact_frequency: 0,
        notes: null,
      })
      setFormData({
        name: '',
        email: '',
        phone: '',
        relationship_type: '',
      })
      setIsCreating(false)
    } catch (error) {
      console.error('Failed to create person:', error)
    }
  }

  const sortedPeople = [...people].sort(
    (a, b) => (b.relationship_score || 0) - (a.relationship_score || 0)
  )

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-white">People CRM</h1>
          <Button onClick={() => setIsCreating(!isCreating)}>
            <Plus size={20} />
            Add Person
          </Button>
        </div>

        {isCreating && (
          <Card>
            <form onSubmit={handleCreate} className="space-y-4">
              <Input
                placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Input
                placeholder="Phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
              <select
                className="w-full bg-surface border border-gray-700 rounded-lg px-4 py-2 text-white"
                value={formData.relationship_type}
                onChange={(e) => setFormData({ ...formData, relationship_type: e.target.value })}
              >
                <option value="">Select relationship type</option>
                <option value="family">Family</option>
                <option value="friend">Friend</option>
                <option value="colleague">Colleague</option>
                <option value="mentor">Mentor</option>
                <option value="mentee">Mentee</option>
              </select>
              <div className="flex gap-2">
                <Button type="submit" isLoading={createMutation.isPending}>
                  Add Person
                </Button>
                <Button variant="secondary" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Relationship Score Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <div className="text-gray-400 text-sm mb-1">Total People</div>
            <div className="text-2xl font-bold text-white">{people.length}</div>
          </Card>
          <Card>
            <div className="text-gray-400 text-sm mb-1">Avg Score</div>
            <div className="text-2xl font-bold text-white">
              {people.length > 0
                ? Math.round(
                    people.reduce((sum, p) => sum + (p.relationship_score || 0), 0) /
                      people.length
                  )
                : 0}
            </div>
          </Card>
          <Card>
            <div className="text-gray-400 text-sm mb-1">Family</div>
            <div className="text-2xl font-bold text-white">
              {people.filter(p => p.relationship_type === 'family').length}
            </div>
          </Card>
          <Card>
            <div className="text-gray-400 text-sm mb-1">Friends</div>
            <div className="text-2xl font-bold text-white">
              {people.filter(p => p.relationship_type === 'friend').length}
            </div>
          </Card>
        </div>

        {/* People List */}
        <div className="space-y-3">
          {sortedPeople.length === 0 ? (
            <p className="text-gray-400">No people added yet. Start building your network!</p>
          ) : (
            sortedPeople.map(person => (
              <Card
                key={person.id}
                onClick={() => setSelectedPerson(person)}
                className="cursor-pointer hover:bg-gray-600/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white">{person.name}</h3>
                    <div className="text-sm text-gray-400 space-y-1 mt-2">
                      {person.email && <div>📧 {person.email}</div>}
                      {person.phone && <div>📱 {person.phone}</div>}
                      {person.relationship_type && (
                        <div>🔗 {person.relationship_type.charAt(0).toUpperCase() + person.relationship_type.slice(1)}</div>
                      )}
                      {person.last_contact && (
                        <div>
                          Last contact:{' '}
                          {new Date(person.last_contact).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary">
                      {person.relationship_score || 0}
                    </div>
                    <div className="text-xs text-gray-400">Score</div>
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

export default PeoplePage
