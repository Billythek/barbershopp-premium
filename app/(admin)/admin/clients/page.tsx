"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { KPICard } from "@/components/shared/KPICard"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Users,
  UserPlus,
  TrendingUp,
  Euro,
  Search,
  Phone,
  Mail,
  Calendar,
  Star,
  Download,
  MessageSquare,
  Send,
  Heart,
  AlertCircle,
  Clock,
  ThumbsUp,
  X,
  ChevronRight,
} from "lucide-react"
import { animations } from "@/lib/animations"

interface Client {
  id: number
  firstName: string
  lastName: string
  phone: string
  email: string
  lastVisit: string
  loyalty: "VIP" | "Fidèle" | "Nouveau" | "Sensible"
  appointmentsCount: number
  totalSpent: number
  notes: string
  birthday?: string
  averageRating?: number
}

// Interface pour les avis clients
interface Review {
  id: number
  clientId: number
  clientName: string
  rating: number
  comment: string
  date: string
  status: "pending" | "responded"
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedClient, setSelectedClient] = useState<Client | null>(null)
  const [activeTab, setActiveTab] = useState<"history" | "services" | "amounts" | "reviews" | "notes">("history")

  // États pour les panneaux de notifications
  const [showInactiveClientsPanel, setShowInactiveClientsPanel] = useState(false)
  const [showReviewsPanel, setShowReviewsPanel] = useState(false)

  // KPI Stats
  const stats = {
    totalClients: 247,
    newThisMonth: 18,
    retentionRate: 87,
    averageBasket: 45,
  }

  // Données clients exemple
  const [clients] = useState<Client[]>([
    {
      id: 1,
      firstName: "Jean",
      lastName: "Dupont",
      phone: "+33 6 12 34 56 78",
      email: "jean.dupont@email.com",
      lastVisit: "2025-11-05",
      loyalty: "VIP",
      appointmentsCount: 24,
      totalSpent: 1200,
      notes: "Préfère les RDV le matin",
      birthday: "1985-03-15",
      averageRating: 5,
    },
    {
      id: 2,
      firstName: "Marie",
      lastName: "Martin",
      phone: "+33 6 98 76 54 32",
      email: "marie.martin@email.com",
      lastVisit: "2025-11-06",
      loyalty: "Fidèle",
      appointmentsCount: 12,
      totalSpent: 540,
      notes: "",
      birthday: "1990-07-22",
      averageRating: 4.5,
    },
    {
      id: 3,
      firstName: "Pierre",
      lastName: "Bernard",
      phone: "+33 6 55 44 33 22",
      email: "pierre.bernard@email.com",
      lastVisit: "2025-10-15",
      loyalty: "Sensible",
      appointmentsCount: 8,
      totalSpent: 320,
      notes: "Nécessite plus d'attention",
      averageRating: 3.5,
    },
    {
      id: 4,
      firstName: "Sophie",
      lastName: "Leroy",
      phone: "+33 6 11 22 33 44",
      email: "sophie.leroy@email.com",
      lastVisit: "2025-11-07",
      loyalty: "Nouveau",
      appointmentsCount: 2,
      totalSpent: 80,
      notes: "",
      birthday: "1995-12-10",
    },
  ])

  // Données pour les clients inactifs (dernière visite > 30 jours)
  const inactiveClients = clients.filter((client) => {
    const lastVisitDate = new Date(client.lastVisit)
    const daysSinceVisit = Math.floor(
      (new Date().getTime() - lastVisitDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    return daysSinceVisit > 30
  })

  // Données exemple pour les avis en attente
  const [pendingReviews] = useState<Review[]>([
    {
      id: 1,
      clientId: 1,
      clientName: "Jean Dupont",
      rating: 5,
      comment: "Excellent service, très professionnel. Je recommande vivement !",
      date: "2025-11-05",
      status: "pending",
    },
    {
      id: 2,
      clientId: 2,
      clientName: "Marie Martin",
      rating: 4,
      comment: "Très bien, mais un peu d'attente. Résultat impeccable.",
      date: "2025-11-06",
      status: "pending",
    },
    {
      id: 3,
      clientId: 3,
      clientName: "Pierre Bernard",
      rating: 3,
      comment: "Service correct mais j'attendais mieux pour le prix.",
      date: "2025-10-28",
      status: "pending",
    },
    {
      id: 4,
      clientId: 4,
      clientName: "Sophie Leroy",
      rating: 5,
      comment: "Parfait ! Très à l'écoute et excellent travail.",
      date: "2025-11-07",
      status: "pending",
    },
    {
      id: 5,
      clientId: 1,
      clientName: "Jean Dupont",
      rating: 5,
      comment: "Toujours aussi satisfait, merci !",
      date: "2025-11-04",
      status: "pending",
    },
  ])

  const getLoyaltyBadge = (loyalty: Client["loyalty"]) => {
    const config = {
      VIP: { color: "bg-yellow-500", icon: Star },
      Fidèle: { color: "bg-green-500", icon: Heart },
      Nouveau: { color: "bg-blue-500", icon: UserPlus },
      Sensible: { color: "bg-orange-500", icon: AlertCircle },
    }
    const { color, icon: Icon } = config[loyalty]
    return (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${color}`} />
        <Icon className="w-3 h-3 text-black" />
        <span className="text-sm font-medium text-black">{loyalty}</span>
      </div>
    )
  }

  const filteredClients = clients.filter(
    (client) =>
      client.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="relative min-h-screen bg-white">
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-black" />
                <h1 className="text-5xl font-[family-name:var(--font-playfair)] font-bold text-black">
                  Gestion des Clients
                </h1>
              </div>
              <p className="text-black text-lg">
                Consultez et gérez votre base clients
              </p>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-gray-200 text-black hover:bg-gray-100"
              >
                <Download className="w-4 h-4 mr-2" />
                Exporter
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                <UserPlus className="w-4 h-4 mr-2" />
                Ajouter un client
              </Button>
            </div>
          </div>
        </motion.div>

        {/* KPI Cards */}
        <motion.div
          variants={animations.staggerContainer}
          initial="initial"
          animate="animate"
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          <KPICard
            title="Total Clients"
            value={stats.totalClients}
            icon={Users}
            trend={12}
            trendLabel="vs mois dernier"
            color="primary"
            delay={0}
          />
          <KPICard
            title="Nouveaux du Mois"
            value={stats.newThisMonth}
            icon={UserPlus}
            trend={8}
            trendLabel="vs mois dernier"
            color="emerald"
            delay={0.1}
          />
          <KPICard
            title="Taux de Fidélisation"
            value={stats.retentionRate}
            unit="%"
            icon={Heart}
            trend={5}
            trendLabel="vs mois dernier"
            color="mocha"
            delay={0.2}
          />
          <KPICard
            title="Panier Moyen"
            value={stats.averageBasket}
            unit="€"
            icon={Euro}
            trend={3}
            trendLabel="vs mois dernier"
            color="gold"
            delay={0.3}
          />
        </motion.div>

        {/* Points d'attention - Section modifiée pour contexte barbier */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="bg-white border-2 border-gray-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-black">
                <AlertCircle className="w-5 h-5" />
                Points d'attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 md:grid-cols-2">
                {/* Carte Clients inactifs - Cliquable */}
                <motion.div
                  onClick={() => setShowInactiveClientsPanel(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-4 bg-orange-50 rounded-lg border border-orange-200 cursor-pointer hover:border-orange-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-orange-600" />
                    <div>
                      <p className="text-sm font-semibold text-black">
                        {inactiveClients.length} Clients inactifs
                      </p>
                      <p className="text-xs text-black">+30 jours sans RDV</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-orange-600" />
                </motion.div>

                {/* Carte Avis à traiter - Cliquable */}
                <motion.div
                  onClick={() => setShowReviewsPanel(true)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-between p-4 bg-green-50 rounded-lg border border-green-200 cursor-pointer hover:border-green-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <ThumbsUp className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-black">
                        {pendingReviews.length} Avis à traiter
                      </p>
                      <p className="text-xs text-black">En attente de réponse</p>
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-green-600" />
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recherche et Liste */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Liste des clients */}
          <div className="lg:col-span-2 space-y-4">
            {/* Barre de recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Rechercher un client (nom, téléphone, email)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-gray-200 focus:border-black"
              />
            </div>

            {/* Tableau des clients */}
            <Card className="bg-white border-2 border-gray-200">
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                          Client
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                          Contact
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                          Dernière visite
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                          Statut
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                          RDV
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-semibold text-black uppercase">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {filteredClients.map((client) => (
                        <motion.tr
                          key={client.id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          onClick={() => setSelectedClient(client)}
                          className={`hover:bg-gray-50 cursor-pointer transition-colors ${
                            selectedClient?.id === client.id ? "bg-gray-100" : ""
                          }`}
                        >
                          <td className="px-4 py-4">
                            <div>
                              <p className="font-semibold text-black">
                                {client.firstName} {client.lastName}
                              </p>
                              {client.averageRating && (
                                <div className="flex items-center gap-1 mt-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  <span className="text-xs text-black">{client.averageRating}</span>
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <div className="space-y-1">
                              <p className="text-sm text-black flex items-center gap-1">
                                <Phone className="w-3 h-3" />
                                {client.phone}
                              </p>
                              <p className="text-sm text-black flex items-center gap-1">
                                <Mail className="w-3 h-3" />
                                {client.email}
                              </p>
                            </div>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm text-black">
                              {new Date(client.lastVisit).toLocaleDateString("fr-FR")}
                            </p>
                          </td>
                          <td className="px-4 py-4">{getLoyaltyBadge(client.loyalty)}</td>
                          <td className="px-4 py-4">
                            <p className="text-sm font-semibold text-black">
                              {client.appointmentsCount}
                            </p>
                          </td>
                          <td className="px-4 py-4">
                            <p className="text-sm font-semibold text-black">
                              {client.totalSpent}€
                            </p>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Fiche client */}
          <div className="lg:col-span-1">
            {selectedClient ? (
              <Card className="bg-white border-2 border-gray-200 sticky top-4">
                <CardHeader className="border-b border-gray-200">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-black">
                        {selectedClient.firstName} {selectedClient.lastName}
                      </CardTitle>
                      <div className="mt-2">{getLoyaltyBadge(selectedClient.loyalty)}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedClient(null)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>

                <CardContent className="p-4 space-y-4">
                  {/* Actions rapides */}
                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-200 text-black hover:bg-gray-100"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Appeler
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-200 text-black hover:bg-gray-100"
                    >
                      <MessageSquare className="w-4 h-4 mr-2" />
                      SMS
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-gray-200 text-black hover:bg-gray-100 col-span-2"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Envoyer un email
                    </Button>
                  </div>

                  {/* Informations */}
                  <div className="space-y-3 pt-4 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-black" />
                      <span className="text-sm text-black">{selectedClient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-black" />
                      <span className="text-sm text-black">{selectedClient.email}</span>
                    </div>
                    {selectedClient.birthday && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-black" />
                        <span className="text-sm text-black">
                          Né(e) le {new Date(selectedClient.birthday).toLocaleDateString("fr-FR")}
                        </span>
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-black" />
                      <span className="text-sm text-black">
                        Dernière visite:{" "}
                        {new Date(selectedClient.lastVisit).toLocaleDateString("fr-FR")}
                      </span>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-200">
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-black">Rendez-vous</p>
                      <p className="text-2xl font-bold text-black">
                        {selectedClient.appointmentsCount}
                      </p>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <p className="text-xs text-black">Total dépensé</p>
                      <p className="text-2xl font-bold text-black">
                        {selectedClient.totalSpent}€
                      </p>
                    </div>
                  </div>

                  {/* Onglets */}
                  <div className="pt-4 border-t border-gray-200">
                    <div className="flex gap-2 mb-4 overflow-x-auto">
                      {[
                        { key: "history", label: "Historique" },
                        { key: "services", label: "Prestations" },
                        { key: "amounts", label: "Montants" },
                        { key: "reviews", label: "Avis" },
                        { key: "notes", label: "Notes" },
                      ].map((tab) => (
                        <button
                          key={tab.key}
                          onClick={() => setActiveTab(tab.key as any)}
                          className={`px-3 py-2 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                            activeTab === tab.key
                              ? "bg-black text-white"
                              : "bg-gray-100 text-black hover:bg-gray-200"
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Contenu des onglets */}
                    <div className="text-sm text-black">
                      {activeTab === "history" && (
                        <div className="space-y-2">
                          <p className="font-semibold">Derniers rendez-vous</p>
                          <div className="space-y-2">
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">
                              <p className="text-xs">05/11/2025 - Coupe + Barbe</p>
                              <p className="text-xs text-gray-600">50€</p>
                            </div>
                            <div className="p-2 bg-gray-50 rounded border border-gray-200">
                              <p className="text-xs">15/10/2025 - Coupe Classique</p>
                              <p className="text-xs text-gray-600">35€</p>
                            </div>
                          </div>
                        </div>
                      )}
                      {activeTab === "notes" && (
                        <div>
                          <p className="font-semibold mb-2">Notes internes</p>
                          <p className="text-xs text-black bg-gray-50 p-3 rounded border border-gray-200">
                            {selectedClient.notes || "Aucune note"}
                          </p>
                        </div>
                      )}
                      {activeTab === "services" && (
                        <p className="text-xs text-black">Prestations favorites à venir...</p>
                      )}
                      {activeTab === "amounts" && (
                        <p className="text-xs text-black">Détail des montants à venir...</p>
                      )}
                      {activeTab === "reviews" && (
                        <p className="text-xs text-black">Avis clients à venir...</p>
                      )}
                    </div>
                  </div>

                  {/* Notes */}
                  {selectedClient.notes && (
                    <div className="pt-4 border-t border-gray-200">
                      <p className="text-xs font-semibold text-black mb-2">Notes</p>
                      <p className="text-xs text-black bg-yellow-50 p-2 rounded border border-yellow-200">
                        {selectedClient.notes}
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-white border-2 border-gray-200">
                <CardContent className="p-12 text-center">
                  <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-black mb-2">
                    Sélectionnez un client
                  </h3>
                  <p className="text-sm text-black">
                    Cliquez sur un client pour voir ses détails
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      {/* Panneau Clients Inactifs - Modal overlay */}
      <AnimatePresence>
        {showInactiveClientsPanel && (
          <>
            {/* Overlay sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowInactiveClientsPanel(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Panneau de détails */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                      <Clock className="w-6 h-6 text-orange-600" />
                      Clients Inactifs
                    </h2>
                    <p className="text-sm text-black mt-1">
                      {inactiveClients.length} clients sans rendez-vous depuis plus de 30 jours
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowInactiveClientsPanel(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Liste des clients inactifs */}
                <div className="space-y-3">
                  {inactiveClients.map((client) => {
                    const daysSinceVisit = Math.floor(
                      (new Date().getTime() - new Date(client.lastVisit).getTime()) /
                        (1000 * 60 * 60 * 24)
                    )
                    return (
                      <Card
                        key={client.id}
                        className="bg-white border-2 border-gray-200 hover:border-orange-300 transition-all"
                      >
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-black">
                                  {client.firstName} {client.lastName}
                                </h3>
                                <Badge className="bg-orange-100 text-orange-800 border-0">
                                  {daysSinceVisit} jours
                                </Badge>
                              </div>
                              <div className="space-y-1 text-sm text-black">
                                <p className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {client.phone}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Mail className="w-3 h-3" />
                                  {client.email}
                                </p>
                                <p className="flex items-center gap-2 text-orange-600">
                                  <Calendar className="w-3 h-3" />
                                  Dernière visite :{" "}
                                  {new Date(client.lastVisit).toLocaleDateString("fr-FR")}
                                </p>
                                <p className="text-xs text-black">
                                  {client.appointmentsCount} RDV • {client.totalSpent}€ dépensés
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Actions de relance */}
                          <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-200">
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-200 text-black hover:bg-gray-100"
                            >
                              <Phone className="w-3 h-3 mr-1" />
                              Appeler
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-200 text-black hover:bg-gray-100"
                            >
                              <MessageSquare className="w-3 h-3 mr-1" />
                              SMS
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-gray-200 text-black hover:bg-gray-100"
                            >
                              <Send className="w-3 h-3 mr-1" />
                              Email
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    )
                  })}

                  {inactiveClients.length === 0 && (
                    <div className="text-center py-12">
                      <Clock className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-black font-semibold">Aucun client inactif</p>
                      <p className="text-sm text-black">
                        Tous vos clients sont actifs !
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Panneau Avis à traiter - Modal overlay */}
      <AnimatePresence>
        {showReviewsPanel && (
          <>
            {/* Overlay sombre */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowReviewsPanel(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />

            {/* Panneau de détails */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-full md:w-2/3 lg:w-1/2 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6 space-y-6">
                {/* Header */}
                <div className="flex items-start justify-between border-b border-gray-200 pb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-black flex items-center gap-2">
                      <ThumbsUp className="w-6 h-6 text-green-600" />
                      Avis à Traiter
                    </h2>
                    <p className="text-sm text-black mt-1">
                      {pendingReviews.length} avis en attente de réponse
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowReviewsPanel(false)}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Liste des avis */}
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <Card
                      key={review.id}
                      className="bg-white border-2 border-gray-200 hover:border-green-300 transition-all"
                    >
                      <CardContent className="p-4 space-y-3">
                        {/* En-tête de l'avis */}
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-black">
                              {review.clientName}
                            </h3>
                            <p className="text-xs text-black">
                              {new Date(review.date).toLocaleDateString("fr-FR")}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "text-yellow-500 fill-yellow-500"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {/* Commentaire */}
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                          <p className="text-sm text-black">{review.comment}</p>
                        </div>

                        {/* Zone de réponse */}
                        <div className="space-y-2">
                          <label className="text-xs font-semibold text-black">
                            Votre réponse :
                          </label>
                          <Textarea
                            placeholder="Rédigez votre réponse..."
                            className="min-h-[80px] border-gray-200 focus:border-black text-sm"
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-green-600 text-white hover:bg-green-700"
                          >
                            <Send className="w-3 h-3 mr-2" />
                            Envoyer la réponse
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-gray-200 text-black hover:bg-gray-100"
                          >
                            Plus tard
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {pendingReviews.length === 0 && (
                    <div className="text-center py-12">
                      <ThumbsUp className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <p className="text-black font-semibold">Aucun avis en attente</p>
                      <p className="text-sm text-black">
                        Tous les avis ont été traités !
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
