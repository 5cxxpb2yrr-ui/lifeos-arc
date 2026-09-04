import { create } from 'zustand'
import type { Goal } from '@/types'

interface GoalsStore {
  goals: Goal[]
  loading: boolean
  error: string | null
  setGoals: (goals: Goal[]) => void
  addGoal: (goal: Goal) => void
  updateGoal: (goal: Goal) => void
  deleteGoal: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const useGoalsStore = create<GoalsStore>((set) => ({
  goals: [],
  loading: false,
  error: null,
  setGoals: (goals) => set({ goals }),
  addGoal: (goal) =>
    set((state) => ({
      goals: [...state.goals, goal],
    })),
  updateGoal: (goal) =>
    set((state) => ({
      goals: state.goals.map((g) => (g.id === goal.id ? goal : g)),
    })),
  deleteGoal: (id) =>
    set((state) => ({
      goals: state.goals.filter((g) => g.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))