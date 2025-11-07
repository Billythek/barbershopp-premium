'use client'

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Calendar,
  Users,
  Scissors,
  Settings,
  LogOut,
  Menu,
  X,
  Bell
} from "lucide-react"
import { useState } from "react"

const navigation = [
  {
    name: 'Tableau de bord',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
    badge: null,
  },
  {
    name: 'Rendez-vous',
    href: '/admin/appointments',
    icon: Calendar,
    badge: '8',
  },
  {
    name: 'Clients',
    href: '/admin/clients',
    icon: Users,
    badge: null,
  },
  {
    name: 'Services',
    href: '/admin/services',
    icon: Scissors,
    badge: null,
  },
  {
    name: 'Paramètres',
    href: '/admin/settings',
    icon: Settings,
    badge: null,
  },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile Menu Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 rounded-lg glass shadow-gentleman cursor-pointer"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6 text-foreground" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Menu className="w-6 h-6 text-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{
          x: isOpen ? 0 : "-100%",
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "w-72 bg-sidebar border-r border-sidebar-border flex flex-col fixed lg:static inset-y-0 left-0 z-40 shadow-gentleman-xl",
          "lg:translate-x-0"
        )}
      >
        {/* Logo Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 border-b border-sidebar-border"
        >
          <h1 className="text-2xl font-serif font-bold text-sidebar-foreground">
            BarberShopp
          </h1>
          <p className="text-sm text-sidebar-foreground/70 mt-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 pulse-gentle"></span>
            Administration
          </p>
        </motion.div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navigation.map((item, index) => {
            const isActive = pathname === item.href
            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "group relative flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                    isActive
                      ? "bg-sidebar-primary text-sidebar-primary-foreground shadow-gentleman glow-cognac"
                      : "text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-sidebar-primary rounded-lg -z-10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}

                  <item.icon className={cn(
                    "w-5 h-5 transition-transform duration-200",
                    "group-hover:scale-110"
                  )} />

                  <span className="flex-1">{item.name}</span>

                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className="ml-auto px-2 py-0.5 text-xs bg-secondary/20 text-secondary-foreground pulse-gentle"
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Link>
              </motion.div>
            )
          })}
        </nav>

        <Separator className="bg-sidebar-border" />

        {/* User Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="p-4 space-y-4"
        >
          {/* Notifications */}
          <Button
            variant="outline"
            className="w-full justify-start gap-3 border-sidebar-border hover:bg-sidebar-accent"
            size="sm"
          >
            <Bell className="w-4 h-4" />
            <span className="flex-1 text-left">Notifications</span>
            <Badge variant="destructive" className="px-2 py-0.5 text-xs">
              3
            </Badge>
          </Button>

          {/* User Profile */}
          <div className="flex items-center gap-3 p-3 rounded-lg glass cursor-pointer hover:bg-sidebar-accent/50 transition-all">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="relative w-10 h-10 rounded-full bg-gradient-gentleman flex items-center justify-center shadow-gentleman"
            >
              <span className="text-primary-foreground font-semibold text-lg">
                B
              </span>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-sidebar"></span>
            </motion.div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-sidebar-foreground truncate">
                Barbier Admin
              </p>
              <p className="text-xs text-sidebar-foreground/60 truncate">
                admin@barbershopp.fr
              </p>
            </div>
          </div>

          {/* Logout Button */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              variant="outline"
              className="w-full justify-start gap-3 border-destructive/30 text-destructive hover:bg-destructive/10"
              size="sm"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </Button>
          </motion.div>
        </motion.div>
      </motion.aside>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-30 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
