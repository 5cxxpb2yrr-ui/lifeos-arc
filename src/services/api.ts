import { supabase } from '@/lib/supabase/client'
import type { Event, Person, Asset, Stream, OpenLoop, Goal, Decision, Insight } from '@/types'

// Events Service
export const eventsService = {
  async getEvents(userId: string) {
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .eq('user_id', userId)
      .order('start_date', { ascending: false })
    if (error) throw error
    return data as Event[]
  },

  async createEvent(event: Omit<Event, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('events').insert([event]).select()
    if (error) throw error
    return data[0] as Event
  },

  async updateEvent(id: string, updates: Partial<Event>) {
    const { data, error } = await supabase
      .from('events')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0] as Event
  },

  async deleteEvent(id: string) {
    const { error } = await supabase.from('events').delete().eq('id', id)
    if (error) throw error
  },
}

// People Service
export const peopleService = {
  async getPeople(userId: string) {
    const { data, error } = await supabase
      .from('people')
      .select('*')
      .eq('user_id', userId)
      .order('last_contact', { ascending: false })
    if (error) throw error
    return data as Person[]
  },

  async createPerson(person: Omit<Person, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('people').insert([person]).select()
    if (error) throw error
    return data[0] as Person
  },

  async updatePerson(id: string, updates: Partial<Person>) {
    const { data, error } = await supabase
      .from('people')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0] as Person
  },

  async deletePerson(id: string) {
    const { error } = await supabase.from('people').delete().eq('id', id)
    if (error) throw error
  },
}

// Assets Service
export const assetsService = {
  async getAssets(userId: string) {
    const { data, error } = await supabase
      .from('assets')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Asset[]
  },

  async createAsset(asset: Omit<Asset, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('assets').insert([asset]).select()
    if (error) throw error
    return data[0] as Asset
  },

  async updateAsset(id: string, updates: Partial<Asset>) {
    const { data, error } = await supabase
      .from('assets')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0] as Asset
  },

  async deleteAsset(id: string) {
    const { error } = await supabase.from('assets').delete().eq('id', id)
    if (error) throw error
  },
}

// Open Loops Service
export const openLoopsService = {
  async getOpenLoops(userId: string) {
    const { data, error } = await supabase
      .from('open_loops')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as OpenLoop[]
  },

  async createOpenLoop(loop: Omit<OpenLoop, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('open_loops').insert([loop]).select()
    if (error) throw error
    return data[0] as OpenLoop
  },

  async updateOpenLoop(id: string, updates: Partial<OpenLoop>) {
    const { data, error } = await supabase
      .from('open_loops')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0] as OpenLoop
  },

  async deleteOpenLoop(id: string) {
    const { error } = await supabase.from('open_loops').delete().eq('id', id)
    if (error) throw error
  },
}

// Goals Service
export const goalsService = {
  async getGoals(userId: string) {
    const { data, error } = await supabase
      .from('goals')
      .select('*')
      .eq('user_id', userId)
      .order('target_date', { ascending: true })
    if (error) throw error
    return data as Goal[]
  },

  async createGoal(goal: Omit<Goal, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('goals').insert([goal]).select()
    if (error) throw error
    return data[0] as Goal
  },

  async updateGoal(id: string, updates: Partial<Goal>) {
    const { data, error } = await supabase
      .from('goals')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0] as Goal
  },

  async deleteGoal(id: string) {
    const { error } = await supabase.from('goals').delete().eq('id', id)
    if (error) throw error
  },
}

// Decisions Service
export const decisionsService = {
  async getDecisions(userId: string) {
    const { data, error } = await supabase
      .from('decisions')
      .select('*')
      .eq('user_id', userId)
      .order('review_date', { ascending: true })
    if (error) throw error
    return data as Decision[]
  },

  async createDecision(decision: Omit<Decision, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('decisions').insert([decision]).select()
    if (error) throw error
    return data[0] as Decision
  },

  async updateDecision(id: string, updates: Partial<Decision>) {
    const { data, error } = await supabase
      .from('decisions')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
    if (error) throw error
    return data[0] as Decision
  },

  async deleteDecision(id: string) {
    const { error } = await supabase.from('decisions').delete().eq('id', id)
    if (error) throw error
  },
}

// Insights Service
export const insightsService = {
  async getInsights(userId: string) {
    const { data, error } = await supabase
      .from('insights')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    if (error) throw error
    return data as Insight[]
  },

  async createInsight(insight: Omit<Insight, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase.from('insights').insert([insight]).select()
    if (error) throw error
    return data[0] as Insight
  },
}
