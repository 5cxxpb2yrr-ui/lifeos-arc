import { create } from 'zustand'
import type { Person } from '@/types'

interface PeopleStore {
  people: Person[]
  loading: boolean
  error: string | null
  setPeople: (people: Person[]) => void
  addPerson: (person: Person) => void
  updatePerson: (person: Person) => void
  deletePerson: (id: string) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

export const usePeopleStore = create<PeopleStore>((set) => ({
  people: [],
  loading: false,
  error: null,
  setPeople: (people) => set({ people }),
  addPerson: (person) =>
    set((state) => ({
      people: [...state.people, person],
    })),
  updatePerson: (person) =>
    set((state) => ({
      people: state.people.map((p) => (p.id === person.id ? person : p)),
    })),
  deletePerson: (id) =>
    set((state) => ({
      people: state.people.filter((p) => p.id !== id),
    })),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}))