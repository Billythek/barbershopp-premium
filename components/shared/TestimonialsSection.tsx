'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

interface Testimonial {
  id: number
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
  service: string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Jean Dupont',
    avatar: 'JD',
    rating: 5,
    date: 'Il y a 2 jours',
    comment: 'Excellent service ! Marc est un vrai professionnel, la coupe est impeccable et l\'ambiance est top. Je recommande vivement !',
    service: 'Coupe + Barbe',
  },
  {
    id: 2,
    name: 'Pierre Martin',
    avatar: 'PM',
    rating: 5,
    date: 'Il y a 1 semaine',
    comment: 'Meilleur barbier de Paris ! Toujours satisfait du résultat. Le salon est magnifique et l\'accueil chaleureux.',
    service: 'Coupe Classique',
  },
  {
    id: 3,
    name: 'Thomas Bernard',
    avatar: 'TB',
    rating: 5,
    date: 'Il y a 2 semaines',
    comment: 'Rasage traditionnel au top, une vraie expérience. Je ne vais plus nulle part ailleurs !',
    service: 'Rasage Traditionnel',
  },
  {
    id: 4,
    name: 'Alexandre Petit',
    avatar: 'AP',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Service premium, résultat impeccable. Le rapport qualité/prix est imbattable.',
    service: 'Service Complet',
  },
  {
    id: 5,
    name: 'Maxime Rousseau',
    avatar: 'MR',
    rating: 5,
    date: 'Il y a 1 mois',
    comment: 'Très satisfait ! L\'équipe est professionnelle et le résultat est toujours au rendez-vous.',
    service: 'Coupe + Barbe',
  },
  {
    id: 6,
    name: 'Lucas Moreau',
    avatar: 'LM',
    rating: 5,
    date: 'Il y a 2 mois',
    comment: 'Le meilleur salon que je connaisse. Ambiance conviviale et travail de qualité.',
    service: 'Entretien Barbe',
  },
]

export function TestimonialsSection() {
  return (
    <section className="container mx-auto px-4 py-20 md:py-32">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-5 py-2 rounded-full bg-warning-50 text-warning-600 font-semibold text-sm tracking-wide mb-6">
            <Star className="w-4 h-4 inline mr-2 fill-warning-500" />
            4.9/5 · 638 avis
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-navy-900 leading-tight">
            Ils nous font confiance
          </h2>
          <p className="text-lg md:text-xl text-navy-400 max-w-2xl mx-auto leading-relaxed">
            Découvrez les avis de nos clients satisfaits
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
          >
            <Card className="h-full glass-premium border-2 border-mocha-200/20 hover:border-mocha-300/40 transition-all duration-300 hover:shadow-xl relative overflow-hidden group">
              {/* Quote decoration */}
              <div className="absolute top-4 right-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Quote className="w-16 h-16 text-mocha-500" />
              </div>

              <CardContent className="p-6 relative z-10">
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="w-12 h-12 rounded-full bg-gradient-to-br from-mocha-500 to-mocha-800 flex items-center justify-center text-white font-bold shadow-lg flex-shrink-0"
                  >
                    {testimonial.avatar}
                  </motion.div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-navy-900 truncate">
                      {testimonial.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <div className="flex gap-0.5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="w-3.5 h-3.5 fill-warning-500 text-warning-500"
                          />
                        ))}
                      </div>
                      <span className="text-xs text-navy-400">{testimonial.date}</span>
                    </div>
                  </div>
                </div>

                {/* Comment */}
                <p className="text-sm text-navy-600 leading-relaxed mb-4 line-clamp-4">
                  {testimonial.comment}
                </p>

                {/* Service badge */}
                <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-mocha-50 border border-mocha-200 text-xs font-medium text-mocha-700">
                  {testimonial.service}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <p className="text-navy-400 text-sm">
          Plus de <span className="font-bold text-navy-900">600 avis 5 étoiles</span> sur Google
        </p>
      </motion.div>
    </section>
  )
}
