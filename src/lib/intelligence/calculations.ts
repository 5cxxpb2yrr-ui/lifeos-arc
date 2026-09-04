// Life Score Calculation
export const calculateLifeScore = (metrics: {
  health: number
  relationships: number
  finance: number
  growth: number
  execution: number
}): number => {
  return Math.round(
    (metrics.health +
      metrics.relationships +
      metrics.finance +
      metrics.growth +
      metrics.execution) /
      5
  )
}

// Relationship Score
export const calculateRelationshipScore = (params: {
  daysSinceContact: number
  interactionFrequency: number
  sharedEvents: number
}): number => {
  const recencyScore = Math.max(0, 100 - params.daysSinceContact * 2)
  const frequencyScore = Math.min(100, params.interactionFrequency * 10)
  const eventScore = Math.min(100, params.sharedEvents * 20)

  return Math.round((recencyScore + frequencyScore + eventScore) / 3)
}

// Health Score
export const calculateHealthScore = (params: {
  workoutsPerWeek: number
  sleepHours: number
  stressLevel: number
}): number => {
  const workoutScore = Math.min(100, params.workoutsPerWeek * 20)
  const sleepScore = params.sleepHours >= 7 ? 100 : params.sleepHours * 14.3
  const stressScore = 100 - params.stressLevel * 10

  return Math.round((workoutScore + sleepScore + stressScore) / 3)
}

// Finance Score
export const calculateFinanceScore = (params: {
  netWorth: number
  monthlyIncome: number
  monthlyExpenses: number
  savingsRate: number
}): number => {
  const wealthScore = Math.min(100, (params.netWorth / 100000) * 100)
  const incomeScore = Math.min(100, (params.monthlyIncome / 10000) * 100)
  const savingsScore = Math.min(100, params.savingsRate * 100)
  const healthScore =
    params.monthlyIncome > params.monthlyExpenses ? 100 : 0

  return Math.round(
    (wealthScore + incomeScore + savingsScore + healthScore) / 4
  )
}

// Growth Score
export const calculateGrowthScore = (params: {
  learningHours: number
  skillsLearned: number
  certificationsEarned: number
}): number => {
  const learningScore = Math.min(100, params.learningHours * 5)
  const skillScore = Math.min(100, params.skillsLearned * 10)
  const certScore = Math.min(100, params.certificationsEarned * 20)

  return Math.round((learningScore + skillScore + certScore) / 3)
}

// Execution Score
export const calculateExecutionScore = (params: {
  openLoops: number
  completedTasks: number
  overdueTasks: number
}): number => {
  const completionRate =
    params.completedTasks /
    (params.completedTasks + params.openLoops + 1)
  const overdueScore = Math.max(0, 100 - params.overdueTasks * 5)
  const completionScore = Math.min(100, completionRate * 100)

  return Math.round((completionScore + overdueScore) / 2)
}

// Burnout Risk Detection
export const calculateBurnoutRisk = (params: {
  openLoops: number
  averageSleep: number
  stressLevel: number
}): number => {
  const loopsRisk = Math.min(100, params.openLoops * 5)
  const sleepRisk = params.averageSleep < 6 ? 100 : 0
  const stressRisk = params.stressLevel * 20

  return Math.round((loopsRisk + sleepRisk + stressRisk) / 3)
}

// Goal Forecasting
export const forecastGoalCompletion = (params: {
  currentProgress: number
  targetDate: Date
  velocity: number
}): number => {
  const now = new Date()
  const daysRemaining =
    (params.targetDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
  const projectedProgress = params.currentProgress + params.velocity * daysRemaining

  return Math.min(100, Math.max(0, Math.round(projectedProgress)))
}
