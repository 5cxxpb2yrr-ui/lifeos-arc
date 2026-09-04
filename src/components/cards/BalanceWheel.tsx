import React from 'react'
import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer } from 'recharts'
import Card from '../ui/Card'

export interface LifeBalanceWheelProps {
  health: number
  family: number
  relationships: number
  career: number
  finance: number
  learning: number
  home: number
  adventure: number
  spirituality: number
}

const BalanceWheel: React.FC<LifeBalanceWheelProps> = ({
  health,
  family,
  relationships,
  career,
  finance,
  learning,
  home,
  adventure,
  spirituality,
}) => {
  const data = [
    { subject: 'Health', value: health },
    { subject: 'Family', value: family },
    { subject: 'Relationships', value: relationships },
    { subject: 'Career', value: career },
    { subject: 'Finance', value: finance },
    { subject: 'Learning', value: learning },
    { subject: 'Home', value: home },
    { subject: 'Adventure', value: adventure },
    { subject: 'Spirituality', value: spirituality },
  ]

  return (
    <Card>
      <h3 className="font-semibold text-white mb-4">Life Balance Wheel</h3>
      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={data}>
          <PolarGrid stroke="#374151" />
          <PolarAngleAxis dataKey="subject" stroke="#9CA3AF" />
          <PolarRadiusAxis stroke="#9CA3AF" />
          <Radar
            name="Score"
            dataKey="value"
            stroke="#3B82F6"
            fill="#3B82F6"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default BalanceWheel
