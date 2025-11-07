'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Star, Award, Scissors } from 'lucide-react'
import { useBooking } from '@/lib/booking-context'

interface Barber {
  id: string
  name: string
  specialties: string[]
  experience: string
  rating: number
  totalReviews: number
  avatar: string
  available: boolean
}

const barbers: Barber[] = [
  {
    id: '1',
    name: 'Marc Dubois',
    specialties: ['Fade', 'Barbe', 'Coupe Classique'],
    experience: '15 ans',
    rating: 4.9,
    totalReviews: 248,
    avatar: 'MD',
    available: true,
  },
  {
    id: '2',
    name: 'Thomas Bernard',
    specialties: ['Coupe Moderne', 'Styling', 'Coloration'],
    experience: '10 ans',
    rating: 4.8,
    totalReviews: 187,
    avatar: 'TB',
    available: true,
  },
  {
    id: '3',
    name: 'Antoine Lefèvre',
    specialties: ['Rasage Traditionnel', 'Barbe', 'Soin'],
    experience: '12 ans',
    rating: 4.9,
    totalReviews: 203,
    avatar: 'AL',
    available: true,
  },
  {
    id: 'any',
    name: 'Premier disponible',
    specialties: ['Tous services'],
    experience: '',
    rating: 4.8,
    totalReviews: 0,
    avatar: '?',
    available: true,
  },
]

export function Step2BarberSelection() {
  const { bookingData, updateBooking } = useBooking()

  const handleSelectBarber = (barber: Barber) => {
    updateBooking({
      barberId: barber.id,
      barberName: barber.name,
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-navy-900">
          Choisissez votre barbier
        </h2>
        <p className="text-lg text-navy-400">
          Tous nos barbiers sont expérimentés et passionnés
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {barbers.map((barber, index) => {
          const isSelected = bookingData.barberId === barber.id

          return (
            <motion.div
              key={barber.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleSelectBarber(barber)}
              className="cursor-pointer"
            >
              <Card
                className={`h-full transition-all duration-300 relative overflow-hidden ${
                  isSelected
                    ? 'border-2 border-mocha-500 shadow-xl bg-mocha-50/50'
                    : 'border-2 border-gray-200 hover:border-mocha-300 hover:shadow-lg'
                }`}
              >
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-mocha-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}

                <CardContent className="p-6 flex flex-col items-center text-center">
                  {/* Avatar */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="relative mb-4"
                  >
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-mocha-500 to-mocha-800 flex items-center justify-center text-white font-bold text-2xl shadow-xl">
                      {barber.avatar}
                    </div>
                    {barber.available && barber.id !== 'any' && (
                      <motion.div
                        className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.div>

                  {/* Name */}
                  <h3 className="text-xl font-serif font-bold text-navy-900 mb-2">
                    {barber.name}
                  </h3>

                  {/* Experience */}
                  {barber.experience && (
                    <div className="flex items-center gap-1 text-sm text-navy-400 mb-3">
                      <Award className="w-4 h-4" />
                      <span>{barber.experience} d'expérience</span>
                    </div>
                  )}

                  {/* Rating */}
                  {barber.totalReviews > 0 && (
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-warning-500 text-warning-500" />
                        <span className="font-bold text-navy-900">{barber.rating}</span>
                      </div>
                      <span className="text-sm text-navy-400">
                        ({barber.totalReviews} avis)
                      </span>
                    </div>
                  )}

                  {/* Specialties */}
                  <div className="flex flex-wrap gap-2 justify-center">
                    {barber.specialties.map((specialty, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="border-mocha-300 text-mocha-600 text-xs"
                      >
                        <Scissors className="w-3 h-3 mr-1" />
                        {specialty}
                      </Badge>
                    ))}
                  </div>

                  {/* Special badge for "any barber" */}
                  {barber.id === 'any' && (
                    <div className="mt-4 p-2 bg-emerald-50 rounded-lg border border-emerald-200">
                      <p className="text-xs text-emerald-700 font-medium">
                        ⚡ Plus de créneaux disponibles
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
