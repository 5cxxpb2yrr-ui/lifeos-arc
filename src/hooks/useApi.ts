import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
// Change relative import target to project global layout paths
import { api } from "@/services"; 

// Events Hooks
export const useEvents = (userId: string) => {
  return useQuery({
    queryKey: ['events', userId],
    queryFn: () => api.eventsService.getEvents(userId),
    enabled: !!userId,
  })
}

export const useCreateEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.eventsService.createEvent,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export const useUpdateEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      api.eventsService.updateEvent(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

export const useDeleteEvent = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.eventsService.deleteEvent,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['events'] })
    },
  })
}

// People Hooks
export const usePeople = (userId: string) => {
  return useQuery({
    queryKey: ['people', userId],
    queryFn: () => api.peopleService.getPeople(userId),
    enabled: !!userId,
  })
}

export const useCreatePerson = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.peopleService.createPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['people'] })
    },
  })
}

// Goals Hooks
export const useGoals = (userId: string) => {
  return useQuery({
    queryKey: ['goals', userId],
    queryFn: () => api.goalsService.getGoals(userId),
    enabled: !!userId,
  })
}

export const useCreateGoal = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.goalsService.createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['goals'] })
    },
  })
}

// Open Loops Hooks
export const useOpenLoops = (userId: string) => {
  return useQuery({
    queryKey: ['openLoops', userId],
    queryFn: () => api.openLoopsService.getOpenLoops(userId),
    enabled: !!userId,
  })
}

export const useCreateOpenLoop = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.openLoopsService.createOpenLoop,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openLoops'] })
    },
  })
}

export const useUpdateOpenLoop = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: any }) =>
      api.openLoopsService.updateOpenLoop(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['openLoops'] })
    },
  })
}

// Decisions Hooks
export const useDecisions = (userId: string) => {
  return useQuery({
    queryKey: ['decisions', userId],
    queryFn: () => api.decisionsService.getDecisions(userId),
    enabled: !!userId,
  })
}

export const useCreateDecision = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.decisionsService.createDecision,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['decisions'] })
    },
  })
}

// Insights Hooks
export const useInsights = (userId: string) => {
  return useQuery({
    queryKey: ['insights', userId],
    queryFn: () => api.insightsService.getInsights(userId),
    enabled: !!userId,
  })
}

export const useCreateInsight = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: api.insightsService.createInsight,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['insights'] })
    },
  })
}
