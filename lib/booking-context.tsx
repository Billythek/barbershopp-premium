'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface BookingData {
  serviceId?: string
  serviceName?: string
  servicePrice?: number
  serviceDuration?: number
  barberId?: string
  barberName?: string
  date?: Date
  time?: string
  clientName?: string
  clientEmail?: string
  clientPhone?: string
  notes?: string
}

interface BookingContextType {
  bookingData: BookingData
  updateBooking: (data: Partial<BookingData>) => void
  resetBooking: () => void
  currentStep: number
  setCurrentStep: (step: number) => void
  canProceed: (step: number) => boolean
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookingData, setBookingData] = useState<BookingData>({})
  const [currentStep, setCurrentStep] = useState(0)

  const updateBooking = (data: Partial<BookingData>) => {
    setBookingData((prev) => ({ ...prev, ...data }))
  }

  const resetBooking = () => {
    setBookingData({})
    setCurrentStep(0)
  }

  const canProceed = (step: number): boolean => {
    switch (step) {
      case 0:
        return !!bookingData.serviceId
      case 1:
        return !!bookingData.barberId
      case 2:
        return !!bookingData.date && !!bookingData.time
      case 3:
        return !!(
          bookingData.clientName &&
          bookingData.clientEmail &&
          bookingData.clientPhone
        )
      default:
        return false
    }
  }

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBooking,
        resetBooking,
        currentStep,
        setCurrentStep,
        canProceed,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return context
}
