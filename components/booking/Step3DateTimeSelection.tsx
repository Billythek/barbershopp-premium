'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Check, Clock, Calendar as CalendarIcon } from 'lucide-react'
import { useBooking } from '@/lib/booking-context'
import { DayPicker } from 'react-day-picker'
import { fr } from 'date-fns/locale'
import { addDays, format, isSameDay } from 'date-fns'
import { useState } from 'react'
import 'react-day-picker/dist/style.css'

// Générer des créneaux horaires disponibles
const generateTimeSlots = (date: Date) => {
  const slots = []
  const startHour = 9
  const endHour = 19
  const interval = 30 // minutes

  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += interval) {
      const time = `${hour.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}`
      const isAvailable = Math.random() > 0.3 // 70% available
      const isLastSpot = Math.random() > 0.8 // 20% last spot
      slots.push({ time, available: isAvailable, lastSpot: isLastSpot && isAvailable })
    }
  }

  return slots
}

export function Step3DateTimeSelection() {
  const { bookingData, updateBooking } = useBooking()
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(bookingData.date)
  const [selectedTime, setSelectedTime] = useState<string | undefined>(bookingData.time)

  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : []

  const handleSelectDate = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date)
      setSelectedTime(undefined) // Reset time when date changes
      updateBooking({ date, time: undefined })
    }
  }

  const handleSelectTime = (time: string) => {
    setSelectedTime(time)
    updateBooking({ time })
  }

  // Disable past dates and dates more than 60 days in future
  const disabledDays = [
    { before: new Date() },
    { after: addDays(new Date(), 60) },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-5xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-navy-900">
          Choisissez la date et l'heure
        </h2>
        <p className="text-lg text-navy-400">
          Sélectionnez un créneau disponible
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Calendar */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-2 border-gray-200 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <CalendarIcon className="w-5 h-5 text-mocha-500" />
                <h3 className="text-lg font-serif font-bold text-navy-900">
                  Sélectionnez une date
                </h3>
              </div>

              <style jsx global>{`
                .rdp {
                  --rdp-cell-size: 45px;
                  --rdp-accent-color: rgb(139, 69, 19);
                  --rdp-background-color: rgba(139, 69, 19, 0.1);
                  margin: 0;
                }
                .rdp-months {
                  justify-content: center;
                }
                .rdp-day_selected {
                  background-color: rgb(139, 69, 19);
                  color: white;
                  font-weight: bold;
                }
                .rdp-day_today {
                  font-weight: bold;
                  color: rgb(139, 69, 19);
                }
                .rdp-button:hover:not([disabled]):not(.rdp-day_selected) {
                  background-color: rgba(139, 69, 19, 0.1);
                }
              `}</style>

              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={handleSelectDate}
                disabled={disabledDays}
                locale={fr}
                className="mx-auto"
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Time Slots */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="border-2 border-gray-200 shadow-lg h-full">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-mocha-500" />
                <h3 className="text-lg font-serif font-bold text-navy-900">
                  Choisissez une heure
                </h3>
              </div>

              {!selectedDate ? (
                <div className="flex items-center justify-center h-64 text-navy-400">
                  <p>Sélectionnez d'abord une date</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="text-sm text-navy-600 font-medium mb-4">
                    {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })}
                  </div>

                  <div className="max-h-[400px] overflow-y-auto pr-2 space-y-2">
                    {timeSlots.map((slot, index) => {
                      const isSelected = selectedTime === slot.time

                      if (!slot.available) {
                        return (
                          <motion.div
                            key={slot.time}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 0.5, x: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="p-3 rounded-lg border-2 border-gray-200 bg-gray-50 text-gray-400 text-center cursor-not-allowed"
                          >
                            <span className="line-through">{slot.time}</span>
                            <span className="text-xs ml-2">Non disponible</span>
                          </motion.div>
                        )
                      }

                      return (
                        <motion.div
                          key={slot.time}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.02 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectTime(slot.time)}
                          className={`p-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
                            isSelected
                              ? 'border-mocha-500 bg-mocha-50 shadow-md'
                              : 'border-gray-200 hover:border-mocha-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Clock className={`w-4 h-4 ${isSelected ? 'text-mocha-600' : 'text-gray-400'}`} />
                              <span className={`font-semibold ${isSelected ? 'text-mocha-700' : 'text-navy-900'}`}>
                                {slot.time}
                              </span>
                            </div>

                            <div className="flex items-center gap-2">
                              {slot.lastSpot && (
                                <Badge variant="outline" className="border-warning-500 text-warning-600 text-xs">
                                  Dernière place
                                </Badge>
                              )}
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  className="w-6 h-6 bg-mocha-500 rounded-full flex items-center justify-center"
                                >
                                  <Check className="w-4 h-4 text-white" />
                                </motion.div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Summary */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8"
        >
          <Card className="border-2 border-emerald-200 bg-emerald-50/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-3 text-emerald-700">
                <Check className="w-5 h-5" />
                <p className="font-semibold">
                  Rendez-vous prévu le {format(selectedDate, 'EEEE d MMMM yyyy', { locale: fr })} à {selectedTime}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  )
}
