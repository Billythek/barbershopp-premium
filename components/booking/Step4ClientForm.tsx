'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { User, Mail, Phone, FileText } from 'lucide-react'
import { useBooking } from '@/lib/booking-context'
import { useState } from 'react'

export function Step4ClientForm() {
  const { bookingData, updateBooking } = useBooking()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return regex.test(email)
  }

  const validatePhone = (phone: string) => {
    const regex = /^(\+33|0)[1-9](\d{2}){4}$/
    return regex.test(phone.replace(/\s/g, ''))
  }

  const handleChange = (field: string, value: string) => {
    updateBooking({ [field]: value })

    // Inline validation
    let error = ''
    if (field === 'clientEmail' && value && !validateEmail(value)) {
      error = 'Email invalide'
    } else if (field === 'clientPhone' && value && !validatePhone(value)) {
      error = 'Téléphone invalide (format: 06 12 34 56 78)'
    } else if (field === 'clientName' && value && value.length < 2) {
      error = 'Nom trop court'
    }

    setErrors((prev) => ({ ...prev, [field]: error }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4 text-navy-900">
          Vos informations
        </h2>
        <p className="text-lg text-navy-400">
          Complétez vos coordonnées pour finaliser la réservation
        </p>
      </div>

      <Card className="border-2 border-gray-200 shadow-xl">
        <CardContent className="p-8 space-y-6">
          {/* Name */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-2"
          >
            <Label htmlFor="name" className="text-base font-semibold text-navy-900">
              Nom complet *
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="name"
                type="text"
                placeholder="Jean Dupont"
                value={bookingData.clientName || ''}
                onChange={(e) => handleChange('clientName', e.target.value)}
                className={`pl-11 h-12 text-base border-2 ${
                  errors.clientName
                    ? 'border-red-300 focus:border-red-500'
                    : bookingData.clientName
                    ? 'border-emerald-300 focus:border-emerald-500'
                    : 'border-gray-200 focus:border-mocha-500'
                }`}
              />
            </div>
            {errors.clientName && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.clientName}
              </motion.p>
            )}
          </motion.div>

          {/* Email */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <Label htmlFor="email" className="text-base font-semibold text-navy-900">
              Email *
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="jean.dupont@example.com"
                value={bookingData.clientEmail || ''}
                onChange={(e) => handleChange('clientEmail', e.target.value)}
                className={`pl-11 h-12 text-base border-2 ${
                  errors.clientEmail
                    ? 'border-red-300 focus:border-red-500'
                    : bookingData.clientEmail && validateEmail(bookingData.clientEmail)
                    ? 'border-emerald-300 focus:border-emerald-500'
                    : 'border-gray-200 focus:border-mocha-500'
                }`}
              />
            </div>
            {errors.clientEmail && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.clientEmail}
              </motion.p>
            )}
            <p className="text-sm text-gray-500">
              Vous recevrez une confirmation par email
            </p>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-2"
          >
            <Label htmlFor="phone" className="text-base font-semibold text-navy-900">
              Téléphone *
            </Label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="phone"
                type="tel"
                placeholder="06 12 34 56 78"
                value={bookingData.clientPhone || ''}
                onChange={(e) => handleChange('clientPhone', e.target.value)}
                className={`pl-11 h-12 text-base border-2 ${
                  errors.clientPhone
                    ? 'border-red-300 focus:border-red-500'
                    : bookingData.clientPhone && validatePhone(bookingData.clientPhone)
                    ? 'border-emerald-300 focus:border-emerald-500'
                    : 'border-gray-200 focus:border-mocha-500'
                }`}
              />
            </div>
            {errors.clientPhone && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm text-red-500"
              >
                {errors.clientPhone}
              </motion.p>
            )}
            <p className="text-sm text-gray-500">
              Pour un rappel SMS 1h avant votre rendez-vous
            </p>
          </motion.div>

          {/* Notes */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-2"
          >
            <Label htmlFor="notes" className="text-base font-semibold text-navy-900">
              Notes (optionnel)
            </Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <Textarea
                id="notes"
                placeholder="Précisions, préférences, allergies..."
                value={bookingData.notes || ''}
                onChange={(e) => handleChange('notes', e.target.value)}
                className="pl-11 min-h-[100px] text-base border-2 border-gray-200 focus:border-mocha-500 resize-none"
              />
            </div>
          </motion.div>

          {/* Privacy notice */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="pt-4 border-t border-gray-200"
          >
            <p className="text-sm text-gray-500 leading-relaxed">
              En confirmant votre réservation, vous acceptez nos conditions d'utilisation
              et notre politique de confidentialité. Vos données seront utilisées uniquement
              pour gérer votre rendez-vous.
            </p>
          </motion.div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
