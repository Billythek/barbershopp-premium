"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Calendar, Clock, User, Phone, Mail, Scissors } from "lucide-react"

interface AppointmentFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AppointmentForm({ open, onOpenChange }: AppointmentFormProps) {
  const [formData, setFormData] = useState({
    clientName: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    service: "",
    barber: "",
    notes: "",
  })

  const services = [
    "Coupe Classique",
    "Coupe + Barbe",
    "Entretien Barbe",
    "Coupe Enfant",
    "Rasage Traditionnel",
  ]

  const barbers = ["Marc", "Jean", "Pierre"]

  const timeSlots = [
    "09:00",
    "09:30",
    "10:00",
    "10:30",
    "11:00",
    "11:30",
    "14:00",
    "14:30",
    "15:00",
    "15:30",
    "16:00",
    "16:30",
    "17:00",
    "17:30",
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Nouveau rendez-vous:", formData)
    // Ici vous pouvez ajouter la logique pour sauvegarder le rendez-vous
    onOpenChange(false)
    // Réinitialiser le formulaire
    setFormData({
      clientName: "",
      phone: "",
      email: "",
      date: "",
      time: "",
      service: "",
      barber: "",
      notes: "",
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-black flex items-center gap-2">
            <Calendar className="w-6 h-6" />
            Nouveau Rendez-vous
          </DialogTitle>
          <DialogDescription className="text-black">
            Remplissez les informations pour créer un nouveau rendez-vous
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Informations client */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <User className="w-5 h-5" />
              Informations Client
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="clientName" className="text-black">
                  Nom complet *
                </Label>
                <Input
                  id="clientName"
                  placeholder="Jean Dupont"
                  value={formData.clientName}
                  onChange={(e) =>
                    setFormData({ ...formData, clientName: e.target.value })
                  }
                  required
                  className="border-gray-200 focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-black flex items-center gap-1">
                  <Phone className="w-4 h-4" />
                  Téléphone *
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="+33 6 12 34 56 78"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                  className="border-gray-200 focus:border-black"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-black flex items-center gap-1">
                <Mail className="w-4 h-4" />
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jean.dupont@email.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border-gray-200 focus:border-black"
              />
            </div>
          </div>

          {/* Détails du rendez-vous */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-black flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Détails du Rendez-vous
            </h3>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="date" className="text-black">
                  Date *
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                  className="border-gray-200 focus:border-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="text-black flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  Heure *
                </Label>
                <Select
                  value={formData.time}
                  onValueChange={(value) =>
                    setFormData({ ...formData, time: value })
                  }
                  required
                >
                  <SelectTrigger className="border-gray-200 focus:border-black">
                    <SelectValue placeholder="Sélectionner l'heure" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {timeSlots.map((time) => (
                      <SelectItem key={time} value={time} className="text-black">
                        {time}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="service" className="text-black flex items-center gap-1">
                  <Scissors className="w-4 h-4" />
                  Service *
                </Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) =>
                    setFormData({ ...formData, service: value })
                  }
                  required
                >
                  <SelectTrigger className="border-gray-200 focus:border-black">
                    <SelectValue placeholder="Sélectionner le service" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {services.map((service) => (
                      <SelectItem key={service} value={service} className="text-black">
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="barber" className="text-black">
                  Barbier *
                </Label>
                <Select
                  value={formData.barber}
                  onValueChange={(value) =>
                    setFormData({ ...formData, barber: value })
                  }
                  required
                >
                  <SelectTrigger className="border-gray-200 focus:border-black">
                    <SelectValue placeholder="Sélectionner le barbier" />
                  </SelectTrigger>
                  <SelectContent className="bg-white">
                    {barbers.map((barber) => (
                      <SelectItem key={barber} value={barber} className="text-black">
                        {barber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes" className="text-black">
                Notes (optionnel)
              </Label>
              <Textarea
                id="notes"
                placeholder="Informations supplémentaires..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="border-gray-200 focus:border-black min-h-[100px]"
              />
            </div>
          </div>

          {/* Boutons */}
          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="border-gray-200 text-black hover:bg-gray-100"
            >
              Annuler
            </Button>
            <Button
              type="submit"
              className="bg-black text-white hover:bg-gray-800"
            >
              Créer le rendez-vous
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
