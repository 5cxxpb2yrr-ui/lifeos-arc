import React from 'react'
import Button from '../ui/Button'
import Card from '../ui/Card'

export interface WeeklyReviewWizardStep {
  id: string
  title: string
  description: string
  icon: string
}

const steps: WeeklyReviewWizardStep[] = [
  { id: '1', title: 'Events', description: 'Review this week\'s events', icon: '📅' },
  { id: '2', title: 'Open Loops', description: 'Assess your open items', icon: '🔄' },
  { id: '3', title: 'People', description: 'Check relationships', icon: '👥' },
  { id: '4', title: 'Assets', description: 'Review your portfolio', icon: '💰' },
  { id: '5', title: 'Streams', description: 'Check ongoing flows', icon: '🌊' },
  { id: '6', title: 'Decisions', description: 'Review decisions', icon: '⚖️' },
  { id: '7', title: 'Insights', description: 'Extract lessons', icon: '💡' },
  { id: '8', title: 'Planning', description: 'Plan next week', icon: '📋' },
]

export interface WeeklyReviewWizardProps {
  currentStep: number
  onStepChange: (step: number) => void
  onComplete: () => void
  children?: React.ReactNode
}

const WeeklyReviewWizard: React.FC<WeeklyReviewWizardProps> = ({
  currentStep,
  onStepChange,
  onComplete,
  children,
}) => {
  const step = steps[currentStep]
  const isLastStep = currentStep === steps.length - 1

  return (
    <div className="space-y-6">
      {/* Step Indicator */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => onStepChange(idx)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg font-medium transition-colors ${
              idx === currentStep
                ? 'bg-primary text-white'
                : idx < currentStep
                ? 'bg-success text-white'
                : 'bg-surface text-gray-400 hover:bg-panel'
            }`}
          >
            <span className="mr-2">{s.icon}</span>
            {s.title}
          </button>
        ))}
      </div>

      {/* Content */}
      <Card>
        <div className="text-center mb-6">
          <div className="text-4xl mb-3">{step.icon}</div>
          <h2 className="text-2xl font-bold text-white mb-2">{step.title}</h2>
          <p className="text-gray-400">{step.description}</p>
        </div>

        {children && <div className="mb-6">{children}</div>}

        {/* Navigation */}
        <div className="flex gap-4 justify-between">
          <Button
            variant="secondary"
            onClick={() => onStepChange(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
          >
            Previous
          </Button>

          <div className="text-center text-gray-400 text-sm">
            Step {currentStep + 1} of {steps.length}
          </div>

          <Button
            onClick={
              isLastStep ? onComplete : () => onStepChange(currentStep + 1)
            }
          >
            {isLastStep ? 'Complete Review' : 'Next'}
          </Button>
        </div>
      </Card>
    </div>
  )
}

export default WeeklyReviewWizard
