import { create } from 'zustand'

interface DashboardStore {
  lifeScore: number
  healthScore: number
  relationshipScore: number
  financeScore: number
  growthScore: number
  executionScore: number
  burnoutRisk: number
  updateScores: (scores: Partial<DashboardStore>) => void
}

export const useDashboardStore = create<DashboardStore>((set) => ({
  lifeScore: 0,
  healthScore: 0,
  relationshipScore: 0,
  financeScore: 0,
  growthScore: 0,
  executionScore: 0,
  burnoutRisk: 0,
  updateScores: (scores) => set(scores),
}))