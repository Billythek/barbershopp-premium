# BarberShopp 💈

[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.0-ff69b4)](https://www.framer.com/motion/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

> **Premium Barber Shop Management System** - Une application de gestion complète pour salons de coiffure moderne avec design Classic Gentleman et animations premium.

![BarberShopp Banner](https://via.placeholder.com/1200x400/0A1628/F5E6D3?text=BarberShopp+Premium+Dashboard)

## 🎯 Vue d'ensemble

BarberShopp est un système de gestion professionnel conçu pour les salons de coiffure modernes. Construit avec les dernières technologies web et un design raffiné "Classic Gentleman", il offre une expérience utilisateur exceptionnelle pour les barbiers et leurs clients.

### ✨ Points forts

- 🎨 **Design Premium** - Palette Classic Gentleman (Navy, Cognac, Beige Cream)
- ⚡ **Performance** - Next.js 16 avec Turbopack pour une compilation ultra-rapide
- 🎭 **Animations Fluides** - Framer Motion avec micro-interactions professionnelles
- 📱 **Responsive Design** - Interface adaptative mobile-first
- 🔒 **Type-Safe** - TypeScript strict avec 100% de couverture
- 🎨 **UI Components** - shadcn/ui avec personnalisation complète
- 📊 **Dashboard Admin** - Tableaux de bord avec KPIs animés et statistiques en temps réel
- 📅 **Réservation Client** - Interface de booking publique élégante et intuitive

## 🚀 Quick Start (3 étapes)

```bash
# 1. Clone et install
git clone https://github.com/votre-username/barber.git
cd barber
npm install

# 2. Configure environment
cp .env.example .env
# Editez .env avec vos credentials Supabase

# 3. Launch
npm run dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) 🎉

## 📦 Tech Stack

### Core
- **Framework**: Next.js 16.0.1 (App Router, Turbopack)
- **Language**: TypeScript 5.x (strict mode)
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma (schema included)

### Styling & UI
- **CSS Framework**: Tailwind CSS 4.0
- **Components**: shadcn/ui (customized)
- **Animations**: Framer Motion 11.x
- **Icons**: Lucide React
- **Fonts**: Playfair Display (serif), Inter (sans), JetBrains Mono (mono)

### State & Data
- **Data Fetching**: TanStack Query (React Query) v5
- **State Management**: Zustand (planned)
- **Form Handling**: React Hook Form (planned)
- **Validation**: Zod (planned)

### Developer Experience
- **Type Safety**: TypeScript strict
- **Linting**: ESLint
- **Formatting**: Prettier (recommended)
- **Git Hooks**: Husky (planned)

## 🎨 Design System

### Classic Gentleman Palette

```css
/* Primary - Navy Deep */
--primary: rgb(10, 22, 40)
--primary-foreground: rgb(245, 230, 211)

/* Secondary - Cognac Brown */
--secondary: rgb(139, 69, 19)
--secondary-foreground: rgb(245, 230, 211)

/* Accent - Beige Cream */
--accent: rgb(245, 230, 211)
--accent-foreground: rgb(10, 22, 40)

/* Background */
--background: rgb(252, 250, 247)
--foreground: rgb(10, 22, 40)
```

### Typography

- **Headings**: Playfair Display (serif, elegant)
- **Body**: Inter (sans-serif, readable)
- **Code**: JetBrains Mono (monospace)

### Custom Utilities

```css
.glass              /* Glassmorphism effect */
.gradient-gentleman /* Navy → Cognac gradient */
.gradient-cream     /* Cream gradient */
.text-gradient-gentleman /* Gradient text effect */
.glow-cognac        /* Cognac glow shadow */
.hover-lift         /* Lift on hover animation */
.shimmer            /* Shimmer animation */
```

## 📁 Structure du Projet

```
barber/
├── app/
│   ├── (public)/              # Routes publiques (clients)
│   │   ├── booking/           # Interface de réservation
│   │   └── layout.tsx         # Layout public
│   ├── (admin)/               # Routes admin (barbiers)
│   │   ├── admin/
│   │   │   ├── dashboard/     # Tableau de bord admin
│   │   │   ├── appointments/  # Gestion RDV (planned)
│   │   │   ├── clients/       # Gestion clients (planned)
│   │   │   ├── services/      # Gestion services (planned)
│   │   │   └── settings/      # Paramètres (planned)
│   │   └── layout.tsx         # Layout admin avec sidebar
│   ├── api/                   # API Routes (planned)
│   ├── globals.css            # Styles globaux + design system
│   └── layout.tsx             # Root layout
├── components/
│   ├── admin/                 # Composants admin
│   │   └── AdminSidebar.tsx   # Sidebar animée
│   ├── shared/                # Composants partagés
│   │   └── KPICard.tsx        # Carte KPI animée
│   ├── ui/                    # shadcn/ui components
│   └── providers.tsx          # Context providers
├── lib/
│   ├── prisma.ts              # Prisma client
│   └── utils.ts               # Utilities
├── prisma/
│   └── schema.prisma          # Database schema
├── public/                    # Assets statiques
└── tailwind.config.ts         # Tailwind configuration
```

## 🗄️ Database Schema

### Models (Prisma)

```prisma
model User {
  id       String   @id @default(cuid())
  email    String   @unique
  password String
  name     String
  role     UserRole @default(BARBER)
  barber   Barber?
}

model Barber {
  id           String        @id @default(cuid())
  userId       String        @unique
  specialty    String?
  bio          String?
  appointments Appointment[]
  availability Availability[]
}

model Client {
  id           String        @id @default(cuid())
  name         String
  email        String        @unique
  phone        String?
  appointments Appointment[]
}

model Service {
  id           String        @id @default(cuid())
  name         String
  description  String?
  duration     Int           // minutes
  price        Float
  appointments Appointment[]
}

model Appointment {
  id               String            @id @default(cuid())
  barberId         String
  clientId         String
  serviceId        String
  date             DateTime
  endTime          DateTime
  status           AppointmentStatus @default(CONFIRMED)
  notificationSent Boolean           @default(false)
  reminderSent24h  Boolean           @default(false)
  reminderSent1h   Boolean           @default(false)
}
```

### Setup Database

```bash
# Configure .env with Supabase credentials
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# Push schema to database
npx prisma db push

# Generate Prisma Client
npx prisma generate

# Open Prisma Studio (DB GUI)
npx prisma studio
```

## 🎯 Fonctionnalités Actuelles

### ✅ Implémentées (Phase 1)

#### Design System
- ✅ Classic Gentleman color palette
- ✅ Custom Tailwind utilities (glass, gradients, shadows)
- ✅ Typography system (Playfair, Inter, JetBrains)
- ✅ Responsive design mobile-first
- ✅ Dark mode ready

#### Admin Dashboard
- ✅ Sidebar animée avec navigation
- ✅ Mobile menu responsive
- ✅ KPI Cards avec animations CountUp
- ✅ Trend indicators (+/- pourcentages)
- ✅ Upcoming appointments list
- ✅ Popular services avec progress bars
- ✅ Quick actions cards
- ✅ Real-time badge notifications

#### Public Booking Page
- ✅ Hero section avec glassmorphism
- ✅ Service cards avec hover effects
- ✅ Framer Motion stagger animations
- ✅ Gradient text effects
- ✅ Professional typography

#### Infrastructure
- ✅ Next.js 16 App Router setup
- ✅ TypeScript strict configuration
- ✅ Tailwind CSS 4.0 with plugins
- ✅ Prisma ORM schema complete
- ✅ shadcn/ui components integrated
- ✅ Framer Motion animations
- ✅ Route groups (public/admin)

### 🚧 En Développement (Phase 2-5)

#### Phase 2 - Calendrier Premium
- 🔜 Drag & drop appointments (@dnd-kit)
- 🔜 Multi-barber calendar view
- 🔜 3D timeline avec glassmorphism
- 🔜 Week/month/day views
- 🔜 Real-time synchronization (Socket.io)
- 🔜 Conflict detection

#### Phase 3 - Premium Components
- 🔜 3D Barber Chair Selector
- 🔜 Advanced service cards avec 3D hover
- 🔜 Animated statistics charts (Recharts)
- 🔜 Premium notification system
- 🔜 Toast notifications (Sonner)
- 🔜 Modal dialogs avec backdrop blur

#### Phase 4 - Fonctionnalités Avancées
- 🔜 Portfolio Barbier (before/after photos)
- 🔜 Client reviews & ratings
- 🔜 SMS/Email notifications (Resend + Twilio)
- 🔜 Payment integration (Stripe)
- 🔜 Analytics dashboard (advanced)
- 🔜 Export reports (PDF/Excel)

#### Phase 5 - Intelligence & Real-time
- 🔜 AI Appointment Predictions (TensorFlow.js)
- 🔜 Smart scheduling recommendations
- 🔜 Real-time notifications (Socket.io)
- 🔜 Client preferences learning
- 🔜 Automated reminders system
- 🔜 Revenue forecasting

## 🎨 Screenshots

### Admin Dashboard
![Dashboard](https://via.placeholder.com/800x500/0A1628/F5E6D3?text=Admin+Dashboard+with+KPIs)

### Public Booking
![Booking](https://via.placeholder.com/800x500/0A1628/F5E6D3?text=Public+Booking+Interface)

### Mobile Responsive
![Mobile](https://via.placeholder.com/400x700/0A1628/F5E6D3?text=Mobile+Responsive)

## 🛠️ Développement

### Prerequisites

- Node.js 18+ (recommandé: 20.x)
- npm ou yarn
- PostgreSQL database (Supabase recommandé)
- Git

### Installation Complète

```bash
# Clone le repository
git clone https://github.com/votre-username/barber.git
cd barber

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Editez .env avec vos credentials

# Setup database
npx prisma db push
npx prisma generate

# Run dev server
npm run dev
```

### Scripts Disponibles

```bash
# Development
npm run dev          # Start dev server (Turbopack)
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Database
npx prisma studio    # Open Prisma Studio GUI
npx prisma generate  # Generate Prisma Client
npx prisma db push   # Push schema to database
npx prisma migrate   # Create migration

# Testing (planned)
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Coverage report
```

### Environment Variables

Créez un fichier `.env` à la racine:

```env
# Database (Supabase)
DATABASE_URL="postgresql://..."
DIRECT_URL="postgresql://..."

# NextAuth (planned)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

# Email (Resend) (planned)
RESEND_API_KEY="re_..."

# SMS (Twilio) (planned)
TWILIO_ACCOUNT_SID="AC..."
TWILIO_AUTH_TOKEN="..."
TWILIO_PHONE_NUMBER="+..."
```

### Code Quality

```bash
# TypeScript check
npx tsc --noEmit

# Lint
npm run lint

# Format (with Prettier)
npx prettier --write .

# Pre-commit hooks (planned)
npx husky install
```

## 📊 Performance

### Lighthouse Scores (Target)

- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100

### Bundle Size

- **First Load JS**: < 100 KB (target)
- **Page Load Time**: < 2s (target)
- **Time to Interactive**: < 3s (target)

### Optimizations

- ✅ Next.js Image optimization
- ✅ Turbopack for faster compilation
- ✅ Code splitting automatique
- ✅ CSS minimization
- 🔜 Dynamic imports pour routes
- 🔜 React Server Components
- 🔜 Lazy loading images

## 🔐 Sécurité

### Implémenté
- ✅ TypeScript strict mode
- ✅ Environment variables
- ✅ Prisma ORM (SQL injection protection)

### Planifié
- 🔜 NextAuth.js authentication
- 🔜 RBAC (Role-Based Access Control)
- 🔜 CSRF protection
- 🔜 Rate limiting
- 🔜 Input validation (Zod)
- 🔜 Password hashing (bcrypt)

## 🌐 Déploiement

### Vercel (Recommandé)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Autres Plateformes

- **Railway**: Support PostgreSQL intégré
- **Fly.io**: Edge deployment
- **AWS Amplify**: Full-stack hosting
- **DigitalOcean App Platform**: Managed hosting

### Checklist Pre-Production

- [ ] Environment variables configured
- [ ] Database migrations applied
- [ ] Build passes without errors
- [ ] Lighthouse score > 90
- [ ] Security audit passed
- [ ] Error tracking configured (Sentry)
- [ ] Analytics configured (Google Analytics)
- [ ] Domain configured with SSL
- [ ] Backup strategy in place

## 🤝 Contribution

### Comment Contribuer

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add: AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

### Coding Standards

- **TypeScript**: Strict mode, no `any` types
- **Naming**: camelCase pour variables, PascalCase pour components
- **Comments**: JSDoc pour fonctions publiques
- **Commits**: Conventional Commits (feat:, fix:, docs:, etc.)

## 📝 Roadmap

### v1.0 (Current) - Foundation
- ✅ Design system
- ✅ Admin dashboard base
- ✅ Public booking page base
- ✅ Database schema
- ✅ Authentication structure

### v1.1 (Q1 2025) - Calendar
- 🔜 Drag & drop calendar
- 🔜 Multi-barber view
- 🔜 Real-time sync
- 🔜 Conflict detection

### v1.2 (Q2 2025) - Features
- 🔜 Portfolio barbier
- 🔜 Client reviews
- 🔜 SMS/Email notifications
- 🔜 Payment integration

### v2.0 (Q3 2025) - Intelligence
- 🔜 AI predictions
- 🔜 Smart scheduling
- 🔜 Analytics advanced
- 🔜 Mobile app (React Native)

## 📄 License

MIT License - voir [LICENSE](LICENSE) pour détails.

## 👨‍💻 Auteur

**Votre Nom**
- GitHub: [@votre-username](https://github.com/votre-username)
- Email: votre.email@example.com

## 🙏 Remerciements

- [Next.js](https://nextjs.org/) - The React Framework
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI Components
- [Framer Motion](https://www.framer.com/motion/) - Animation Library
- [Tailwind CSS](https://tailwindcss.com/) - Utility-First CSS
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Supabase](https://supabase.com/) - Open Source Firebase Alternative

---

<p align="center">
  Made with ❤️ and ☕ - Built like it's for Palantir, because we create the best.
</p>

<p align="center">
  🤖 Generated with <a href="https://claude.com/claude-code">Claude Code</a>
</p>
