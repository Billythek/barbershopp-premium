'use client'

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Scissors, MapPin, Phone, Mail, Sparkles, Award, Users } from "lucide-react"
import { useState, useEffect } from "react"

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
  const [scrolled, setScrolled] = useState(false)
  const [prevScrollPos, setPrevScrollPos] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY
      
      // Set scrolled state for style changes
      setScrolled(currentScrollPos > 20)
      
      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollPos < prevScrollPos || currentScrollPos < 10) {
        setVisible(true)
      } else if (currentScrollPos > 80 && currentScrollPos > prevScrollPos) {
        setVisible(false)
      }
      
      setPrevScrollPos(currentScrollPos)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [prevScrollPos])

  return (
    <div className="min-h-screen bg-gradient-to-br from-[rgb(252,250,247)] via-[rgb(245,230,211)]/30 to-[rgb(252,250,247)]">
      {/* Header */}
      <motion.header
        initial={{ y: 0 }}
        animate={{ 
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-premium shadow-lg border-b border-[rgb(245,230,211)]/20' : 'glass-premium border-b border-[rgb(245,230,211)]/20'
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-[family-name:var(--font-playfair)] font-bold text-gradient-gentleman">
                BarberShopp
              </h1>
              <p className="text-sm text-[rgb(100,120,150)] mt-1">
                L&apos;excellence depuis 1920
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="border-gradient-gentleman cursor-pointer">FR</Button>
              <Button variant="ghost" size="sm" className="cursor-pointer">EN</Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-20 md:py-32 pt-32 md:pt-40"
      >
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium border border-[rgb(139,69,19)]/20 mb-8"
          >
            <Sparkles className="w-4 h-4 text-[rgb(234,179,8)]" />
            <span className="text-sm font-medium">Reservation instantanee</span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-7xl lg:text-8xl font-[family-name:var(--font-bodoni)] font-bold mb-6"
          >
            <span className="text-3d block">L&apos;Art du</span>
            <span className="text-gradient-gentleman block mt-2">Gentleman Moderne</span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl md:text-2xl text-[rgb(100,120,150)] max-w-3xl mx-auto mb-12"
          >
            Decouvrez l&apos;art de la coiffure traditionnelle dans un cadre raffine.
          </motion.p>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Button
              size="lg"
              className="px-8 py-6 text-lg bg-gradient-to-r from-[rgb(139,69,19)] to-[rgb(80,40,10)] hover:from-[rgb(110,55,15)] hover:to-[rgb(60,30,10)] shadow-2xl glow-cognac"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Reserver maintenant
            </Button>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                className="glass-premium p-6 rounded-2xl hover-lift-3d cursor-pointer"
              >
                <div className="text-4xl md:text-5xl font-bold text-gradient-gentleman mb-2">
                  {stat.value}{stat.suffix}
                </div>
                <div className="text-sm text-[rgb(100,120,150)]">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 rounded-full bg-[rgb(139,69,19)]/10 text-[rgb(139,69,19)] font-medium mb-4">
            Nos Prestations
          </div>
          <h3 className="text-5xl md:text-6xl font-[family-name:var(--font-bodoni)] font-bold mb-6 text-3d">
            Services Premium
          </h3>
          <p className="text-xl text-[rgb(100,120,150)] max-w-2xl mx-auto">
            Choisissez parmi notre selection de services d&apos;exception
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={service.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <motion.div whileHover={{ y: -12 }} className="h-full">
                <Card className="h-full glass-premium border-2 border-transparent hover:border-[rgb(139,69,19)]/30 transition-all duration-500 relative overflow-hidden hover-lift-3d">
                  {/* Shimmer */}
                  <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {service.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-[rgb(234,179,8)] to-[rgb(245,158,11)] text-white text-xs font-bold z-10">
                      POPULAIRE
                    </div>
                  )}

                  <CardHeader className="relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgb(139,69,19)] to-[rgb(80,40,10)] flex items-center justify-center mb-4 shadow-lg glow-cognac"
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl font-[family-name:var(--font-playfair)] mb-2">
                      {service.name}
                    </CardTitle>
                    <p className="text-[rgb(100,120,150)]">{service.description}</p>
                  </CardHeader>

                  <CardContent className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-3xl font-bold text-gradient-gentleman">{service.price}EUR</div>
                        <div className="text-sm text-[rgb(100,120,150)] flex items-center gap-1 mt-1">
                          <Clock className="w-3 h-3" />
                          {service.duration} min
                        </div>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-[rgb(139,69,19)] to-[rgb(80,40,10)] hover:from-[rgb(110,55,15)] hover:to-[rgb(60,30,10)]">
                      Reserver
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass-dark text-white border border-[rgb(245,230,211)]/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[rgb(10,22,40)] via-[rgb(139,69,19)]/20 to-[rgb(10,22,40)] opacity-90" />

          <CardContent className="p-12 relative z-10">
            <h4 className="text-4xl font-[family-name:var(--font-bodoni)] font-bold mb-12 text-center">
              <span className="text-gradient-gold">Pourquoi</span> choisir BarberShopp ?
            </h4>

            <div className="grid md:grid-cols-2 gap-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.text}
                  initial={{ opacity: 0, x: 100 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-4 cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgb(234,179,8)] to-[rgb(245,158,11)] flex items-center justify-center shadow-xl glow-gold"
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <p className="text-lg font-medium">{feature.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Contact Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="glass-premium border-2 border-[rgb(139,69,19)]/20 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-[family-name:var(--font-bodoni)] text-center">
              Contactez-nous
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
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
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-[rgb(245,230,211)]/20 transition-all cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[rgb(10,22,40)] to-[rgb(139,69,19)] flex items-center justify-center shadow-lg">
                    <item.icon className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h5 className="font-semibold mb-1">{item.title}</h5>
                    <p className="text-sm text-[rgb(100,120,150)] whitespace-pre-line">{item.content}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-[rgb(10,22,40)] to-[rgb(6,14,24)] text-[rgb(245,230,211)] py-16">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-4xl font-[family-name:var(--font-bodoni)] font-bold mb-3 text-gradient-gold">
            BarberShopp
          </h3>
          <p className="text-[rgb(245,230,211)]/70 mb-8">
            L&apos;art de la coiffure traditionnelle depuis 1920
          </p>
          <p className="text-sm text-[rgb(245,230,211)]/50">
            2024 BarberShopp. Tous droits reserves.
          </p>
        </div>
      </footer>
    </div>
  )
}
