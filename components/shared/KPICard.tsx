"use client"

import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import CountUp from "react-countup"
import { Card, CardContent } from "@/components/ui/card"
import { animations } from "@/lib/animations"

interface KPICardProps {
  title: string
  value: number
  prefix?: string
  unit?: string
  decimals?: number
  icon: LucideIcon
  trend?: number
  trendLabel?: string
  color?: "primary" | "mocha" | "emerald" | "gold" | "sapphire" | "ruby"
  delay?: number
}

const colorClasses = {
  primary: {
    gradient: "from-black to-gray-800",
    glow: "shadow-lg",
    text: "text-black",
    border: "border-gray-200",
    iconBg: "bg-black",
  },
  mocha: {
    gradient: "from-black to-gray-800",
    glow: "shadow-lg",
    text: "text-black",
    border: "border-gray-200",
    iconBg: "bg-black",
  },
  emerald: {
    gradient: "from-black to-gray-800",
    glow: "shadow-lg",
    text: "text-black",
    border: "border-gray-200",
    iconBg: "bg-black",
  },
  gold: {
    gradient: "from-black to-gray-800",
    glow: "shadow-lg",
    text: "text-black",
    border: "border-gray-200",
    iconBg: "bg-black",
  },
  sapphire: {
    gradient: "from-black to-gray-800",
    glow: "shadow-lg",
    text: "text-black",
    border: "border-gray-200",
    iconBg: "bg-black",
  },
  ruby: {
    gradient: "from-black to-gray-800",
    glow: "shadow-lg",
    text: "text-black",
    border: "border-gray-200",
    iconBg: "bg-black",
  },
}

export function KPICard({
  title,
  value,
  prefix = "",
  unit = "",
  decimals = 0,
  icon: Icon,
  trend,
  trendLabel,
  color = "primary",
  delay = 0,
}: KPICardProps) {
  const colors = colorClasses[color]

  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={{
        initial: { opacity: 0, y: 20 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.6,
            ease: animations.easings.smooth,
            delay,
          },
        },
      }}
      className="preserve-3d perspective-1000 group h-full"
    >
      <Card
        className={`
          bg-white
          relative overflow-hidden
          border-2 ${colors.border}
          hover:border-gray-300
          transition-all duration-500
          hover-lift-3d
          h-full
        `}
      >

        <CardContent className="relative z-10 p-6">
          {/* Header with icon and trend */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* Title */}
              <h3 className="text-sm font-medium text-black mb-3 uppercase tracking-wide">
                {title}
              </h3>

              {/* Value with CountUp animation */}
              <motion.div
                className={`text-4xl font-bold ${colors.text} mb-1`}
                variants={{
                  hover: {
                    scale: 1.05,
                    transition: { duration: 0.3 },
                  },
                }}
              >
                {prefix}
                <CountUp
                  end={value}
                  duration={2}
                  decimals={decimals}
                  separator=","
                  delay={delay}
                />
                {unit}
              </motion.div>

              {/* Trend indicator */}
              {trend !== undefined && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: delay + 0.4 }}
                  className="flex items-center gap-1 mt-2 text-xs font-semibold text-black"
                >
                  <motion.span
                    animate={{
                      y: trend >= 0 ? [-2, 0, -2] : [2, 0, 2],
                      transition: {
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      },
                    }}
                  >
                    {trend >= 0 ? "↑" : "↓"}
                  </motion.span>
                  <span>
                    {trend >= 0 ? "+" : ""}
                    {trend}%
                  </span>
                  {trendLabel && (
                    <span className="text-black font-normal">{trendLabel}</span>
                  )}
                </motion.div>
              )}
            </div>

            {/* Icon with 3D rotation on hover */}
            <motion.div
              className={`
                ${colors.iconBg}
                p-3 rounded-xl
                ${colors.glow}
                group-hover:scale-110
                transition-all duration-500
                flex items-center justify-center
              `}
              variants={{
                hover: {
                  rotate: [0, -10, 10, -10, 0],
                  scale: 1.15,
                  transition: {
                    rotate: {
                      duration: 0.6,
                      ease: "easeInOut",
                    },
                    scale: {
                      duration: 0.3,
                    },
                  },
                },
              }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          </div>

          {/* Sparkline effect (decorative line) */}
          <div className="flex items-end gap-1 h-8 mt-4 opacity-30">
            {Array.from({ length: 12 }).map((_, i) => {
              const height = Math.random() * 100
              return (
                <motion.div
                  key={i}
                  className="flex-1 bg-black rounded-t"
                  initial={{ height: 0 }}
                  animate={{
                    height: `${height}%`,
                    transition: {
                      duration: 0.8,
                      delay: delay + i * 0.05,
                      ease: animations.easings.smooth,
                    },
                  }}
                  whileHover={{
                    height: `${Math.min(height + 20, 100)}%`,
                    transition: { duration: 0.2 },
                  }}
                />
              )
            })}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
