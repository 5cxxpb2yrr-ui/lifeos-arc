export type Event = {
  id: string
  user_id: string
  title: string
  description: string | null
  event_type: 'workout' | 'meeting' | 'purchase' | 'conversation' | 'doctor_visit' | 'learning' | 'vacation' | 'maintenance' | 'other'
  start_date: string
  end_date: string | null
  location: string | null
  notes: string | null
  is_planned: boolean
  created_at: string
  updated_at: string
}

export type Person = {
  id: string
  user_id: string
  name: string
  email: string | null
  phone: string | null
  relationship_type: string
  relationship_score: number
  last_contact: string | null
  contact_frequency: number
  notes: string | null
  created_at: string
  updated_at: string
}

export type Asset = {
  id: string
  user_id: string
  name: string
  asset_type: 'cash' | 'investment' | 'property' | 'vehicle' | 'skill' | 'certification'
  value: number
  currency: string
  purchase_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type Stream = {
  id: string
  user_id: string
  name: string
  stream_type: 'income' | 'learning' | 'fitness' | 'relationship' | 'project'
  status: 'active' | 'paused' | 'completed'
  progress: number
  frequency: string
  notes: string | null
  created_at: string
  updated_at: string
}

export type OpenLoop = {
  id: string
  user_id: string
  title: string
  loop_type: 'task' | 'question' | 'risk' | 'follow_up'
  status: 'open' | 'active' | 'waiting' | 'blocked' | 'complete'
  priority: 'low' | 'medium' | 'high' | 'critical'
  due_date: string | null
  notes: string | null
  created_at: string
  updated_at: string
}

export type Goal = {
  id: string
  user_id: string
  title: string
  description: string | null
  goal_type: 'annual' | 'quarterly' | 'monthly' | 'weekly'
  parent_goal_id: string | null
  status: 'active' | 'completed' | 'archived'
  progress: number
  target_date: string
  notes: string | null
  created_at: string
  updated_at: string
}

export type Decision = {
  id: string
  user_id: string
  title: string
  context: string | null
  expected_outcome: string | null
  confidence_level: number
  risk_level: number
  review_date: string
  actual_outcome: string | null
  lessons_learned: string | null
  created_at: string
  updated_at: string
}

export type Insight = {
  id: string
  user_id: string
  title: string
  description: string
  insight_type: 'pattern' | 'warning' | 'achievement' | 'recommendation'
  data: Record<string, any> | null
  created_at: string
  updated_at: string
}

export type User = {
  id: string
  email: string
  created_at: string
  updated_at: string
}
