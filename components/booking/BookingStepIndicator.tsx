'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

interface Step {
  number: number
  title: string
}

interface BookingStepIndicatorProps {
  currentStep: number
  steps: Step[]
}

export function BookingStepIndicator({ currentStep, steps }: BookingStepIndicatorProps) {
  return (
    <div className="w-full py-8">
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-10" />
          <motion.div
            className="absolute top-5 left-0 h-0.5 bg-mocha-500 -z-10"
            initial={{ width: '0%' }}
            animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          />

          {steps.map((step, index) => {
            const isCompleted = index < currentStep
            const isCurrent = index === currentStep

            return (
              <div key={step.number} className="flex flex-col items-center relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    isCompleted
                      ? 'bg-mocha-500 text-white shadow-lg'
                      : isCurrent
                      ? 'bg-mocha-500 text-white shadow-xl ring-4 ring-mocha-200'
                      : 'bg-white text-gray-400 border-2 border-gray-200'
                  }`}
                >
                  {isCompleted ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    >
                      <Check className="w-5 h-5" />
                    </motion.div>
                  ) : (
                    step.number
                  )}
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`mt-2 text-xs md:text-sm font-medium whitespace-nowrap ${
                    isCurrent ? 'text-mocha-600' : 'text-gray-500'
                  }`}
                >
                  {step.title}
                </motion.p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
