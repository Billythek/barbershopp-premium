import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Classic Gentleman Palette
        primary: {
          DEFAULT: 'rgb(10, 22, 40)',
          foreground: 'rgb(245, 230, 211)',
        },
        secondary: {
          DEFAULT: 'rgb(139, 69, 19)',
          foreground: 'rgb(245, 230, 211)',
        },
        accent: {
          DEFAULT: 'rgb(245, 230, 211)',
          foreground: 'rgb(10, 22, 40)',
        },
        background: 'rgb(252, 250, 247)',
        foreground: 'rgb(10, 22, 40)',
        card: {
          DEFAULT: 'rgb(248, 242, 236)',
          foreground: 'rgb(10, 22, 40)',
        },
        popover: {
          DEFAULT: 'rgb(248, 242, 236)',
          foreground: 'rgb(10, 22, 40)',
        },
        muted: {
          DEFAULT: 'rgb(232, 213, 196)',
          foreground: 'rgb(75, 85, 99)',
        },
        destructive: 'rgb(185, 28, 28)',
        border: 'rgb(229, 225, 221)',
        input: 'rgb(229, 225, 221)',
        ring: 'rgb(139, 69, 19)',
        sidebar: {
          DEFAULT: 'rgb(20, 30, 50)',
          foreground: 'rgb(245, 230, 211)',
          primary: 'rgb(139, 69, 19)',
          'primary-foreground': 'rgb(245, 230, 211)',
          accent: 'rgb(30, 42, 64)',
          'accent-foreground': 'rgb(245, 230, 211)',
          border: 'rgba(10, 22, 40, 0.3)',
          ring: 'rgb(139, 69, 19)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        mono: ['var(--font-jetbrains)', 'JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        gentleman: '0 4px 6px -1px rgba(10, 22, 40, 0.1), 0 2px 4px -1px rgba(10, 22, 40, 0.06)',
        'gentleman-lg': '0 10px 15px -3px rgba(10, 22, 40, 0.1), 0 4px 6px -2px rgba(10, 22, 40, 0.05)',
        'gentleman-xl': '0 20px 25px -5px rgba(10, 22, 40, 0.1), 0 10px 10px -5px rgba(10, 22, 40, 0.04)',
      },
      animation: {
        shimmer: 'shimmer 2s infinite linear',
        'pulse-gentle': 'pulse-gentle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }: any) {
      addUtilities({
        // Shadcn/ui compatibility utilities
        '.bg-background': {
          'background-color': 'rgb(252, 250, 247)',
        },
        '.bg-foreground': {
          'background-color': 'rgb(10, 22, 40)',
        },
        '.bg-card': {
          'background-color': 'rgb(248, 242, 236)',
        },
        '.bg-popover': {
          'background-color': 'rgb(248, 242, 236)',
        },
        '.bg-primary': {
          'background-color': 'rgb(10, 22, 40)',
        },
        '.bg-secondary': {
          'background-color': 'rgb(139, 69, 19)',
        },
        '.bg-muted': {
          'background-color': 'rgb(232, 213, 196)',
        },
        '.bg-accent': {
          'background-color': 'rgb(245, 230, 211)',
        },
        '.text-foreground': {
          'color': 'rgb(10, 22, 40)',
        },
        '.text-primary': {
          'color': 'rgb(10, 22, 40)',
        },
        '.text-primary-foreground': {
          'color': 'rgb(245, 230, 211)',
        },
        '.text-secondary': {
          'color': 'rgb(139, 69, 19)',
        },
        '.text-secondary-foreground': {
          'color': 'rgb(245, 230, 211)',
        },
        '.text-muted-foreground': {
          'color': 'rgb(75, 85, 99)',
        },
        '.text-accent-foreground': {
          'color': 'rgb(10, 22, 40)',
        },
        '.border-border': {
          'border-color': 'rgb(229, 225, 221)',
        },
        '.border-input': {
          'border-color': 'rgb(229, 225, 221)',
        },
        '.ring-ring': {
          '--tw-ring-color': 'rgb(139, 69, 19)',
        },
        // Custom utilities
        '.glass': {
          background: 'rgba(245, 230, 211, 0.7)',
          'backdrop-filter': 'blur(10px)',
          '-webkit-backdrop-filter': 'blur(10px)',
          border: '1px solid rgba(245, 230, 211, 0.2)',
        },
        '.gradient-gentleman': {
          background: 'linear-gradient(135deg, rgb(10, 22, 40) 0%, rgb(59, 73, 99) 50%, rgb(139, 69, 19) 100%)',
        },
        '.gradient-cream': {
          background: 'linear-gradient(135deg, rgb(248, 242, 236) 0%, rgb(245, 230, 211) 100%)',
        },
        '.text-gradient-gentleman': {
          background: 'linear-gradient(135deg, rgb(10, 22, 40), rgb(139, 69, 19))',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.text-gradient-metallic': {
          background: 'linear-gradient(135deg, rgb(183, 110, 121), rgb(200, 130, 140))',
          '-webkit-background-clip': 'text',
          'background-clip': 'text',
          '-webkit-text-fill-color': 'transparent',
        },
        '.glow-cognac': {
          'box-shadow': '0 0 20px rgba(139, 69, 19, 0.3)',
        },
        '.glow-metallic': {
          'box-shadow': '0 0 20px rgba(183, 110, 121, 0.4)',
        },
        '.shimmer': {
          animation: 'shimmer 2s infinite linear',
          background: 'linear-gradient(90deg, transparent 0%, rgba(183, 110, 121, 0.2) 50%, transparent 100%)',
          'background-size': '1000px 100%',
        },
        '.hover-lift': {
          transition: 'all 0.3s ease-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      })
    },
  ],
}

export default config
