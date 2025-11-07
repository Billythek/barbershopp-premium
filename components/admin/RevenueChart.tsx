'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { TrendingUp, Euro } from 'lucide-react'
import { motion } from 'framer-motion'

const data = [
  { name: 'Lun', revenus: 450, clients: 12 },
  { name: 'Mar', revenus: 620, clients: 16 },
  { name: 'Mer', revenus: 580, clients: 15 },
  { name: 'Jeu', revenus: 720, clients: 18 },
  { name: 'Ven', revenus: 890, clients: 22 },
  { name: 'Sam', revenus: 1200, clients: 28 },
  { name: 'Dim', revenus: 980, clients: 24 },
]

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-xl border-2 border-mocha-200">
        <p className="font-bold text-navy-900 mb-2">{payload[0].payload.name}</p>
        <p className="text-sm text-emerald-600 font-semibold">
          Revenus: {payload[0].value}€
        </p>
        <p className="text-sm text-navy-600">
          Clients: {payload[0].payload.clients}
        </p>
      </div>
    )
  }
  return null
}

export function RevenueChart() {
  const totalRevenue = data.reduce((acc, item) => acc + item.revenus, 0)
  const avgDaily = Math.round(totalRevenue / data.length)

  return (
    <Card className="bg-white border-2 border-gray-200 shadow-xl hover:shadow-2xl transition-all duration-300">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg">
              <Euro className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-serif text-navy-900">
              Revenus de la semaine
            </span>
          </CardTitle>
          <div className="flex items-center gap-2 text-emerald-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-semibold">+12%</span>
          </div>
        </div>

        <div className="flex items-baseline gap-4 mt-4">
          <div>
            <p className="text-3xl font-bold text-gradient-gentleman">
              {totalRevenue}€
            </p>
            <p className="text-sm text-navy-400 mt-1">Total cette semaine</p>
          </div>
          <div className="h-10 w-px bg-gray-200" />
          <div>
            <p className="text-2xl font-bold text-mocha-600">
              {avgDaily}€
            </p>
            <p className="text-sm text-navy-400 mt-1">Moyenne journalière</p>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis
              dataKey="name"
              stroke="#6B7280"
              style={{ fontSize: '12px', fontWeight: '500' }}
            />
            <YAxis
              stroke="#6B7280"
              style={{ fontSize: '12px', fontWeight: '500' }}
              tickFormatter={(value) => `${value}€`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="revenus"
              stroke="#10B981"
              strokeWidth={3}
              fillOpacity={1}
              fill="url(#colorRevenue)"
              animationDuration={1500}
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
