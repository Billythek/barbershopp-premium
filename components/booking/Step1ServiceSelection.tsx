'use client'

import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Clock, Scissors, Star } from 'lucide-react'
import { useBooking } from '@/lib/booking-context'

interface Service {
  id: string
  name: string
  price: number
  duration: number
  description: string
  popular?: boolean
  includes: string[]
}

const services: Service[] = [
  {
    id: '1',
    name: 'Coupe Classique',
    price: 35,
    duration: 45,
    description: 'Coupe aux ciseaux traditionnelle avec finitions',
    includes: ['Shampoing', 'Coupe', 'Styling', 'Finitions'],
  },
  {
    id: '2',
    name: 'Coupe + Barbe',
    price: 50,
    duration: 60,
    description: 'Service complet coupe et entretien barbe',
    popular: true,
    includes: ['Shampoing', 'Coupe', 'Taille barbe', 'Soin barbe', 'Styling'],
  },
  {
    id: '3',
    name: 'Entretien Barbe',
    price: 25,
    duration: 30,
    description: 'Taille et soin de la barbe',
    includes: ['Taille', 'Rasage contours', 'Huile barbe'],
  },
  {
    id: '4',
    name: 'Rasage Traditionnel',
    price: 40,
    duration: 40,
    description: 'Rasage au coupe-chou avec serviette chaude',
    includes: ['Préparation', 'Rasage traditionnel', 'Serviette chaude', 'Baume'],
  },
  {
    id: '5',
    name: 'Coupe Premium',
    price: 55,
    duration: 75,
    description: 'Coupe signature avec massage et soins',
    includes: ['Consultation', 'Shampoing premium', 'Coupe', 'Massage crânien', 'Styling'],
  },
  {
    id: '6',
    name: 'Service Complet',
    price: 85,
    duration: 90,
    description: 'Expérience complète coupe, barbe et soins',
    popular: true,
    includes: ['Tout inclus', 'Massage', 'Soins visage', 'Boisson offerte'],
  },
]

export function Step1ServiceSelection() {
  const { bookingData, updateBooking } = useBooking()

  const handleSelectService = (service: Service) => {
    updateBooking({
      serviceId: service.id,
      serviceName: service.name,
      servicePrice: service.price,
      serviceDuration: service.duration,
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
          Choisissez votre service
        </h2>
        <p className="text-lg text-navy-400">
          Sélectionnez le service qui vous convient
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {services.map((service, index) => {
          const isSelected = bookingData.serviceId === service.id

          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => handleSelectService(service)}
              className="cursor-pointer"
            >
              <Card
                className={`h-full transition-all duration-300 ${
                  isSelected
                    ? 'border-2 border-mocha-500 shadow-xl bg-mocha-50/50'
                    : 'border-2 border-gray-200 hover:border-mocha-300 hover:shadow-lg'
                }`}
              >
                {service.popular && (
                  <motion.div
                    className="absolute top-4 right-4 z-10"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Badge className="bg-gradient-to-r from-warning-500 to-warning-600 text-white border-0">
                      <Star className="w-3 h-3 mr-1" />
                      POPULAIRE
                    </Badge>
                  </motion.div>
                )}

                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-4 left-4 z-10 w-8 h-8 bg-mocha-500 rounded-full flex items-center justify-center"
                  >
                    <Check className="w-5 h-5 text-white" />
                  </motion.div>
                )}

                <CardHeader className="pb-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-mocha-500 to-mocha-800 flex items-center justify-center mb-4 shadow-lg">
                    <Scissors className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-serif text-navy-900">
                    {service.name}
                  </CardTitle>
                  <p className="text-sm text-navy-400 mt-2">
                    {service.description}
                  </p>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-gradient-gentleman">
                      {service.price}
                    </span>
                    <span className="text-lg font-medium text-mocha-500">EUR</span>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-navy-400">
                    <Clock className="w-4 h-4" />
                    <span className="font-medium">{service.duration} minutes</span>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-xs font-semibold text-navy-600 mb-2 uppercase tracking-wide">
                      Inclus :
                    </p>
                    <ul className="space-y-1">
                      {service.includes.map((item, i) => (
                        <li
                          key={i}
                          className="flex items-center gap-2 text-sm text-navy-400"
                        >
                          <div className="w-1 h-1 rounded-full bg-mocha-500" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
