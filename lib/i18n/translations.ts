// Translations FR/EN pour BarberShopp

export const translations = {
  fr: {
    // Navigation
    nav: {
      dashboard: 'Tableau de bord',
      appointments: 'Rendez-vous',
      clients: 'Clients',
      services: 'Services',
      settings: 'Paramètres',
      logout: 'Déconnexion',
    },
    // Booking public
    booking: {
      title: 'Réservez votre rendez-vous',
      subtitle: 'Choisissez un service et sélectionnez votre créneau',
      selectService: 'Sélectionnez un service',
      selectBarber: 'Choisissez votre barbier',
      selectDate: 'Choisissez une date',
      selectTime: 'Sélectionnez une heure',
      yourInfo: 'Vos informations',
      confirm: 'Confirmer le rendez-vous',
      back: 'Retour',
      next: 'Suivant',
      noPreference: 'Pas de préférence',
      firstName: 'Prénom',
      lastName: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      notes: 'Notes (optionnel)',
      success: 'Rendez-vous confirmé !',
      error: 'Une erreur est survenue',
    },
    // Admin Dashboard
    dashboard: {
      welcome: 'Bienvenue',
      todayAppointments: "Rendez-vous aujourd'hui",
      weekRevenue: 'Revenus de la semaine',
      newClients: 'Nouveaux clients',
      occupancy: "Taux d'occupation",
      recentActivity: 'Activité récente',
      upcomingAppointments: 'Prochains rendez-vous',
      popularServices: 'Services populaires',
    },
    // Appointments
    appointments: {
      title: 'Gestion des rendez-vous',
      new: 'Nouveau rendez-vous',
      edit: 'Modifier',
      cancel: 'Annuler',
      complete: 'Marquer terminé',
      status: {
        CONFIRMED: 'Confirmé',
        IN_PROGRESS: 'En cours',
        COMPLETED: 'Terminé',
        CANCELED: 'Annulé',
        NO_SHOW: 'Absent',
      },
    },
    // Common
    common: {
      save: 'Enregistrer',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      add: 'Ajouter',
      search: 'Rechercher',
      filter: 'Filtrer',
      export: 'Exporter',
      loading: 'Chargement...',
      noData: 'Aucune donnée',
      error: 'Erreur',
      success: 'Succès',
    },
  },
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      appointments: 'Appointments',
      clients: 'Clients',
      services: 'Services',
      settings: 'Settings',
      logout: 'Logout',
    },
    // Booking public
    booking: {
      title: 'Book your appointment',
      subtitle: 'Choose a service and select your time slot',
      selectService: 'Select a service',
      selectBarber: 'Choose your barber',
      selectDate: 'Choose a date',
      selectTime: 'Select a time',
      yourInfo: 'Your information',
      confirm: 'Confirm appointment',
      back: 'Back',
      next: 'Next',
      noPreference: 'No preference',
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email',
      phone: 'Phone',
      notes: 'Notes (optional)',
      success: 'Appointment confirmed!',
      error: 'An error occurred',
    },
    // Admin Dashboard
    dashboard: {
      welcome: 'Welcome',
      todayAppointments: 'Today\'s appointments',
      weekRevenue: 'Week revenue',
      newClients: 'New clients',
      occupancy: 'Occupancy rate',
      recentActivity: 'Recent activity',
      upcomingAppointments: 'Upcoming appointments',
      popularServices: 'Popular services',
    },
    // Appointments
    appointments: {
      title: 'Appointments management',
      new: 'New appointment',
      edit: 'Edit',
      cancel: 'Cancel',
      complete: 'Mark as completed',
      status: {
        CONFIRMED: 'Confirmed',
        IN_PROGRESS: 'In progress',
        COMPLETED: 'Completed',
        CANCELED: 'Canceled',
        NO_SHOW: 'No show',
      },
    },
    // Common
    common: {
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      add: 'Add',
      search: 'Search',
      filter: 'Filter',
      export: 'Export',
      loading: 'Loading...',
      noData: 'No data',
      error: 'Error',
      success: 'Success',
    },
  },
} as const

export type Language = keyof typeof translations
export type TranslationKey = keyof typeof translations.fr

export function getTranslation(lang: Language = 'fr') {
  return translations[lang]
}
