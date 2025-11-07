'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react'
import { BookingProvider, useBooking } from '@/lib/booking-context'
import { BookingStepIndicator } from '@/components/booking/BookingStepIndicator'
import { Step1ServiceSelection } from '@/components/booking/Step1ServiceSelection'
import { Step2BarberSelection } from '@/components/booking/Step2BarberSelection'
import { Step3DateTimeSelection } from '@/components/booking/Step3DateTimeSelection'
import { Step4ClientForm } from '@/components/booking/Step4ClientForm'
import { Card, CardContent } from '@/components/ui/card'
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import { useRouter } from 'next/navigation'

const steps = [
  { number: 1, title: 'Service' },
  { number: 2, title: 'Barbier' },
  { number: 3, title: 'Date & Heure' },
  { number: 4, title: 'Informations' },
]

function BookingFlow() {
  const router = useRouter()
  const { bookingData, currentStep, setCurrentStep, canProceed, resetBooking } = useBooking()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleNext = () => {
    if (canProceed(currentStep) && currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleSubmit = async () => {
    if (!canProceed(currentStep)) return

    setIsSubmitting(true)

    // Simuler un appel API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setShowConfirmation(true)

    // TODO: Save to database via API
    console.log('Booking data:', bookingData)
  }

  const handleNewBooking = () => {
    resetBooking()
    setShowConfirmation(false)
    router.push('/booking')
  }

  if (showConfirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="min-h-screen bg-gradient-to-br from-[rgb(252,250,247)] via-[rgb(245,230,211)]/30 to-[rgb(252,250,247)] flex items-center justify-center p-4"
      >
        <Card className="max-w-2xl w-full border-2 border-emerald-200 shadow-2xl">
          <CardContent className="p-12 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 20 }}
              className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>

            <h2 className="text-4xl font-serif font-bold mb-4 text-navy-900">
              Réservation confirmée !
            </h2>
            <p className="text-lg text-navy-400 mb-8">
              Votre rendez-vous a été enregistré avec succès
            </p>

            <div className="bg-emerald-50 rounded-2xl p-8 mb-8 text-left space-y-4">
              <div className="flex justify-between border-b border-emerald-200 pb-3">
                <span className="text-navy-600 font-medium">Service</span>
                <span className="text-navy-900 font-bold">{bookingData.serviceName}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-200 pb-3">
                <span className="text-navy-600 font-medium">Barbier</span>
                <span className="text-navy-900 font-bold">{bookingData.barberName}</span>
              </div>
              <div className="flex justify-between border-b border-emerald-200 pb-3">
                <span className="text-navy-600 font-medium">Date</span>
                <span className="text-navy-900 font-bold">
                  {bookingData.date && format(bookingData.date, 'EEEE d MMMM yyyy', { locale: fr })}
                </span>
              </div>
              <div className="flex justify-between border-b border-emerald-200 pb-3">
                <span className="text-navy-600 font-medium">Heure</span>
                <span className="text-navy-900 font-bold">{bookingData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-navy-600 font-medium">Prix</span>
                <span className="text-2xl font-bold text-gradient-gentleman">
                  {bookingData.servicePrice}€
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-navy-600">
                ✉️ Un email de confirmation a été envoyé à <strong>{bookingData.clientEmail}</strong>
              </p>
              <p className="text-sm text-navy-600">
                📱 Vous recevrez un rappel par SMS 1h avant votre rendez-vous
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <Button
                onClick={handleNewBooking}
                className="flex-1 h-12 bg-gradient-to-r from-mocha-500 to-mocha-800 hover:from-mocha-600 hover:to-mocha-900 text-white font-semibold"
              >
                Nouvelle réservation
              </Button>
              <Button
                onClick={() => router.push('/booking')}
                variant="outline"
                className="flex-1 h-12 border-2 border-mocha-500 text-mocha-600 hover:bg-mocha-50"
              >
                Retour à l'accueil
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(252,250,247)] via-[rgb(245,230,211)]/30 to-[rgb(252,250,247)]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-premium border-b border-mocha-200/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-display font-bold text-navy-900">
                BarberShopp
              </h1>
              <p className="text-xs text-navy-400 mt-1">
                Réservation en ligne
              </p>
            </div>
            <Button
              variant="ghost"
              onClick={() => router.push('/booking')}
              className="text-navy-600 hover:text-navy-900"
            >
              Annuler
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Step Indicator */}
        <BookingStepIndicator currentStep={currentStep} steps={steps} />

        {/* Step Content */}
        <div className="mb-8">
          <AnimatePresence mode="wait">
            {currentStep === 0 && <Step1ServiceSelection key="step1" />}
            {currentStep === 1 && <Step2BarberSelection key="step2" />}
            {currentStep === 2 && <Step3DateTimeSelection key="step3" />}
            {currentStep === 3 && <Step4ClientForm key="step4" />}
          </AnimatePresence>
        </div>

        {/* Navigation Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-3xl mx-auto"
        >
          <div className="flex gap-4">
            {currentStep > 0 && (
              <Button
                onClick={handleBack}
                variant="outline"
                size="lg"
                className="flex-1 h-14 border-2 border-mocha-500 text-mocha-600 hover:bg-mocha-50 font-semibold"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                Retour
              </Button>
            )}

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                disabled={!canProceed(currentStep)}
                size="lg"
                className="flex-1 h-14 bg-gradient-to-r from-mocha-500 to-mocha-800 hover:from-mocha-600 hover:to-mocha-900 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-xl"
              >
                Continuer
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed(currentStep) || isSubmitting}
                size="lg"
                className="flex-1 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold shadow-xl"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Confirmation en cours...
                  </>
                ) : (
                  <>
                    <Check className="w-5 h-5 mr-2" />
                    Confirmer la réservation
                  </>
                )}
              </Button>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function BookingPage() {
  return (
    <BookingProvider>
      <BookingFlow />
    </BookingProvider>
  )
}
