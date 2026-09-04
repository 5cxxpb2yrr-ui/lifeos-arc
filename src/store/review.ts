import { create } from 'zustand'

interface ReviewStore {
  currentStep: number
  weekStartDate: Date
  weekSummary: string
  topWins: string[]
  risks: string[]
  nextWeekCommitments: string[]
  setCurrentStep: (step: number) => void
  setWeekStartDate: (date: Date) => void
  setWeekSummary: (summary: string) => void
  setTopWins: (wins: string[]) => void
  setRisks: (risks: string[]) => void
  setNextWeekCommitments: (commitments: string[]) => void
  reset: () => void
}

const initialState = {
  currentStep: 0,
  weekStartDate: new Date(),
  weekSummary: '',
  topWins: [],
  risks: [],
  nextWeekCommitments: [],
}

export const useReviewStore = create<ReviewStore>((set) => ({
  ...initialState,
  setCurrentStep: (step) => set({ currentStep: step }),
  setWeekStartDate: (date) => set({ weekStartDate: date }),
  setWeekSummary: (summary) => set({ weekSummary: summary }),
  setTopWins: (wins) => set({ topWins: wins }),
  setRisks: (risks) => set({ risks }),
  setNextWeekCommitments: (commitments) =>
    set({ nextWeekCommitments: commitments }),
  reset: () => set(initialState),
}))