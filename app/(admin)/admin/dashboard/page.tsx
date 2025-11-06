"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { KPICard } from "@/components/shared/KPICard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  Euro,
  TrendingUp,
  Clock,
  CheckCircle2,
  Plus,
  Scissors,
  Star,
  Sparkles,
  Award,
  ArrowRight,
} from "lucide-react"
import { animations } from "@/lib/animations"

export default function DashboardPage() {
  const { scrollYProgress } = useScroll()
  const headerY = useTransform(scrollYProgress, [0, 0.2], [0, -20])

  const stats = {
    todayAppointments: 8,
    weekRevenue: 1250,
    newClients: 5,
    occupancy: 75,
  }

  const upcomingAppointments = [
    {
      id: 1,
      time: "09:00",
      client: "Jean Dupont",
      service: "Coupe + Barbe",
      status: "CONFIRMED",
      barber: "Marc",
      avatar: "JD",
    },
    {
      id: 2,
      time: "10:30",
      client: "Marie Martin",
      service: "Coupe Homme",
      status: "CONFIRMED",
      barber: "Marc",
      avatar: "MM",
    },
    {
      id: 3,
      time: "14:00",
      client: "Pierre Bernard",
      service: "Barbe",
      status: "IN_PROGRESS",
      barber: "Marc",
      avatar: "PB",
    },
  ]

  const popularServices = [
    { name: "Coupe + Barbe", count: 45, revenue: 2250, trend: 15 },
    { name: "Coupe Classique", count: 38, revenue: 1330, trend: 8 },
    { name: "Entretien Barbe", count: 22, revenue: 550, trend: -3 },
  ]

  return (
    <div className="relative min-h-screen">
      {/* Animated Background Blobs */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-[rgb(139,69,19)]/5 to-[rgb(10,22,40)]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[rgb(16,185,129)]/5 to-[rgb(59,130,246)]/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="space-y-8">
        {/* Premium Header with Parallax */}
        <motion.div
          style={{ y: headerY }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: animations.easings.elegant }}
          className="relative"
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{
                    rotate: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                    scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  }}
                >
                  <Sparkles className="w-8 h-8 text-[rgb(234,179,8)]" />
                </motion.div>
                <h1 className="text-5xl font-[family-name:var(--font-playfair)] font-bold">
                  <span className="text-gradient-gentleman">Tableau de bord</span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-gray-600 text-lg"
              >
                Vue d&apos;ensemble de votre activité aujourd&apos;hui
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="lg"
                className="glass-premium border-2 border-[rgb(139,69,19)]/20 hover:border-[rgb(139,69,19)]/40 bg-gradient-to-r from-[rgb(10,22,40)] to-[rgb(139,69,19)] text-white shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                <Plus className="w-5 h-5 mr-2 group-hover:rotate-90 transition-transform duration-300" />
                Nouveau RDV
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* KPI Cards with Stagger */}
        <motion.div
          variants={animations.staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <KPICard
            title="RDV Aujourd'hui"
            value={stats.todayAppointments}
            icon={Calendar}
            trend={25}
            trendLabel="vs hier"
            color="primary"
            delay={0}
          />
          <KPICard
            title="Revenus Semaine"
            value={stats.weekRevenue}
            unit="€"
            icon={Euro}
            trend={12}
            trendLabel="vs semaine dernière"
            color="emerald"
            delay={0.1}
          />
          <KPICard
            title="Nouveaux Clients"
            value={stats.newClients}
            icon={Users}
            trend={-5}
            trendLabel="ce mois"
            color="mocha"
            delay={0.2}
          />
          <KPICard
            title="Taux d'Occupation"
            value={stats.occupancy}
            unit="%"
            icon={TrendingUp}
            trend={8}
            trendLabel="cette semaine"
            color="gold"
            delay={0.3}
          />
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Premium Upcoming Appointments */}
          <motion.div
            variants={animations.scrollFadeIn}
            initial="initial"
            animate="whileInView"
            viewport={{ once: true }}
          >
            <Card className="glass-premium border-2 border-[rgb(10,22,40)]/10 hover:border-[rgb(10,22,40)]/20 transition-all duration-500 hover-lift-3d preserve-3d overflow-hidden group">
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-[rgb(10,22,40)] to-[rgb(8,18,32)] shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-[family-name:var(--font-playfair)]">
                    Prochains rendez-vous
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-4">
                {upcomingAppointments.map((appointment, index) => (
                  <motion.div
                    key={appointment.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 8, scale: 1.02 }}
                    className="glass-premium p-4 rounded-xl border-2 border-[rgb(245,230,211)]/10 hover:border-[rgb(139,69,19)]/30 transition-all duration-300 cursor-pointer group/item"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar with gradient */}
                        <motion.div
                          className="relative w-12 h-12 rounded-full bg-gradient-to-br from-[rgb(139,69,19)] to-[rgb(110,55,15)] flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <span className="text-white font-bold text-sm">
                            {appointment.avatar}
                          </span>
                          {appointment.status === "IN_PROGRESS" && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-4 h-4 bg-[rgb(16,185,129)] rounded-full border-2 border-white"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>

                        <div>
                          <p className="font-semibold text-gray-900 group-hover/item:text-[rgb(139,69,19)] transition-colors">
                            {appointment.client}
                          </p>
                          <p className="text-sm text-gray-600 flex items-center gap-2">
                            <Scissors className="w-3 h-3" />
                            {appointment.service}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-lg text-[rgb(10,22,40)]">
                            {appointment.time}
                          </p>
                          <Badge
                            variant={
                              appointment.status === "IN_PROGRESS"
                                ? "default"
                                : "outline"
                            }
                            className={`mt-1 ${
                              appointment.status === "IN_PROGRESS"
                                ? "bg-gradient-to-r from-[rgb(16,185,129)] to-[rgb(5,150,105)] text-white border-0"
                                : "border-[rgb(10,22,40)]/20"
                            }`}
                          >
                            {appointment.status === "CONFIRMED" && (
                              <>
                                <CheckCircle2 className="w-3 h-3 mr-1" />
                                Confirmé
                              </>
                            )}
                            {appointment.status === "IN_PROGRESS" && (
                              <>
                                <Clock className="w-3 h-3 mr-1" />
                                En cours
                              </>
                            )}
                          </Badge>
                        </div>
                        <ArrowRight className="w-4 h-4 text-gray-400 group-hover/item:text-[rgb(139,69,19)] group-hover/item:translate-x-1 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Premium Popular Services */}
          <motion.div
            variants={animations.scrollFadeIn}
            initial="initial"
            animate="whileInView"
            viewport={{ once: true }}
          >
            <Card className="glass-premium border-2 border-[rgb(139,69,19)]/10 hover:border-[rgb(139,69,19)]/20 transition-all duration-500 hover-lift-3d preserve-3d overflow-hidden group">
              {/* Shimmer effect */}
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-gradient-to-br from-[rgb(139,69,19)] to-[rgb(110,55,15)] shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-[family-name:var(--font-playfair)]">
                    Services populaires
                  </span>
                </CardTitle>
              </CardHeader>

              <CardContent className="relative z-10 space-y-5">
                {popularServices.map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgb(139,69,19)]/10 to-[rgb(139,69,19)]/20 flex items-center justify-center border border-[rgb(139,69,19)]/20"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Scissors className="w-6 h-6 text-[rgb(139,69,19)]" />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {service.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>{service.count} réservations</span>
                            <span className={`flex items-center gap-1 font-semibold ${service.trend >= 0 ? "text-[rgb(16,185,129)]" : "text-[rgb(239,68,68)]"}`}>
                              {service.trend >= 0 ? "↑" : "↓"}
                              {Math.abs(service.trend)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.p
                          className="font-bold text-2xl text-gradient-gentleman"
                          whileHover={{ scale: 1.1 }}
                        >
                          {service.revenue}€
                        </motion.p>
                      </div>
                    </div>

                    {/* Progress bar with gradient */}
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(service.count / 50) * 100}%` }}
                        transition={{
                          delay: 0.7 + index * 0.1,
                          duration: 1,
                          ease: animations.easings.smooth,
                        }}
                        className="h-full bg-gradient-to-r from-[rgb(10,22,40)] via-[rgb(139,69,19)] to-[rgb(234,179,8)] relative overflow-hidden"
                      >
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                          animate={{
                            x: ["-100%", "200%"],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "linear",
                            delay: 1 + index * 0.1,
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Premium Quick Actions */}
        <motion.div
          variants={animations.staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-3"
        >
          <motion.div variants={animations.staggerItem} whileHover="hover">
            <Card className="glass-dark text-white hover-lift-3d preserve-3d cursor-pointer overflow-hidden group border-2 border-white/10 hover:border-white/20 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(10,22,40)] via-[rgb(139,69,19)]/20 to-[rgb(10,22,40)] opacity-90" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="relative z-10 p-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Calendar className="w-10 h-10 mb-4 text-[rgb(234,179,8)]" />
                </motion.div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2">
                  Calendrier
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  Consultez et gérez tous vos rendez-vous
                </p>
                <ArrowRight className="w-5 h-5 mt-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={animations.staggerItem} whileHover="hover">
            <Card className="glass-premium hover-lift-3d preserve-3d cursor-pointer overflow-hidden group border-2 border-[rgb(16,185,129)]/20 hover:border-[rgb(16,185,129)]/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(16,185,129)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="relative z-10 p-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Users className="w-10 h-10 mb-4 text-[rgb(16,185,129)]" />
                </motion.div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-[rgb(10,22,40)]">
                  Clients
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Accédez à la liste de tous vos clients
                </p>
                <ArrowRight className="w-5 h-5 mt-4 text-[rgb(16,185,129)] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={animations.staggerItem} whileHover="hover">
            <Card className="glass-premium hover-lift-3d preserve-3d cursor-pointer overflow-hidden group border-2 border-[rgb(139,69,19)]/20 hover:border-[rgb(139,69,19)]/40 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-br from-[rgb(139,69,19)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <CardContent className="relative z-10 p-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="w-10 h-10 mb-4 text-[rgb(139,69,19)]" />
                </motion.div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-[rgb(10,22,40)]">
                  Services
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Gérez vos services et tarifs
                </p>
                <ArrowRight className="w-5 h-5 mt-4 text-[rgb(139,69,19)] opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
