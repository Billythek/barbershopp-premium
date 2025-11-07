'use client'

import { motion } from "framer-motion"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Scissors, MapPin, Phone, Mail, Sparkles, Award, Users, Check } from "lucide-react"
import { TestimonialsSection } from "@/components/shared/TestimonialsSection"
import { BeforeAfterGallery } from "@/components/shared/BeforeAfterGallery"
import { AnimatedCounter } from "@/components/shared/AnimatedCounter"

const services = [
  { name: "Coupe Classique", price: 35, duration: 45, description: "Coupe aux ciseaux traditionnelle", icon: Scissors },
  { name: "Coupe + Barbe", price: 50, duration: 60, description: "Coupe complete avec barbe premium", icon: Scissors, popular: true },
  { name: "Entretien Barbe", price: 25, duration: 30, description: "Taille et soin de la barbe", icon: Scissors },
  { name: "Rasage Traditionnel", price: 40, duration: 40, description: "Rasage au coupe-chou", icon: Scissors },
]

const features = [
  { icon: Award, text: "Produits professionnels haut de gamme" },
  { icon: Users, text: "Barbiers experimentes" },
  { icon: Sparkles, text: "Ambiance authentique" },
  { icon: Calendar, text: "Reservation 24/7" },
]

const stats = [
  { label: "Annees d'experience", value: "105", suffix: "+" },
  { label: "Clients satisfaits", value: "15", suffix: "K+" },
  { label: "Services par mois", value: "2", suffix: "K+" },
  { label: "Note moyenne", value: "4.9", suffix: "/5" },
]

export default function BookingPage() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(252,250,247)] via-[rgb(245,230,211)]/30 to-[rgb(252,250,247)]">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-premium border-b border-mocha-200/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-display font-bold text-navy-900">
                BarberShopp
              </h1>
              <p className="text-xs text-navy-400 mt-1 tracking-wide">
                L&apos;excellence depuis 1920
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" className="border-mocha-300 text-mocha-600 hover:bg-mocha-50">
                FR
              </Button>
              <Button variant="ghost" size="sm" className="text-navy-400 hover:text-navy-900">
                EN
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20 md:py-32 lg:py-40"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full glass-premium border border-mocha-200/30 mb-10"
          >
            <motion.div
              animate={{ rotate: [0, 15, 0, -15, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-4 h-4 text-warning-500" />
            </motion.div>
            <span className="text-sm font-semibold text-navy-900 tracking-wide">Reservation instantanee</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-8 leading-[1.1]"
          >
            <span className="text-3d block text-navy-900">L&apos;Art du</span>
            <span className="text-gradient-gentleman block mt-3">Gentleman Moderne</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl lg:text-2xl text-navy-400 max-w-3xl mx-auto mb-14 leading-relaxed"
          >
            Decouvrez l&apos;art de la coiffure traditionnelle dans un cadre raffine.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              size="lg"
              onClick={() => router.push('/booking/new')}
              className="px-10 py-7 text-lg font-semibold bg-gradient-to-r from-mocha-500 to-mocha-800 hover:from-mocha-600 hover:to-mocha-900 shadow-gentleman-xl text-cream-50 gap-3 transition-all duration-300"
            >
              <Calendar className="w-5 h-5" />
              Reserver maintenant
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-24">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className="glass-premium p-8 rounded-2xl border border-mocha-200/20 hover:border-mocha-300/40 transition-all duration-300 hover:shadow-gentleman-lg"
              >
                <div className="text-5xl md:text-6xl font-bold text-gradient-gentleman mb-3 leading-none">
                  <AnimatedCounter
                    end={parseInt(stat.value)}
                    suffix={stat.suffix}
                    duration={2500}
                  />
                </div>
                <div className="text-sm font-medium text-navy-400 uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center mb-20">
          <div className="inline-block px-5 py-2 rounded-full bg-mocha-50 text-mocha-600 font-semibold text-sm tracking-wide mb-6">
            Nos Prestations
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6 text-navy-900 leading-tight">
            Services Premium
          </h2>
          <p className="text-lg md:text-xl text-navy-400 max-w-2xl mx-auto leading-relaxed">
            Choisissez parmi notre selection de services d&apos;exception
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group h-full"
            >
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                className="h-full"
                transition={{ duration: 0.3 }}
              >
                <Card className="h-full glass-premium border-2 border-mocha-200/20 hover:border-mocha-300/50 transition-all duration-500 relative overflow-hidden hover:shadow-gentleman-lg">
                  {/* Shimmer */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {service.popular && (
                    <motion.div
                      className="absolute top-4 right-4 px-4 py-1.5 rounded-full bg-gradient-to-r from-warning-500 to-warning-600 text-white text-xs font-bold z-10 shadow-lg"
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      POPULAIRE
                    </motion.div>
                  )}

                  <CardHeader className="relative z-10 p-6">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.15 }}
                      transition={{ duration: 0.6 }}
                      className="w-18 h-18 rounded-2xl bg-gradient-to-br from-mocha-500 to-mocha-800 flex items-center justify-center mb-5 shadow-gentleman"
                    >
                      <service.icon className="w-9 h-9 text-cream-50" />
                    </motion.div>
                    <CardTitle className="text-2xl font-serif font-bold mb-3 text-navy-900">
                      {service.name}
                    </CardTitle>
                    <p className="text-sm text-navy-400 leading-relaxed">{service.description}</p>
                  </CardHeader>

                  <CardContent className="relative z-10 p-6 pt-0">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-1 mb-2">
                        <span className="text-4xl font-bold text-gradient-gentleman">{service.price}</span>
                        <span className="text-lg font-medium text-mocha-500">EUR</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-navy-400">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">{service.duration} min</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => router.push('/booking/new')}
                      className="w-full bg-gradient-to-r from-mocha-500 to-mocha-800 hover:from-mocha-600 hover:to-mocha-900 text-cream-50 font-semibold shadow-gentleman transition-all duration-300 hover:scale-105"
                    >
                      Reserver
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Before/After Gallery */}
      <BeforeAfterGallery />

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <Card className="glass-dark text-cream-50 border border-mocha-200/10 overflow-hidden relative shadow-gentleman-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-mocha-700/30 to-navy-900 opacity-95" />

          <CardContent className="p-12 md:p-16 relative z-10">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold mb-16 text-center leading-tight">
              <span className="text-warning-500">Pourquoi</span> choisir BarberShopp ?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex flex-col items-center text-center gap-5"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-warning-500 to-warning-600 flex items-center justify-center shadow-xl"
                  >
                    <feature.icon className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-lg font-semibold leading-relaxed">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <Card className="glass-premium border-2 border-mocha-200/30 max-w-4xl mx-auto shadow-gentleman-lg">
          <CardHeader className="p-8 md:p-12 pb-8">
            <CardTitle className="text-3xl md:text-4xl font-serif font-bold text-center text-navy-900">
              Contactez-nous
            </CardTitle>
            <p className="text-center text-navy-400 mt-4 text-lg">
              Notre equipe est a votre disposition
            </p>
          </CardHeader>
          <CardContent className="p-8 md:p-12 pt-0">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { icon: Clock, title: "Horaires", content: "Lun - Sam : 9h - 19h" },
                { icon: MapPin, title: "Adresse", content: "123 Rue du Barbier\n75001 Paris" },
                { icon: Phone, title: "Telephone", content: "+33 1 23 45 67 89" },
                { icon: Mail, title: "Email", content: "contact@barbershopp.fr" },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  className="flex items-start gap-5 p-6 rounded-2xl hover:bg-mocha-50/50 border-2 border-transparent hover:border-mocha-200/40 transition-all duration-300"
                >
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-navy-900 to-mocha-600 flex items-center justify-center shadow-gentleman flex-shrink-0">
                    <item.icon className="w-7 h-7 text-cream-50" />
                  </div>
                  <div className="flex-1">
                    <h5 className="font-bold text-navy-900 mb-2 text-lg">{item.title}</h5>
                    <p className="text-sm text-navy-400 whitespace-pre-line leading-relaxed font-medium">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-navy-900 to-navy-800 text-cream-300 py-20 md:py-24 border-t border-mocha-500/20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="text-5xl md:text-6xl font-display font-bold mb-4 bg-gradient-to-r from-warning-500 via-mocha-400 to-warning-600 bg-clip-text text-transparent">
              BarberShopp
            </h3>
            <p className="text-lg md:text-xl text-cream-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              L&apos;art de la coiffure traditionnelle depuis 1920
            </p>

            <div className="h-px w-24 mx-auto bg-gradient-to-r from-transparent via-mocha-500 to-transparent mb-12" />

            <p className="text-sm text-cream-500 font-medium">
              2024 BarberShopp. Tous droits reserves.
            </p>
          </motion.div>
        </div>
      </footer>
    </div>
  )
}
