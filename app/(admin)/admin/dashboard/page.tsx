"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion, useScroll, useTransform } from "framer-motion"
import { KPICard } from "@/components/shared/KPICard"
import { AppointmentForm } from "@/components/shared/AppointmentForm"
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
import { RevenueChart } from "@/components/admin/RevenueChart"
import { ServicesChart } from "@/components/admin/ServicesChart"

export default function DashboardPage() {
  const router = useRouter()
  const [isAppointmentFormOpen, setIsAppointmentFormOpen] = useState(false)
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
    <div className="relative min-h-screen bg-white">
      {/* Removed Animated Background Blobs for clean white background */}

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
                  <Sparkles className="w-8 h-8 text-black" />
                </motion.div>
                <h1 className="text-5xl font-[family-name:var(--font-playfair)] font-bold">
                  <span className="text-black">Tableau de bord</span>
                </h1>
              </motion.div>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-black text-lg"
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
                onClick={() => setIsAppointmentFormOpen(true)}
                className="border-2 border-black bg-black text-white shadow-xl hover:shadow-2xl hover:bg-gray-800 transition-all duration-300 group"
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

        {/* Charts Section */}
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            <RevenueChart />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <ServicesChart />
          </motion.div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Premium Upcoming Appointments */}
          <motion.div
            variants={animations.scrollFadeIn}
            initial="initial"
            animate="whileInView"
            viewport={{ once: true }}
          >
            <Card className="bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 hover-lift-3d preserve-3d overflow-hidden group">
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-black shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Clock className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-[family-name:var(--font-playfair)] text-black">
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
                    className="bg-gray-50 p-4 rounded-xl border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 cursor-pointer group/item"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Avatar with gradient */}
                        <motion.div
                          className="relative w-12 h-12 rounded-full bg-black flex items-center justify-center shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          <span className="text-white font-bold text-sm">
                            {appointment.avatar}
                          </span>
                          {appointment.status === "IN_PROGRESS" && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-4 h-4 bg-black rounded-full border-2 border-white"
                              animate={{ scale: [1, 1.2, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          )}
                        </motion.div>

                        <div>
                          <p className="font-semibold text-black group-hover/item:text-gray-700 transition-colors">
                            {appointment.client}
                          </p>
                          <p className="text-sm text-black flex items-center gap-2">
                            <Scissors className="w-3 h-3" />
                            {appointment.service}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="font-bold text-lg text-black">
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
                                ? "bg-black text-white border-0"
                                : "border-black text-black"
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
                        <ArrowRight className="w-4 h-4 text-black group-hover/item:text-gray-700 group-hover/item:translate-x-1 transition-all" />
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
            <Card className="bg-white border-2 border-gray-200 hover:border-gray-300 transition-all duration-500 hover-lift-3d preserve-3d overflow-hidden group">
              <CardHeader className="relative z-10">
                <CardTitle className="flex items-center gap-3">
                  <motion.div
                    className="p-2 rounded-lg bg-black shadow-lg"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Star className="w-5 h-5 text-white" />
                  </motion.div>
                  <span className="text-xl font-[family-name:var(--font-playfair)] text-black">
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
                          className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center border border-gray-300"
                          whileHover={{ rotate: 360, scale: 1.1 }}
                          transition={{ duration: 0.6 }}
                        >
                          <Scissors className="w-6 h-6 text-black" />
                        </motion.div>
                        <div>
                          <p className="font-semibold text-black">
                            {service.name}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-black">
                            <span>{service.count} réservations</span>
                            <span className={`flex items-center gap-1 font-semibold text-black`}>
                              {service.trend >= 0 ? "↑" : "↓"}
                              {Math.abs(service.trend)}%
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <motion.p
                          className="font-bold text-2xl text-black"
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
                        className="h-full bg-black relative overflow-hidden"
                      />
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
          <motion.div
            variants={animations.staggerItem}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <Card
              onClick={() => router.push("/admin/appointments")}
              className="bg-white preserve-3d cursor-pointer overflow-hidden group border-2 border-gray-200 hover:border-black transition-all duration-300"
            >
              <CardContent className="relative z-10 p-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Calendar className="w-10 h-10 mb-4 text-black" />
                </motion.div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-black">
                  Calendrier
                </h3>
                <p className="text-black text-sm leading-relaxed">
                  Consultez et gérez tous vos rendez-vous
                </p>
                <ArrowRight className="w-5 h-5 mt-4 text-black opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            variants={animations.staggerItem}
            whileHover="hover"
            whileTap={{ scale: 0.98 }}
          >
            <Card
              onClick={() => router.push("/admin/clients")}
              className="bg-white preserve-3d cursor-pointer overflow-hidden group border-2 border-gray-200 hover:border-black transition-all duration-300"
            >
              <CardContent className="relative z-10 p-8">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Users className="w-10 h-10 mb-4 text-black" />
                </motion.div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-black">
                  Clients
                </h3>
                <p className="text-black text-sm leading-relaxed">
                  Accédez à la liste de tous vos clients
                </p>
                <ArrowRight className="w-5 h-5 mt-4 text-black opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={animations.staggerItem} whileHover="hover">
            <Card className="bg-white hover-lift-3d preserve-3d cursor-pointer overflow-hidden group border-2 border-gray-200 hover:border-gray-300 transition-all duration-500">
              <CardContent className="relative z-10 p-8">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <Award className="w-10 h-10 mb-4 text-black" />
                </motion.div>
                <h3 className="text-2xl font-[family-name:var(--font-playfair)] font-bold mb-2 text-black">
                  Services
                </h3>
                <p className="text-black text-sm leading-relaxed">
                  Gérez vos services et tarifs
                </p>
                <ArrowRight className="w-5 h-5 mt-4 text-black opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>

      {/* Formulaire de rendez-vous */}
      <AppointmentForm
        open={isAppointmentFormOpen}
        onOpenChange={setIsAppointmentFormOpen}
      />
    </div>
  )
}
