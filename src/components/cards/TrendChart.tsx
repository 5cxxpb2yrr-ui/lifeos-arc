import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts'
import Card from '../ui/Card'

export interface TrendChartProps {
  title: string
  data: Array<Record<string, any>>
  dataKey: string
  type?: 'bar' | 'line'
}

const TrendChart: React.FC<TrendChartProps> = ({
  title,
  data,
  dataKey,
  type = 'bar',
}) => {
  return (
    <Card>
      <h3 className="font-semibold text-white mb-4">{title}</h3>
      <ResponsiveContainer width="100%" height={300}>
        {type === 'bar' ? (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              labelStyle={{ color: '#FFF' }}
            />
            <Bar dataKey={dataKey} fill="#3B82F6" />
          </BarChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
              labelStyle={{ color: '#FFF' }}
            />
            <Line type="monotone" dataKey={dataKey} stroke="#3B82F6" />
          </LineChart>
        )}
      </ResponsiveContainer>
    </Card>
  )
}

export default TrendChart
