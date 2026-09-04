import { supabase } from '@/lib/supabase/client'
import type {
  Event,
  Person,
  Asset,
  Stream,
  OpenLoop,
  Goal,
  Decision,
  Insight,
} from '@/types'

// Sample data for seeding
const sampleEvents: Omit<Event, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    user_id: '',
    title: 'Morning Workout',
    description: 'Upper body strength training',
    event_type: 'workout',
    start_date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: null,
    location: 'Home gym',
    notes: 'Completed 8 exercises',
    is_planned: false,
  },
  {
    user_id: '',
    title: 'Team Standup',
    description: 'Daily team sync',
    event_type: 'meeting',
    start_date: new Date().toISOString(),
    end_date: null,
    location: 'Zoom',
    notes: null,
    is_planned: true,
  },
  {
    user_id: '',
    title: 'Grocery Shopping',
    description: 'Weekly groceries',
    event_type: 'purchase',
    start_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: null,
    location: 'Whole Foods',
    notes: 'Spent $120',
    is_planned: false,
  },
  {
    user_id: '',
    title: 'React Course Module 3',
    description: 'Learning advanced React patterns',
    event_type: 'learning',
    start_date: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: null,
    location: null,
    notes: null,
    is_planned: true,
  },
  {
    user_id: '',
    title: 'Coffee with Sarah',
    description: 'Catch up on life updates',
    event_type: 'conversation',
    start_date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    end_date: null,
    location: 'Cafe Downtown',
    notes: null,
    is_planned: true,
  },
]

const samplePeople: Omit<Person, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    user_id: '',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    phone: '+1-555-0101',
    relationship_type: 'friend',
    relationship_score: 85,
    last_contact: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    contact_frequency: 2,
    notes: 'College friend, loves hiking',
  },
  {
    user_id: '',
    name: 'John Smith',
    email: 'john@example.com',
    phone: '+1-555-0102',
    relationship_type: 'colleague',
    relationship_score: 70,
    last_contact: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    contact_frequency: 5,
    notes: 'Work mentor, provides tech guidance',
  },
  {
    user_id: '',
    name: 'Mom',
    email: 'mom@example.com',
    phone: '+1-555-0103',
    relationship_type: 'family',
    relationship_score: 95,
    last_contact: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    contact_frequency: 7,
    notes: 'Weekly calls every Sunday',
  },
]

const sampleAssets: Omit<Asset, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    user_id: '',
    name: 'Savings Account',
    asset_type: 'cash',
    value: 15000,
    currency: 'USD',
    purchase_date: null,
    notes: 'Emergency fund',
  },
  {
    user_id: '',
    name: 'Investment Portfolio',
    asset_type: 'investment',
    value: 45000,
    currency: 'USD',
    purchase_date: null,
    notes: 'Mix of index funds and stocks',
  },
  {
    user_id: '',
    name: 'Tesla Model 3',
    asset_type: 'vehicle',
    value: 35000,
    currency: 'USD',
    purchase_date: '2021-06-15',
    notes: 'Electric vehicle',
  },
]

const sampleOpenLoops: Omit<OpenLoop, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    user_id: '',
    title: 'Finish project proposal',
    loop_type: 'task',
    status: 'active',
    priority: 'high',
    due_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
  },
  {
    user_id: '',
    title: 'Review AWS documentation',
    loop_type: 'task',
    status: 'open',
    priority: 'medium',
    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
  },
  {
    user_id: '',
    title: 'Call dentist for appointment',
    loop_type: 'task',
    status: 'waiting',
    priority: 'low',
    due_date: null,
    notes: null,
  },
  {
    user_id: '',
    title: 'How to improve team productivity?',
    loop_type: 'question',
    status: 'open',
    priority: 'medium',
    due_date: null,
    notes: null,
  },
]

const sampleGoals: Omit<Goal, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    user_id: '',
    title: 'Improve fitness',
    description: 'Exercise 4x per week, reach 15% body fat',
    goal_type: 'annual',
    parent_goal_id: null,
    status: 'active',
    progress: 35,
    target_date: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
  },
  {
    user_id: '',
    title: 'Learn TypeScript deeply',
    description: 'Master advanced types and patterns',
    goal_type: 'quarterly',
    parent_goal_id: null,
    status: 'active',
    progress: 60,
    target_date: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
  },
  {
    user_id: '',
    title: 'Complete side project',
    description: 'Build and ship personal SaaS',
    goal_type: 'annual',
    parent_goal_id: null,
    status: 'active',
    progress: 25,
    target_date: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    notes: null,
  },
]

const sampleDecisions: Omit<Decision, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    user_id: '',
    title: 'Switch to new project',
    context: 'Current project losing momentum',
    expected_outcome: 'Higher engagement and better outcomes',
    confidence_level: 75,
    risk_level: 30,
    review_date: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    actual_outcome: null,
    lessons_learned: null,
  },
  {
    user_id: '',
    title: 'Hire freelancer',
    context: 'Too much work, need extra hands',
    expected_outcome: 'Reduce workload by 30%',
    confidence_level: 80,
    risk_level: 20,
    review_date: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    actual_outcome: null,
    lessons_learned: null,
  },
]

const sampleInsights: Omit<Insight, 'id' | 'created_at' | 'updated_at'>[] = [
  {
    user_id: '',
    title: 'Consistent workout habit',
    description: 'You have maintained a 4-day weekly workout routine for 8 weeks',
    insight_type: 'achievement',
    data: { streak_days: 56, frequency: 4 },
  },
  {
    user_id: '',
    title: 'Relationship follow-up needed',
    description: 'No contact with John for 21 days. Consider reaching out.',
    insight_type: 'recommendation',
    data: { person: 'John Smith', days_since: 21 },
  },
  {
    user_id: '',
    title: 'High open loop count',
    description: 'You have 8 active open loops. Consider completing or delegating.',
    insight_type: 'warning',
    data: { count: 8, previous_count: 5 },
  },
]

export async function seedDatabase(userId: string) {
  try {
    console.log('Starting database seed...')

    // Seed events
    const eventsWithUserId = sampleEvents.map(e => ({ ...e, user_id: userId }))
    const { error: eventsError } = await supabase
      .from('events')
      .insert(eventsWithUserId)
    if (eventsError) throw eventsError
    console.log('✓ Events seeded')

    // Seed people
    const peopleWithUserId = samplePeople.map(p => ({ ...p, user_id: userId }))
    const { error: peopleError } = await supabase
      .from('people')
      .insert(peopleWithUserId)
    if (peopleError) throw peopleError
    console.log('✓ People seeded')

    // Seed assets
    const assetsWithUserId = sampleAssets.map(a => ({ ...a, user_id: userId }))
    const { error: assetsError } = await supabase
      .from('assets')
      .insert(assetsWithUserId)
    if (assetsError) throw assetsError
    console.log('✓ Assets seeded')

    // Seed open loops
    const loopsWithUserId = sampleOpenLoops.map(l => ({ ...l, user_id: userId }))
    const { error: loopsError } = await supabase
      .from('open_loops')
      .insert(loopsWithUserId)
    if (loopsError) throw loopsError
    console.log('✓ Open loops seeded')

    // Seed goals
    const goalsWithUserId = sampleGoals.map(g => ({ ...g, user_id: userId }))
    const { error: goalsError } = await supabase
      .from('goals')
      .insert(goalsWithUserId)
    if (goalsError) throw goalsError
    console.log('✓ Goals seeded')

    // Seed decisions
    const decisionsWithUserId = sampleDecisions.map(d => ({ ...d, user_id: userId }))
    const { error: decisionsError } = await supabase
      .from('decisions')
      .insert(decisionsWithUserId)
    if (decisionsError) throw decisionsError
    console.log('✓ Decisions seeded')

    // Seed insights
    const insightsWithUserId = sampleInsights.map(i => ({ ...i, user_id: userId }))
    const { error: insightsError } = await supabase
      .from('insights')
      .insert(insightsWithUserId)
    if (insightsError) throw insightsError
    console.log('✓ Insights seeded')

    console.log('Database seeding completed successfully!')
  } catch (error) {
    console.error('Error seeding database:', error)
    throw error
  }
}
