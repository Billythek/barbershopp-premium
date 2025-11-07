'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Award } from 'lucide-react'

const data = [
  { name: 'Coupe + Barbe', value: 45, color: '#8B4513' },
  { name: 'Coupe Classique', value: 38, color: '#0A1628' },
  { name: 'Service Complet', value: 28, color: '#10B981' },
  { name: 'Entretien Barbe', value: 22, color: '#EAB308' },
  { name: 'Rasage Trad.', value: 18, color: '#F59E0B' },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-mocha-200">
        <p className="font-bold text-navy-900 mb-1">{payload[0].payload.name}</p>
        <p className="text-sm text-mocha-600 font-semibold">
          {payload[0].value} réservations
        </p>
      </div>
    )
  }
  return null
}

export function ServicesChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0)

  return (
    <Card className="bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-mocha-500 to-mocha-800 shadow-lg">
            <Award className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-serif text-navy-900">
            Services les plus demandés
          </span>
        </CardTitle>

        <div className="mt-4">
          <p className="text-3xl font-bold text-gradient-gentleman">
            {total}
          </p>
          <p className="text-sm text-navy-400 mt-1">Réservations ce mois</p>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
            <XAxis
              dataKey="name"
              stroke="#6B7280"
              style={{ fontSize: '11px', fontWeight: '500' }}
              angle={-15}
              textAnchor="end"
              height={80}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '12px', fontWeight: '500' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="value"
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Legend */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-navy-600">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
