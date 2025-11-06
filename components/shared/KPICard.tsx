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
    gradient: "from-[rgb(10,22,40)] to-[rgb(8,18,32)]",
    glow: "shadow-[0_0_30px_rgba(10,22,40,0.4)]",
    text: "text-[rgb(10,22,40)]",
    border: "border-[rgb(10,22,40)]/20",
    iconBg: "bg-gradient-to-br from-[rgb(10,22,40)] to-[rgb(8,18,32)]",
  },
  mocha: {
    gradient: "from-[rgb(139,69,19)] to-[rgb(110,55,15)]",
    glow: "shadow-[0_0_30px_rgba(139,69,19,0.4)]",
    text: "text-[rgb(139,69,19)]",
    border: "border-[rgb(139,69,19)]/20",
    iconBg: "bg-gradient-to-br from-[rgb(139,69,19)] to-[rgb(110,55,15)]",
  },
  emerald: {
    gradient: "from-[rgb(16,185,129)] to-[rgb(5,150,105)]",
    glow: "shadow-[0_0_30px_rgba(16,185,129,0.4)]",
    text: "text-[rgb(16,185,129)]",
    border: "border-[rgb(16,185,129)]/20",
    iconBg: "bg-gradient-to-br from-[rgb(16,185,129)] to-[rgb(5,150,105)]",
  },
  gold: {
    gradient: "from-[rgb(234,179,8)] to-[rgb(245,158,11)]",
    glow: "shadow-[0_0_30px_rgba(234,179,8,0.4)]",
    text: "text-[rgb(234,179,8)]",
    border: "border-[rgb(234,179,8)]/20",
    iconBg: "bg-gradient-to-br from-[rgb(234,179,8)] to-[rgb(245,158,11)]",
  },
  sapphire: {
    gradient: "from-[rgb(59,130,246)] to-[rgb(37,99,235)]",
    glow: "shadow-[0_0_30px_rgba(59,130,246,0.4)]",
    text: "text-[rgb(59,130,246)]",
    border: "border-[rgb(59,130,246)]/20",
    iconBg: "bg-gradient-to-br from-[rgb(59,130,246)] to-[rgb(37,99,235)]",
  },
  ruby: {
    gradient: "from-[rgb(239,68,68)] to-[rgb(220,38,38)]",
    glow: "shadow-[0_0_30px_rgba(239,68,68,0.4)]",
    text: "text-[rgb(239,68,68)]",
    border: "border-[rgb(239,68,68)]/20",
    iconBg: "bg-gradient-to-br from-[rgb(239,68,68)] to-[rgb(220,38,38)]",
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
          glass-premium
          relative overflow-hidden
          border-2 ${colors.border}
          hover:border-opacity-50
          transition-all duration-500
          hover-lift-3d
          h-full
        `}
      >
        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Gradient glow on hover */}
        <motion.div
          className={`absolute inset-0 bg-gradient-to-br ${colors.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
          variants={{
            hover: {
              opacity: 0.05,
              transition: { duration: 0.3 },
            },
          }}
        />

        <CardContent className="relative z-10 p-6">
          {/* Header with icon and trend */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              {/* Title */}
              <h3 className="text-sm font-medium text-gray-600 mb-3 uppercase tracking-wide">
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
                  className={`
                    flex items-center gap-1 mt-2 text-xs font-semibold
                    ${trend >= 0 ? "text-[rgb(16,185,129)]" : "text-[rgb(239,68,68)]"}
                  `}
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
                    <span className="text-gray-500 font-normal">{trendLabel}</span>
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
                  className={`flex-1 bg-gradient-to-t ${colors.gradient} rounded-t`}
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

        {/* Corner accent */}
        <motion.div
          className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${colors.gradient} opacity-5 rounded-bl-full`}
          variants={{
            hover: {
              scale: 1.5,
              opacity: 0.1,
              transition: { duration: 0.4 },
            },
          }}
        />
      </Card>
    </motion.div>
  )
}
