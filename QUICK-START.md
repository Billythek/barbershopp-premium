# 🚀 Guide de Démarrage Rapide - BarberShopp

## ✅ Ce qui a été créé

Votre projet BarberShopp est maintenant **opérationnel** avec :

### Infrastructure
- ✅ Next.js 14 + TypeScript + Tailwind CSS v4
- ✅ shadcn/ui (16 composants installés)
- ✅ Prisma + PostgreSQL (schéma complet)
- ✅ TanStack Query + Zustand
- ✅ Support bilingue FR/EN

### Pages créées
- ✅ **Page de booking publique** : http://localhost:3001/booking
- ✅ **Dashboard admin** : http://localhost:3001/admin/dashboard

### Base de données
Schéma complet avec 8 modèles :
- User (authentification)
- Barber (profil barbier)
- Client (clients du salon)
- Service (services proposés)
- Appointment (rendez-vous)
- Availability (disponibilités)
- NotificationLog (logs notifications)
- Settings (config globale)

## 🎯 Prochaines étapes

### 1. Tester le projet

```bash
cd C:\Users\apag9\Documents\barber
npm run dev
```

Puis ouvrez :
- http://localhost:3001/booking (page client)
- http://localhost:3001/admin/dashboard (dashboard admin)

### 2. Configurer Supabase (Base de données)

1. Créer un compte sur https://supabase.com
2. Créer un nouveau projet
3. Copier l'URL de connexion PostgreSQL
4. Modifier `.env` :
   ```
   DATABASE_URL="votre-url-supabase"
   ```
5. Pousser le schéma :
   ```bash
   npx prisma db push
   ```

### 3. Ajouter des données de test

Créer un fichier `prisma/seed.ts` pour ajouter :
- 1 barbier par défaut
- 3-4 services (Coupe, Barbe, Combo)
- Quelques clients de test
- Disponibilités du barbier

Puis exécuter :
```bash
npx prisma db seed
```

### 4. Développement - Phases suivantes

#### Phase 2 : Calendrier & RDV (2-3 semaines)
- [ ] Installer Planner Component ou react-big-calendar
- [ ] API Routes pour CRUD rendez-vous
- [ ] Système drag & drop
- [ ] Vérification conflits temps réel
- [ ] Gestion disponibilités barbier

#### Phase 3 : Booking complet (2-3 semaines)
- [ ] Workflow réservation en 4 étapes
- [ ] Sélection service avec cards
- [ ] Choix barbier avec photos
- [ ] Calendrier créneaux disponibles
- [ ] Formulaire client avec validation
- [ ] Page confirmation

#### Phase 4 : Notifications (1-2 semaines)
- [ ] Configurer compte Resend
- [ ] Créer templates emails (React Email)
- [ ] Cron jobs pour rappels
- [ ] (Optionnel) SMS Twilio

#### Phase 5 : Dashboard & Analytics (1-2 semaines)
- [ ] Graphiques Recharts
- [ ] Stats temps réel avec TanStack Query
- [ ] Export CSV
- [ ] Filtres et recherche

## 📝 Commandes utiles

```bash
# Développement
npm run dev              # Lancer le serveur (port 3000 ou 3001)
npm run build            # Build production
npm run start            # Lancer en production

# Base de données
npx prisma studio        # Interface admin BDD (très utile !)
npx prisma db push       # Pousser le schéma vers Supabase
npx prisma generate      # Régénérer le client Prisma
npx prisma db seed       # Ajouter des données de test

# Code quality
npm run lint             # Linter le code
```

## 🎨 Personnalisation rapide

### Changer le nom du salon
Modifiez `.env` :
```
NEXT_PUBLIC_APP_NAME="Votre Nom de Salon"
```

### Changer les couleurs
Éditez `app/globals.css` (lignes 4-50 avec les CSS variables)

### Ajouter un logo
Remplacez les images dans `public/`

## 🔧 Troubleshooting

### Le serveur ne démarre pas
```bash
# Vérifier que le port 3000 est libre
netstat -ano | findstr :3000
# Ou laisser Next.js choisir un autre port automatiquement
```

### Erreur Prisma "DATABASE_URL not found"
Vérifiez que le fichier `.env` existe à la racine du projet.

### Erreur de build
```bash
# Nettoyer et réinstaller
rm -rf .next node_modules package-lock.json
npm install
npm run dev
```

## 📚 Ressources utiles

- **Next.js Docs** : https://nextjs.org/docs
- **Prisma Docs** : https://www.prisma.io/docs
- **shadcn/ui** : https://ui.shadcn.com
- **Supabase Docs** : https://supabase.com/docs
- **TanStack Query** : https://tanstack.com/query

## 💡 Tips

1. **Utilisez Prisma Studio** pour voir et modifier les données facilement
2. **React Query Devtools** s'ouvre automatiquement en dev (coin bas-gauche)
3. **Sidebar responsive** : testez sur mobile (F12 > mode responsive)
4. **Hot reload** : les modifications sont instantanées

## 🎯 Objectif Final

Un système complet de :
- ✅ Réservation en ligne 24/7 pour les clients
- ✅ Gestion complète pour le barbier
- ✅ Notifications automatiques (email + SMS)
- ✅ Dashboard avec analytics
- ✅ Multi-barbiers (extensible à 2-5 barbiers)

**Temps estimé total** : 12-16 semaines (3-4 mois)
**Phase 1 actuelle** : ✅ **COMPLÉTÉE** (Infrastructure & Base)

---

Bon développement ! 💈
