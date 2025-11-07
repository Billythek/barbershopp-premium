"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Scissors,
  Search,
  Filter,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Ban,
} from "lucide-react"
import { animations } from "@/lib/animations"
import { AppointmentsCalendar } from "@/components/admin/AppointmentsCalendar"

type AppointmentStatus = "CONFIRMED" | "IN_PROGRESS" | "COMPLETED" | "CANCELLED"

interface Appointment {
  id: number
  clientName: string
  phone: string
  email?: string
  date: string
  time: string
  service: string
  barber: string
  status: AppointmentStatus
  notes?: string
  avatar: string
}

export default function AppointmentsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | "ALL">("ALL")

  // Fonction pour calculer le statut automatiquement
  const calculateStatus = (date: string, time: string, currentStatus: AppointmentStatus): AppointmentStatus => {
    // Si le rendez-vous est annulé, on garde ce statut
    if (currentStatus === "CANCELLED") {
      return "CANCELLED"
    }

    const appointmentDateTime = new Date(`${date}T${time}`)
    const now = new Date()

    // Durée moyenne d'un rendez-vous (en minutes)
    const appointmentDuration = 45
    const appointmentEndTime = new Date(appointmentDateTime.getTime() + appointmentDuration * 60000)

    // Si le rendez-vous est terminé (l'heure de fin est passée)
    if (now > appointmentEndTime) {
      return "COMPLETED"
    }

    // Si le rendez-vous est en cours (entre l'heure de début et de fin)
    if (now >= appointmentDateTime && now <= appointmentEndTime) {
      return "IN_PROGRESS"
    }

    // Sinon, le rendez-vous est à venir
    return "CONFIRMED"
  }

  // Données d'exemple
  const [appointments, setAppointments] = useState<Appointment[]>([
    {
      id: 1,
      clientName: "Jean Dupont",
      phone: "+33 6 12 34 56 78",
      email: "jean.dupont@email.com",
      date: "2025-11-07",
      time: "09:00",
      service: "Coupe + Barbe",
      barber: "Marc",
      status: "CONFIRMED",
      avatar: "JD",
    },
    {
      id: 2,
      clientName: "Marie Martin",
      phone: "+33 6 98 76 54 32",
      date: "2025-11-07",
      time: "10:30",
      service: "Coupe Classique",
      barber: "Marc",
      status: "CONFIRMED",
      avatar: "MM",
    },
    {
      id: 3,
      clientName: "Pierre Bernard",
      phone: "+33 6 55 44 33 22",
      date: "2025-11-06",
      time: "14:00",
      service: "Entretien Barbe",
      barber: "Marc",
      status: "IN_PROGRESS",
      avatar: "PB",
    },
    {
      id: 4,
      clientName: "Sophie Leroy",
      phone: "+33 6 11 22 33 44",
      date: "2025-11-06",
      time: "11:00",
      service: "Coupe Enfant",
      barber: "Jean",
      status: "COMPLETED",
      avatar: "SL",
    },
    {
      id: 5,
      clientName: "Thomas Dubois",
      phone: "+33 6 99 88 77 66",
      date: "2025-11-05",
      time: "15:30",
      service: "Rasage Traditionnel",
      barber: "Pierre",
      status: "CANCELLED",
      notes: "Client a annulé",
      avatar: "TD",
    },
  ])

  // Mettre à jour les statuts automatiquement
  useEffect(() => {
    const updateStatuses = () => {
      setAppointments((prevAppointments) =>
        prevAppointments.map((apt) => ({
          ...apt,
          status: calculateStatus(apt.date, apt.time, apt.status),
        }))
      )
    }

    // Mettre à jour immédiatement
    updateStatuses()

    // Mettre à jour toutes les minutes
    const interval = setInterval(updateStatuses, 60000)

    return () => clearInterval(interval)
  }, [])

  const getStatusBadge = (status: AppointmentStatus) => {
    const statusConfig = {
      CONFIRMED: {
        label: "Bientôt",
        dotColor: "bg-blue-500",
        textColor: "text-black",
      },
      IN_PROGRESS: {
        label: "En cours",
        dotColor: "bg-orange-500",
        textColor: "text-black",
      },
      COMPLETED: {
        label: "Terminé",
        dotColor: "bg-green-500",
        textColor: "text-black",
      },
      CANCELLED: {
        label: "Annulé",
        dotColor: "bg-red-500",
        textColor: "text-black",
      },
    }

    const config = statusConfig[status]

    return (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${config.dotColor}`} />
        <span className={`text-sm font-medium ${config.textColor}`}>
          {config.label}
        </span>
      </div>
    )
  }

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      apt.phone.includes(searchQuery) ||
      apt.service.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesFilter = filterStatus === "ALL" || apt.status === filterStatus

    return matchesSearch && matchesFilter
  })

  const handleDelete = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir supprimer ce rendez-vous ?")) {
      setAppointments(appointments.filter((apt) => apt.id !== id))
    }
  }

  const handleCancel = (id: number) => {
    if (confirm("Êtes-vous sûr de vouloir annuler ce rendez-vous ?")) {
      setAppointments(
        appointments.map((apt) =>
          apt.id === id ? { ...apt, status: "CANCELLED" } : apt
        )
      )
    }
  }

  return (
    <div className="relative min-h-screen bg-white">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: animations.easings.elegant }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <Calendar className="w-8 h-8 text-black" />
              <h1 className="text-5xl font-[family-name:var(--font-playfair)] font-bold text-black">
                Gestion des Rendez-vous
              </h1>
            </div>
            <p className="text-black text-lg">
              Consultez et gérez tous vos rendez-vous
            </p>
          </div>
        </motion.div>

        {/* Calendrier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <AppointmentsCalendar />
        </motion.div>

        {/* Filtres et recherche */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Rechercher par nom, téléphone ou service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 border-gray-200 focus:border-black"
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filterStatus === "ALL" ? "default" : "outline"}
              onClick={() => setFilterStatus("ALL")}
              className={
                filterStatus === "ALL"
                  ? "bg-black text-white"
                  : "border-gray-200 text-black hover:bg-gray-100"
              }
            >
              Tous
            </Button>
            <Button
              variant={filterStatus === "CONFIRMED" ? "default" : "outline"}
              onClick={() => setFilterStatus("CONFIRMED")}
              className={
                filterStatus === "CONFIRMED"
                  ? "bg-black text-white"
                  : "border-gray-200 text-black hover:bg-gray-100"
              }
            >
              Bientôt
            </Button>
            <Button
              variant={filterStatus === "IN_PROGRESS" ? "default" : "outline"}
              onClick={() => setFilterStatus("IN_PROGRESS")}
              className={
                filterStatus === "IN_PROGRESS"
                  ? "bg-black text-white"
                  : "border-gray-200 text-black hover:bg-gray-100"
              }
            >
              En cours
            </Button>
            <Button
              variant={filterStatus === "COMPLETED" ? "default" : "outline"}
              onClick={() => setFilterStatus("COMPLETED")}
              className={
                filterStatus === "COMPLETED"
                  ? "bg-black text-white"
                  : "border-gray-200 text-black hover:bg-gray-100"
              }
            >
              Terminé
            </Button>
            <Button
              variant={filterStatus === "CANCELLED" ? "default" : "outline"}
              onClick={() => setFilterStatus("CANCELLED")}
              className={
                filterStatus === "CANCELLED"
                  ? "bg-black text-white"
                  : "border-gray-200 text-black hover:bg-gray-100"
              }
            >
              Annulé
            </Button>
          </div>
        </motion.div>

        {/* Liste des rendez-vous */}
        <div className="space-y-4">
          {filteredAppointments.length === 0 ? (
            <Card className="bg-white border-2 border-gray-200">
              <CardContent className="p-12 text-center">
                <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-black mb-2">
                  Aucun rendez-vous trouvé
                </h3>
                <p className="text-black">
                  {searchQuery
                    ? "Essayez de modifier votre recherche"
                    : "Créez votre premier rendez-vous"}
                </p>
              </CardContent>
            </Card>
          ) : (
            filteredAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Card className="bg-white border-2 border-gray-200 hover:border-gray-400 transition-all duration-300 group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-6 flex-1">
                        {/* Avatar */}
                        <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center shadow-lg">
                          <span className="text-white font-bold text-lg">
                            {appointment.avatar}
                          </span>
                        </div>

                        {/* Info client */}
                        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <User className="w-4 h-4 text-black" />
                              <span className="font-semibold text-black">
                                {appointment.clientName}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-black">
                              <Phone className="w-3 h-3" />
                              {appointment.phone}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Calendar className="w-4 h-4 text-black" />
                              <span className="font-semibold text-black">
                                {new Date(appointment.date).toLocaleDateString("fr-FR")}
                              </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-black">
                              <Clock className="w-3 h-3" />
                              {appointment.time}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <Scissors className="w-4 h-4 text-black" />
                              <span className="font-semibold text-black">
                                {appointment.service}
                              </span>
                            </div>
                            <div className="text-sm text-black">
                              Barbier: {appointment.barber}
                            </div>
                          </div>

                          <div className="flex items-center">
                            {getStatusBadge(appointment.status)}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center gap-2 ml-4">
                        {appointment.status !== "CANCELLED" && appointment.status !== "COMPLETED" && (
                          <Button
                            size="sm"
                            onClick={() => handleCancel(appointment.id)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Annuler
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-gray-200 text-black hover:bg-gray-100"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDelete(appointment.id)}
                          className="border-gray-200 text-black hover:bg-red-50 hover:border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>

                    {/* Notes */}
                    {appointment.notes && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-sm text-black">
                          <strong>Notes:</strong> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
