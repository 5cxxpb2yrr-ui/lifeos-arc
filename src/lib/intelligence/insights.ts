import type { Event, OpenLoop, Person, Asset } from '@/types'

export interface GeneratedInsight {
  id: string
  title: string
  description: string
  type: 'warning' | 'achievement' | 'pattern' | 'recommendation'
  severity: 'low' | 'medium' | 'high'
}

export const generateInsights = (data: {
  events: Event[]
  openLoops: OpenLoop[]
  people: Person[]
  assets: Asset[]
}): GeneratedInsight[] => {
  const insights: GeneratedInsight[] = []

  // Check for no contact with people
  data.people.forEach((person) => {
    if (person.last_contact) {
      const lastContact = new Date(person.last_contact)
      const daysSince = Math.floor(
        (Date.now() - lastContact.getTime()) / (1000 * 60 * 60 * 24)
      )

      if (daysSince > 21) {
        insights.push({
          id: `insight-no-contact-${person.id}`,
          title: `No contact with ${person.name} for ${daysSince} days`,
          description: `You haven't had contact with ${person.name} in ${daysSince} days. Consider reaching out.`,
          type: 'recommendation',
          severity: daysSince > 60 ? 'high' : 'medium',
        })
      }
    }
  })

  // Check for open loops trend
  if (data.openLoops.length > 15) {
    insights.push({
      id: 'insight-high-open-loops',
      title: 'High number of open loops',
      description: `You have ${data.openLoops.length} open loops. Consider completing or delegating some items.`,
      type: 'warning',
      severity: 'high',
    })
  }

  // Check for completed tasks
  const completedThisWeek = data.events.filter((event) => {
    const eventDate = new Date(event.created_at)
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    return eventDate > weekAgo
  }).length

  if (completedThisWeek > 20) {
    insights.push({
      id: 'insight-high-velocity',
      title: 'High execution velocity this week',
      description: `You've completed ${completedThisWeek} events this week. Great momentum!`,
      type: 'achievement',
      severity: 'low',
    })
  }

  // Net worth tracking
  const totalAssets = data.assets.reduce((sum, asset) => sum + asset.value, 0)
  if (totalAssets > 100000) {
    insights.push({
      id: 'insight-net-worth-milestone',
      title: 'Net worth milestone reached',
      description: `Your total asset value is $${totalAssets.toLocaleString()}. Congratulations!`,
      type: 'achievement',
      severity: 'low',
    })
  }

  return insights
}
